const app = require("express")()
const db = require('./dbconnect');
const User = require('./user');
//const Category = require('./category');
const item = require('./item');
const Item = item.ShopItem;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 3, // start blocking after 5 requests
	message:
		"Too many accounts created from this IP, please try again tomorrow",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /register too many times: "+String(req.ip));
	}
});

const loginLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 min window
	max: 5, // start blocking after 5 requests
	message:
		"Too many attempts, try again in 10 min",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /login too many times: "+String(req.ip));
	}
});

const tempUserLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 min window
	max: 50, // start blocking after 50 requests
	message:
		"You are a bad Person",
	onLimitReached: function (req, res, options) {
		console.log("this ip called / too many times: "+String(req.ip));
	}
});

const uploadImageLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 min window
	max: 30, // start blocking after 30 requests
	message:
		"Sorry but these are too many Images to handle, please try again in 20 Minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /uploadImage too many times: "+String(req.ip));
	}
});

const orderLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 min window
	max: 5, // start blocking after 5 requests
	message:
		"You are a bad Person",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /order too many times: "+String(req.ip));
	}
});

const deleteImageLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 min window
	max: 30, // start blocking after 30 requests
	message:
		"Sorry but these are too many Images to handle, please try again in 20 Minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /deleteImage too many times: "+String(req.ip));
	}
});

const userLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 min window
	max: 50, // start blocking after 30 requests
	message:
		"Sorry but you tried to gain information about your user too often, please try again in 20 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /user too many times: "+String(req.ip));
	}
});

const userAllLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 min window
	max: 20, // start blocking after 20 requests
	message:
		"Sorry but you tried to gain information about all users too often, please try again in 20 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /userAll too many times: "+String(req.ip));
	}
});

const getWarenkorbLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 min window
	max: 50, // start blocking after 50 requests
	message:
		"Sorry but you tried to access your Warenkorb too many times, please try again in 10 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /getWarenkorb too many times: "+String(req.ip));
	}
});

const setWarenkorbLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 min window
	max: 100, // start blocking after 100 requests
	message:
		"Sorry but you tried to gain information about all users too often, please try again in 20 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /setWarenkorb too many times: "+String(req.ip));
	}
});

const logoutLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 min window
	max: 5, // start blocking after 5 requests
	message:
		"Sorry but you tried logout too many times, try again in 10 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /user too many times: "+String(req.ip));
	}
});

const searchLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 min window
	max: 100, // start blocking after 100 requests
	message:
		"Sorry but searched too many times, please try again in 5 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /search too many times: "+String(req.ip));
	}
});

const buyLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 min window
	max: 5, // start blocking after 5 requests
	message:
		"Sorry but you tried to buy too many times, please try again in 5 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /buy too many times: "+String(req.ip));
	}
});

const itemLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 min window
	max: 100, // start blocking after 100 requests
	message:
		"Please wait 5 minutes and try again",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /item too many times: "+String(req.ip));
	}
});

const itemInsertLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 20 min window
	max: 10, // start blocking after 30 requests
	message:
		"Sorry but you tried to insert an Item too many times, try again in 30 min",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /itemInsert too many times: "+String(req.ip));
	}
});

const itemDeleteLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 min window
	max: 30, // start blocking after 30 requests
	message:
		"Sorry but you tried to delete Images too many Times, try again in 10 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /itemDelete too many times: "+String(req.ip));
	}
});

const imageLimiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 min window
	max: 100, // start blocking after 100 requests
	message:
		"Sorry but you tried to access to many Images in a short amount of time, please try again in 2 minutes",
	onLimitReached: function (req, res, options) {
		console.log("this ip called /image too many times: "+String(req.ip));
	}
});

//db.search("select * from sample",(rows)=>{console.log(rows)});
function start(){
	app.get("/",tempUserLimiter, function (req, res) {
		console.log("/ wird aufgerufen");
		let cookie=req.cookies["sessionID"];
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
				tempUserLimiter.options.store.decrement(req.ip);
				res.send("you already have a cookie dont be greedy");
			}
		});
	});

	//change order of images of an item
	//requires a query param called item_id a json in the body which is build like this:
	//{order_id:url,order_id:url,...} order_id startet bei 1
	//die json muss aufsteigende order_ids haben
	app.use(bodyParser.json({limit: '2mb'})).post("/order",orderLimiter,function(req,res){
		console.log("/order wird aufgerufen");
		let item_id=req.query["item_id"];
		let json=req.body;
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send(null);
			}
			else{
				new Item().getItem(item_id,db,(item)=>{
					if(item.creator_id==user.id){
						db.safeSearch("SELECT url FROM shop_item_images WHERE item_id=? ORDER BY order_id ASC",[item_id],(rows)=>{
							if(rows.length!=Object.keys(json).length){
								res.status(400).send("zu wenig Einträge");
								return;
							}
							let values=[];
							for(let i=0;i<rows.length;i++){
								values.push(json[String(i+1)]);
							}
							for(let i=0;i<rows.length;i++){
								if(!values.includes(rows[i]["url"])){
									res.status(400).send("falsche Einträge");
									return;
								}
							}
							for(let i=0;i<rows.length;i++){
								let finished=0;
								db.safeSearch("UPDATE shop_item_images SET order_id=? WHERE item_id=? AND url=?",[Object.keys(json)[i],item_id,json[String(i+1)]],()=>{
									finished++;
									if(finished==rows.length){
										res.status(200).send("successfully updated the order_id");
									}
								})
							}
						});
					}
					else{
						res.status(400).send(null);
					}
				});
			}
		});
	});
	
	//deletes an image of an item that *this* user created
	//needs item_id and image_name as query param
	app.post("/deleteImage",function(req,res){
		console.log("/deleteImage wird aufgerufen");
		let item_id=parseInt(req.query["item_id"]);
		let image_name=req.query["image_name"];
		if(!Number.isInteger(item_id)||image_name==undefined||image_name.match(/[a-zA-Z0-9]\.\w+$/)==null){
			res.status(400).send();
			return;
		}
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).json(null);
			}
			else{
				new Item().getItem(item_id,db,(item)=>{
					if(user.id==item.creator_id){
						item.deleteImage(image_name,db,(succ)=>{
							if(succ)res.status(200).send("successfully deleted");
							else res.status(400).send("image doesnt exist");
						});
					}else{
						res.status(400).send("no");
					}
				});
			}
		});
	});
	
	//posts a new image to the according item
	//order_id sets the order, in which the items are to be displayed
	//the input image must be a base64 encoded string in the field "image" from a json in the html-body
	//automatically merges the image's order_id into the rest if a conflict occurs
	app.use(bodyParser.json({limit: '10mb'})).post("/uploadImage",uploadImageLimiter,function (req, res){
		console.log("/uploadImage wird aufgerufen");
		let item_id = parseInt(req.query.item_id);
		let order_id = parseInt(req.query.order_id);
		let image_name = req.query.image_name;
		if(!Number.isInteger(item_id)||!Number.isInteger(order_id)||image_name.match(/[a-zA-Z0-9]\.\w+$/)==null||req.body.image==undefined){
			res.status(400).send();
			return;
		}
		// image_name will be in query_params
		let image_string = req.body.image.toString();
		
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send("no");
			}
			else{
				new Item().getItem(item_id,db,(item)=>{
					if(item.creator_id==user.id){
						item.setImage(image_string, order_id, image_name, db, function(){
							res.status(200).send({message:"Image was successfully uploaded"});
						});
					}else{
						res.status(400).send({message:"no"});
					}
				});
			}
		});
	});

	//gets user-object from db that is associated with the cookie
	app.get("/user",userLimiter, function (req, res) {
		console.log("/user wird aufgerufen");
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).json(null);
			}
			else{
				let userWithLessInfo=new User({"id":user.id,"username":user.username,"admin":user.admin})
				res.status(200).json(userWithLessInfo);
			}
		});
	})
	
	//gets all user-objects in ascending order in the db
	//only usable as admin
	app.get("/userAll",userAllLimiter ,function (req, res) {
		console.log("/userAll wird aufgerufen");
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(us)=>{
			if(us.isEmpty()||!us.isAdmin()){
				res.status(400).send({message:"I dont think so m8"});
			}else{
				db.search("SELECT id FROM shop_users ORDER BY id ASC",(result)=>{
					let allUsers=[];
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
	app.post("/login",loginLimiter,function(req, res){
		console.log("/login wird aufgerufen");
        let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send({message:"No"});
			}
			else{
				if(!user.getTemporary()){
					loginLimiter.resetKey(req.ip);
					res.status(200).send({message:"Yes"});
				}else{
					let username = req.query["username"];
					let password = req.query["password"];
					let security_answer= req.query["security_answer"];
					if(username==undefined || (password==undefined && security_answer==undefined)){
						res.status(400).send({message:"No"});
					}
					if(security_answer==undefined)security_answer="";
					new User({"db":db}).getUser(username,password,security_answer,(user2)=>{
						if(user2.isEmpty()||user2.getTemporary()){
							res.status(400).send({message:"No"});
						}else{
							user.markUnused(()=>{
								user2.connectUserWithCookie(cookie,()=>{
									user2.mergeWarenkorb(user,()=>{
										loginLimiter.resetKey(req.ip);
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
	app.post("/logout",logoutLimiter,function(req, res){
		console.log("/logout wird aufgerufen");
		let cookie=req.cookies["sessionID"];
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
    app.get("/search", searchLimiter,function(req, res){
		console.log("/search wird aufgerufen");
		let cats = req.query.category.toString();
		let sfor = req.query.item+"%";

        let splitCat = cats.split(",").forEach(x => {x = "'"+x+"'"});
        if(splitCat!=null){
            db.search("select * from shop_categories where name IN ("+splitCat+")", (rows)=>{
                var categories = new Array();
                for (let index = 0; index < rows.length; index++) {
                    categories.push(rows[index].id);
                }
                if(categories==[]){
                    console.log(categories);
                    db.search("select * from shop_items where category_id IN (" +categories+ ") AND name LIKE \""+sfor+"\"", (rows)=>{
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
            db.search("select * from shop_items where name LIKE \""+sfor+"\"", (rows)=>{
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
	app.post("/register",createAccountLimiter, function(req, res) {
		console.log("/register wird aufgerufen");
		let username = req.query["username"];
		let password = req.query["password"];
		let security_answer = req.query["security_answer"];
		if(username==undefined||password==undefined||security_answer==undefined){
			res.status(400).send({message:"wrong parameters"});
		}
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()){
				res.status(400).send({message:"No"});
			}
			else{
				new User({"db":db,"username":username}).exists((exist)=>{
					if(exist){
						createAccountLimiter.options.store.decrement(req.ip);
						res.status(400).send({message:"User already exists"});
					}else{
						let newUser=new User({"db":db,"username":username,"password":password,"security_answer":security_answer,"admin":false,"isTemporary":false,"isUsed":true});
						newUser.addUser((id)=>{
							newUser.id=id;
							user.disconnectCookieFromUser(()=>{
								if(user.getTemporary()){
									user.markUnused(()=>{
										newUser.connectUserWithCookie(cookie,()=>{
											newUser.mergeWarenkorb(user,()=>{
												res.status(200).send({message:"User has been added"});
											});
										});
									});
								}
								else{
									newUser.connectUserWithCookie(cookie,()=>{
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
	app.get("/getWarenkorb", getWarenkorbLimiter,function(req,res) {
		console.log("/getWarenkorb wird aufgerufen");
		let cookie=req.cookies["sessionID"];
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
	app.post("/setWarenkorb",setWarenkorbLimiter, function(req,res) {
		console.log("/setWarenkorb wird aufgerufen");
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie==null;
		let item_id=parseInt(req.query["item_id"]);
		let count=parseInt(req.query["count"]);
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
							function() {
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
						function() {
							db.search("DELETE FROM shop_order_items WHERE amount<=0",
								function() {
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
	app.post("/buy",buyLimiter,function(req,res){
		console.log("/buy wird aufgerufen");
		let address=req.query["address"];
		if(address==undefined){
			res.status(400).send("address parameter is missing");
		}
		let cookie=req.cookies["sessionID"];
		if(cookie==undefined)cookie=null;
		new User({"cookie":cookie,"db":db},(user)=>{
			if(user.isEmpty()||user.getTemporary()){
				res.status(400).json("Du kannst nichts kaufen");
			}
			else{
				user.buy(address,()=>{
					res.status(200).send("successfully bought the items");
				});
			}
		});
	});

	// get item by id
	app.get("/item/:id",itemLimiter, function(req, res) {
		console.log("/item/:id wird aufgerufen");
		let id = parseInt(req.params.id);
		if(!Number.isInteger(id)){
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
	app.post("/item.insert",itemInsertLimiter, function(req, res) {
		console.log("/item.insert wird aufgerufen");
		let shopItem = new Item(
			null,
			null,
			parseInt(req.query.category_id),
			parseInt(req.query.price),
			req.query.name,
			req.query.description,
			100
		);
		
		let cookie=req.cookies["sessionID"];
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
	
	app.get('/image/:item_id/:image_name',imageLimiter, function (req, res) {
		console.log("/image/:item_id/:image_name");
		let item_id=req.params.item_id;
		let image_name=req.params.image_name;
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
	app.post("/item.delete",itemDeleteLimiter, function(req, res) {
		console.log("/item.delete");
		let id = req.query.id;

		let cookie=req.cookies["sessionID"];
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

	app.use(function (err, req, res, next) {
		console.error(err.stack);
		res.status(400).send();
	});
	
	app.listen(8000, function () {
		console.log("App started at localhost:8000");
	});
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
	let letters="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9".split(",");
	let string="";
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
