const app = require("express")()
const db = require('./dbconnect');
const User = require('./user');
const Category = require('./category');
const item = require('./item');
const Item = item.ShopItem;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//db.search("select * from sample",(rows)=>{console.log(rows)});
function start(){
	app.get("/", function (req, res) {
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				createNewCookie((cookiee)=>{
					//TODO fix header issue
					res.cookie("sessionID",cookiee).send("lemme give you a cookie");
					user.getTempUser((user_id)=>{
					new User({"id":user_id,"db":db}).connectUserWithCookie(cookiee,()=>{});
					});
				});
			}
			else{
				res.send("you already have a cookie dont be greedy");
			}
		});
	});

	//TODO function for changing order of images
	
	//posts a new image to the according item
	//order_id sets the order, in which the items are to be displayed
	//the input image must be a base64 encoded string in the field "image" from a json in the html-body
	//automatically merges the image's order_id into the rest if a conflict occurs
	app.use(bodyParser.json({limit: '50mb'})).post("/uploadImage", function (req, res){
		let item_id = req.query.item_id;
		let order_id = req.query.order_id;
		let image_name = req.query.image_name;
		// image_name will be in query_params
		let image_string = req.body.image.toString();
		let item = db.safeSearch("select * from shop_items where id=?", [item_id], function(x){
			itm = Object.assign(new Item(), x[0]);
			itm.setImage(image_string, order_id, image_name, db, function(y){
				res.status(200).send({message:"Image was successfully uploaded"});
			});
		});
	});

	//gets user-object from db that is associated with the cookie
	app.get("/user", function (req, res) {
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).json(null);
			}
			else{
				userWithLessInfo=new User({"id":user.id,"username":user.username,"admin":user.admin})
				res.status(200).json(userWithLessInfo);
			}
		});
	})
	
	//gets all user-objects in ascending order in the db
	//only usable as admin
	app.get("/userAll", function (req, res) {
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(us)=>{
			if(us.isEmpty()||!us.isAdmin()){
				res.status(400).send({message:"I dont think so m8"});
			}else{
				db.search("SELECT id FROM shop_users ORDER BY id ASC",(result)=>{
					allUsers=[];
					for(let i=0;i<result.length;i++){
						new User({"db":db}).getUserByID(result[i].id,(user2)=>{
							allUsers.push(user2);
							if(allUsers.length==result.length){
								res.status(200).json(allUsers.sort(function(a,b){return a["id"]-b["id"];}));
							}
						});
					}
				});
			}
		});
	});

	//login for the user
	//if user isnt already logged in with cookie this request needs params username and password in order to get yes
	app.post("/login", function(req, res){
        cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send({message:"No"});
			}
			else{
				if(!user.getTemporary()){
					res.status(200).send({message:"Yes"});
				}else{
					let username = req.query["username"];
					let password = req.query["password"];
					new User({"db":db}).getUser(username,password,(user2)=>{
						if(user2.isEmpty()){
							res.status(400).send({message:"No"});
						}else{
							user.markUnused((e)=>{
								user2.connectUserWithCookie(cookie,(end)=>{
									user2.mergeWarenkorb(user,(end2)=>{
										res.status(200).send({message:"Yes"});
									});
								});
							});
						}
					});
				}
			}
		});
    });
	
	//logs the current user out
	//if the current user is a temp user the user is marked as unused and his items in his Warenkorb will be deleted
	app.post("/logout",function(req, res){
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send({message:"You weren't even logged in lmao"});
			}
			else{
				user.logout((res)=>{
					res.status(200).send({messsage:"you successfully logged out"});
				});
			}
		});
	});

    //search after itemName in single, multiple or all categories
    app.get("/search", function(req, res){
		let cats = req.query.category.toString();
		let sfor = req.query.item+"%";

        splitCat = cats.split(",").forEach(x => {x = "'"+x+"'"});
        if(splitCat!=null){
            let category = db.search("select * from shop_categories where name IN ("+splitCat+")", (rows)=>{
                var categories = new Array();
                for (let index = 0; index < rows.length; index++) {
                    categories.push(rows[index].id);
                }
                if(categories==[]){
                    console.log(categories);
                    let item = db.search("select * from shop_items where category_id IN (" +categories+ ") AND name LIKE \""+sfor+"\"", (rows)=>{
                        var items = new Array();
                        for (let index = 0; index < rows.length; index++) {
                            items.push(Object.assign(new Item(), rows[index]));
                        }
                        console.log(items);
                        res.status(200).json(items);
                    });
                } else {
                    let err = "Error: category >>"+cats+"<< does not exist";
                    console.log(err);
                    res.status(400).send({message:err});
                }
            });
        } else {
            let item = db.search("select * from shop_items where name LIKE \""+sfor+"\"", (rows)=>{
                var items = new Array();
                for (let index = 0; index < rows.length; index++) {
                    items.push(Object.assign(new Item(), rows[index]));
                }
                console.log(items);
                res.status(200).json(items);
            });
        }
    })

    //create new User in db
	//changes current User to freshly created User
	//need params username password and security_answer
	app.post("/register", function(req, res) {
		let username = req.query["username"];
		let password = req.query["password"];
		let security_answer = req.query["security_answer"];
		if(username==undefined||password==undefined||security_answer==undefined){
			res.status(400).send({message:"wrong parameters"});
		}
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send({message:"No"});
			}
			else{
				new User({"db":db,"username":username}).exists((exist)=>{
					if(exist){
						res.status(400).send({message:"User already exists"});
					}else{
						let newUser=new User({"db":db,"username":username,"password":password,"security_answer":security_answer,"admin":false,"isTemporary":false,"isUsed":true});
						newUser.addUser((id)=>{
							newUser.id=id;
							user.disconnectCookieFromUser(()=>{
								if(user.getTemporary()){
									user.markUnused((e)=>{
										newUser.connectUserWithCookie(cookie,(end)=>{
											newUser.mergeWarenkorb(user,(end2)=>{
												res.status(200).send({message:"Yes"});
											});
										});
									});
								}
								else{
									newUser.connectUserWithCookie(cookie,(end)=>{
										res.status(200).send({message:"User has been added"});
									});
								}
							});
						});
					}
				});
			}
		});
	})
	
	//Hole alle Items und deren Anzahl aus dem Warenkorb des User heraus (funktionert über Cookie "sessionID")
	app.get("/getWarenkorb", function(req,res) {
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).json(null);
			}
			else{
				user.getWarenkorb((result)=>{
					res.status(200).json(result);
				});
			}
		});
	});
	
	//Setze Ein item in den Warenkorb des jetzigen User (funktioniert über Cookie "sessionID")
	//Bei der Anfrage müssen die Anfrage Parameter item_id und count als int gegeben werden
	//Es wird automatisch ein existierendes Item geupdatet.
	//Wenn ein Item entfernt werden sollen, muss ein negativer count angegeben werden.
	//Warenkorb existiert hier schon
	app.post("/setWarenkorb", function(req,res) {
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie==null;
		item_id=parseInt(req.query["item_id"]);
		count=parseInt(req.query["count"]);
		if(!Number.isInteger(item_id)||item_id<1||!Number.isInteger(count)){
			res.status(400);
			res.send();
			return;
		}
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400);
				res.send();
			}else{
				db.safeSearch("SELECT item_id from shop_order_items WHERE order_id=(SELECT id FROM shop_orders WHERE user_id=? AND status=0) AND item_id=?",[user.id,item_id],(rows)=>{
					if(rows.length==0){
						if(count>0){
							db.safeSearch("INSERT INTO shop_order_items (`order_id`, `item_id`, `amount`) VALUES ((SELECT id FROM shop_orders WHERE user_id=? AND status=0), ?, ?)",
							[user.id,item_id,count],
							function(result) {
								res.status(200);
								res.send();
							});
						}else{
							res.status(400);
							res.send();
						}
					}else{
						db.safeSearch("UPDATE shop_order_items SET amount=amount+? WHERE order_id=(SELECT id FROM shop_orders WHERE user_id=? AND status=0) AND item_id=?",
						[count,user.id,item_id],
						function(result) {
							db.search("DELETE FROM shop_order_items WHERE amount<=0",
								function(result) {
									res.status(200);
									res.send();
								}
							);
						});
					}
				});
			}
		});
	});
	
	//buys the items that are in the Warenkorb
	//needs address as query parameter
	app.post("/buy",function(req,res){
		address=req.query["address"];
		if(address==undefined){
			res.status(400).send("address parameter is missing");
		}
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()||user.getTemporary()){
				res.status(400).json("Du kannst nichts kaufen");
			}
			else{
				user.buy(address,(result)=>{
					res.status(200).send("successfully bought the items");
				});
			}
		});
	});

	// get item by id
	app.get("/item/:id", function(req, res) {
		let id = req.params.id;
		if(!Number.isInteger(item_id)){
			res.status(400);
			res.send();
			return;
		}
		new Item().getItem(id, db, function(item) {
			if(item.id != undefined) {
				res.status(200).send(item);
			} else {
				res.status(400).send({message:"no senorita"});
			}
		})
	});

	// insert item
	app.post("/item.insert", function(req, res) {
		let shopItem = new Item(
			null,
			null,
			parseInt(req.query.category_id),
			parseInt(req.query.price),
			req.query.name,
			req.query.description,
			100
		);
		
		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()||!user.isAdmin()){
				res.status(400).send({message:"no"});
				return;
			}else{
				shopItem.creator_id=user.id;
				shopItem.isAvailable=true;
				shopItem.insertItem(shopItem, db, function(id) {
					if(id >= 0) {
						shopItem.id = id;
						res.status(200).send(shopItem);
					} else {
						res.status(400).send({message:"no"})
					}
				});
			}
		});
	});
	
	app.get('/image/:item_id/:image_name', function (req, res) {
		item_id=req.params.item_id;
		image_name=req.params.image_name;
		var options = {
			root: __dirname+"/..",
			dotfiles: 'deny',
			headers: {
			  'x-timestamp': Date.now(),
			  'x-sent': true
			}
		  }
		res.sendFile("images/"+item_id+"/"+image_name,options, function (err) {
			if (err) {
			  res.status(400);
			  res.send("Image existiert nicht");
			  console.log(err);
			} else {
			  console.log('Sent:', image_name);
			}
		});
	});

	// delete item
	//We may also not want to delete an Item so that items that arent on sale will still be in the buy history of the user
	//we will will just mark them as unavaible
	app.post("/item.delete", function(req, res) {
		let id = req.query.id;

		cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()||!user.isAdmin()){
				res.status(400).send({message:"no"});
				return;
			}else{
				new Item().deleteItem(id, db, function(success) {
					if(success) {
						res.status(200).send({message:"nice"});
					} else {
						res.status(400).send({message:"no"});
					}
				});
			}
		});
	});

	app.listen(8000, function () {
		console.log("App started at localhost:8000");
	})
}

//DEPRICATED
/*
//takes an already exisiting user_id and checks if its not a temporary user
function checkIfAlreadyLoggedIn(user_id,callback){
	db.search("SELECT isTemporary FROM shop_users WHERE id="+user_id+" AND isUsed=1",(rows)=>{
		if(rows[0]==0){
			callback(true);
		}else callback(false);
	});
}


//checks if the cookie exists in the database and gives back the matching user_id
function checkCookie(cookie,callback){
	db.search("SELECT user_id FROM shop_login_cookies WHERE cookie=\""+cookie+"\"",(rows)=>{
		if(rows.length==0){
			callback(null);
		}else{
			callback(rows[0]["user_id"]);
		}
	});
}

//gets all Items as item_ids with their amount the user currently has in his warenkorb
function getWarenkorb(user_id,callback){
	db.search("SELECT item_id,amount FROM shop_order_items WHERE order_id IN (SELECT id FROM shop_orders WHERE user_id="+user_id+" AND status=0)",(rows)=>{
		callback(rows);
	});
}

*/

//creates new Cookie that doesnt already exist in the Database
function createNewCookie(callback){
	letters="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9".split(",");
	string="";
	for(let i=0;i<32;i++){
		string+=letters[getRandomInt(31)];
	}
	db.search("SELECT cookie FROM shop_login_cookies WHERE cookie=\""+string+"\"",(rows)=>{
		if(rows.length!=0){
			createNewCookie(callback);
		}
		else{
			callback(string);
		}
	});
}

//returns a random int between 0-max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//starts db and changes database before the server is online
async function setup(callback){
	await db.start();
	//change Database as default isnt set at the beginning
	await db.changeDatabase("shop");
	callback();
}
setup(start);
