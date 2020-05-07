const db = require('./dbconnect');
var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var commands = require("./dbsetup.txt");

commands=commands.split(";");

function start(){
	tablesCreated=[];
	for(let i=0;i<commands.length-1;i++){
		db.search(commands[i]+";",(rows)=>{
			console.log("Die "+(i+1)+" Tabelle von "+(commands.length-1)+" wurde erstellt");
			tablesCreated.push(i);
			if(tablesCreated.length==commands.length-1){
				process.exit()
			}
		});
	}
}

async function setup(callback){
	await db.start();
	await db.changeDatabase("mysql");
	db.search("CREATE DATABASE IF NOT EXISTS shop;",async function(a){
		await db.changeDatabase("shop");
		callback();
	});
}
setup(start);

