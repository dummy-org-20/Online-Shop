const mariadb = require('mariadb');
const config= require('./config.json');
const pool = mariadb.createPool({
     host: config.host, 
	 user: config.user,
	 port: 5077, 
     password: config.password,
     connectionLimit: config.connectionLimit,
	 database: config.database
});


let start= async function(){
	return new Promise((resolve,_reject)=>{
		pool.getConnection()
		.then(conn => {
			resolve(true);
		}).catch(err => {
		  console.log("Error konnte nicht mit Datenbank verbinden, überprüfe die Config.json");
		  _reject(true);
		});
	});
}

let search = function (q,callback){
	pool.query(q)
		.then((rows) => {
			callback(rows);
		})
		.catch(err => {
			console.log(err); 
			return
		})
}

exports.search=search;
exports.start=start;