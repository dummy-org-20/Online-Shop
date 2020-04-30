const app = require("express")()
const db = require('./dbconnect');
const User = require('./user');

async function setup(){
	await db.start();
}
setup();
db.search("select * from sample",(rows)=>{console.log(rows)});

app.get("/", function (req, res) {
    res.send("ye boi");
});

//gets user-object from db
app.get("/user/:name", function (req, res) {
    let userName = req.params.name;
    //get user from database 
    res.status(200).json(user);
})

//login for the user
app.get("/login", function(req, res){
    let userName = req.query.name;
    let password = req.query.password;
    if (password == "password") {
        res.status(200).send({message:"Yes"});
    } else {
        res.status(418).send({message:"No"});
    }
})

app.post("/user", function(req, res) {
    let user = new User(parseInt(req.query.id), req.query.name, req.query.password, req.query.securityAnswer, "true" == req.query.admin)
    res.status(200);
})

app.listen(8000, function () {
    console.log("App started at localhost:8000")
})