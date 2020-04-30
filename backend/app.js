const app = require("express")()
const db = require('./dbconnect');
const User = require('./user');

//db.search("select * from sample",(rows)=>{console.log(rows)});
function start(){
	app.get("/", function (req, res) {
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
	app.post("/user", function(req, res) {
		let user = new User(parseInt(req.query.id), req.query.name, req.query.password, req.query.securityAnswer, "true" == req.query.admin)
		res.status(200);
	})

	app.listen(8000, function () {
		console.log("App started at localhost:8000")
	})
}

async function setup(callback){
	await db.start();
	//change Database as default isnt set at the beginning
	await db.changeDatabase("shop");
	callback();
}
setup(start);