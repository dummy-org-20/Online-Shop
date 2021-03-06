const db = require('./dbconnect');
var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var commands = require("./dbsetup.txt");

commands=commands.split(";");

function start(){
	rekursiveSyncCreate(0,0);
}

function rekursiveSyncCreate(i){
	if(i!=commands.length-1){
		db.search(commands[i]+";",()=>{
			console.log("Der "+(i+1)+". Befehl von "+(commands.length-1)+" wurde ausgeführt");
			rekursiveSyncCreate(i+1);
		});
	}else{
		process.exit();
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

