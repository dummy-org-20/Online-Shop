const app = require("express")()
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'myUser', 
     password: 'myPassword',
     connectionLimit: 1
});

pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT 1 as val")
        .then(rows => { // rows: [ {val: 1}, meta: ... ]
          return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        })
        .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.release(); // release to pool
        })
        .catch(err => {
          conn.release(); // release to pool
        })
        
    }).catch(err => {
      //not connected
    });

app.get("/", function (req, res) {
    res.send("ye boi");
});

app.listen(8000, function () {
    console.log("App started at localhost:8000")
})