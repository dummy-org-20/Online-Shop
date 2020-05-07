const mariadb = require('mariadb');
const config= require('./config.json');

var pool = mariadb.createPool({
     host: config.host, 
     user: config.user, 
     password: config.password,
     connectionLimit: config.connectionLimit,
	 port: config.port
});

let changeDatabase= async function(str){
	return new Promise((resolve,reject)=>{
		pool.end().then( () => {
		pool= mariadb.createPool({
			host: config.host, 
			user: config.user, 
			password: config.password,
			connectionLimit: config.connectionLimit,
			database: str,
			port: config.port
		});
		resolve(true);
		});
	});
}

let start= async function(resolve,reject){
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

let safeSearch = function(q, p, callback) {
	pool.query(q, p)
		.then((rows) => {
			callback(rows);
		})
		.catch(err => {
			console.log(err); 
			return
		})
}

exports.search=search;
exports.safeSearch=safeSearch;
exports.start=start;
exports.changeDatabase=changeDatabase;