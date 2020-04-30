const app = require("express")()
const db = require('dbconnect');

app.get("/", function (req, res) {
    res.send("ye boi");
});

app.listen(8000, function () {
    console.log("App started at localhost:8000")
})