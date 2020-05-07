const app = require("express")()
const db = require('./dbconnect');
const User = require('./user');
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//db.search("select * from sample",(rows)=>{console.log(rows)});
function start(){
	app.get("/", function (req, res) {
		console.log(req.cookies);
		res.cookie("test", "xd");
		console.log(checkCookie("xd"));
		res.send("ye boi");
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
		let userName = req.query.name;
		let password = req.query.password;

		let user = db.search("select * from shop_users where username='"+userName+"'", (rows)=>{
			let user = Object.assign(new User(), rows[0])

			if (password == user.password) {
				res.status(200).send({message:"Yes"});
			} else {
				res.status(418).send({message:"No"});
			}

		});
	})

    //create new User in db 
    //WIP
	app.post("/user", function(req, res) {
		let user = new User(parseInt(req.query.id), req.query.name, req.query.password, req.query.securityAnswer, "true" == req.query.admin)
		res.status(200);
	})

	app.listen(8000, function () {
		console.log("App started at localhost:8000")
	})
}

//gets item_id returns array in callback with urls of all images that belong to the item_id 
function getImagesURL(item_id,callback){
	db.search("SELECT url,order_id FROM shop_item_images WHERE item_id="+item_id+" ORDER BY order_id ASC",(rows)=>{
		result=[]
		for(i of rows[0]){
			result.push(i["url"]);
		}
		callback(result);
	});
}

function checkCookie(cookie){
	db.search("SELECT user_id FROM shop_login_cookies WHERE cookie=\""+cookie+"\"",(rows)=>{
		if(rows.length==0){
			return null;
		}else{
			return rows[0]["user_id"];
		}
	});
}

async function setup(callback){
	await db.start();
	//change Database as default isnt set at the beginning
	await db.changeDatabase("shop");
	callback();
}
setup(start);