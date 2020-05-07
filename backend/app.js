const app = require("express")()
const db = require('./dbconnect');
const User = require('./user');
const Category = require('./category');
const item = require('./item');
const Item = item.ShopItem;
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//db.search("select * from sample",(rows)=>{console.log(rows)});
function start(){
	app.get("/", function (req, res) {
		console.log(req.cookies);
		checkCookie("xd",(user_id)=>{
			if(user_id==null){
				createNewCookie((cookie)=>{
					res.cookie("sessionID",cookie);
					//adduser(cookie);
				});
			}
			//res.send("ye boi");
		});
	});

	//gets user-object from db
	app.get("/user/:name", function (req, res) {
		let userName = req.params.name;
		let user = db.search("select * from shop_users where username='"+userName+"'", (rows)=>{
			let user = Object.assign(new User(), rows[0])

			res.status(200).json(user);
		});
	})

	//login for the user
	app.get("/login", function(req, res){
        cookie=req.cookies["sessionID"];
        checkCookie(cookie,(user_id)=>{
			checkIfAlreadyLoggedIn(user_id,(t)=>{
				if(t){
					res.status(200).send({message:"Yes"});
				}else{
					let userName = req.query.name;
					let password = req.query.password;
					let user = db.search("select * from shop_users where username=\'"+userName+"\'", (rows)=>{
						let user = Object.assign(new User(), rows[0])
						if (password == user.password) {
							res.status(200).send({message:"Yes"});
						} else {
							res.status(418).send({message:"No"});
						}
					});
				}
			});
		});
    });
});

    //search after itemName in single, multiple or all categories
    app.get("/search", function(req, res){
		let cats = req.query.category.toString();
		let sfor = req.query.item;

        splitCat = cats.split(",").forEach(x => {x = "'"+x+"'"});
        if(splitCat!=null){
            let category = db.search("select * from shop_categories where name IN ("+splitCat+")", (rows)=>{
                var categories = new Array();
                for (let index = 0; index < rows.length; index++) {
                    categories.push(rows[index].id);
                }
                if(categories==[]){
                    console.log(categories);
                    let item = db.search("select * from shop_items where category_id IN (" +categories+ ") AND name = \'"+sfor+"\'", (rows)=>{
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
            let item = db.search("select * from shop_items where name = \'"+sfor+"\'", (rows)=>{
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
    //WIP
	app.post("/user", function(req, res) {
		let user = new User(parseInt(req.query.id), req.query.name, req.query.password, req.query.securityAnswer, "true" == req.query.admin)
		res.status(200);
	})
	
	app.get("/getWarenkorb", function(req,res) {
		cookie=req.cookies["sessionID"];
		checkCookie(cookie,(user_id)=>{
			if(user_id==null){
				res.status(200).json(null);
			}
			else{
				getWarenkorb(user_id,(result)=>{
					console.log(result)
					for(let i=0;i<result.length;i++){
						getImagesURL(result[i]["id"],(urls)=>{
							result[i]["urls"]=urls;
							console.log(urls);
							console.log(result[i]);
							if(i==result.length-1){
								res.status(200).json(result);
							}
						});
					}
				});
			}
		});
	});

	// get item by id
	app.get("/item/:id", function(req, res) {
		let id = req.params.id;

		item.getItem(id, db, function(item) {
			if(item.id != undefined) {
				res.status(200).send(item);
			} else {
				res.status(400).send({message:"no senorita"});
			}
		})
	});

	// insert item
	app.post("/item.insert", function(req, res) {
		let shopItem = new ShopItem(
			parseInt(req.query.creator_id),
			parseInt(req.query.category_id),
			parseInt(req.query.price),
			req.query.name,
			req.query.description
		);

		let token = req.cookies["sessionID"];
		checkCookie(token, (user_id) => {
			if(user_id == null) return;

			// TODO isAdmin für den User
			item.insertItem(shopItem, db, function(id) {
				if(id >= 0) {
					shopItem.id = id;
					res.status(200).send(shopItem);
				} else {
					res.status(400).send({message:"no"})
				}
			});
		});
	});

	// delete item
	app.post("/item.delete", function(req, res) {
		let id = req.query.id;

		let token = req.cookies["sessionID"];
		checkCookie(token, (user_id) => {
			if(user_id == null) return;

			// TODO isAdmin für den User
			item.deleteItem(id, db, function(success) {
				if(success) {
					res.status(200).send({message:"nice"});
				} else {
					res.status(400).send({message:"no"});
				}
			});
		});
	});

	app.listen(8000, function () {
		console.log("App started at localhost:8000");
	})
}

//takes an already exisiting user_id and checks if its not a temporary user
function checkIfAlreadyLoggedIn(user_id,callback){
	db.search("SELECT isTemporary FROM shop_users WHERE id="+user_id+" AND isUsed=1",(rows)=>{
		if(rows[0]==0){
			callback(true);
		}else callback(false);
	});
}

//gets item_id returns array in callback with urls of all images that belong to the item_id 
function getImagesURL(item_id,callback){
	db.search("SELECT url,order_id FROM shop_item_images WHERE item_id="+item_id+" ORDER BY order_id ASC",(rows)=>{
		result={};
		for(let i =0;i<rows.length;i++){
			result[i]=rows[i]["url"];
		}
		callback(result);
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

//gets all Items the user currently has in his warenkorb
function getWarenkorb(user_id,callback){
	db.search("SELECT * FROM shop_items WHERE id IN (SELECT item_id FROM shop_order_items WHERE order_id IN (SELECT id FROM shop_orders WHERE user_id="+user_id+" AND status=0))",(rows)=>{
		callback(rows);
	});
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function setup(callback){
	await db.start();
	//change Database as default isnt set at the beginning
	await db.changeDatabase("shop");
	callback();
}
setup(start);
