const app = require("express")()

app.get("/", function (req, res) {
    res.send("ye boi");
});

app.listen(8000, function () {
    console.log("App started at localhost:8000")
})