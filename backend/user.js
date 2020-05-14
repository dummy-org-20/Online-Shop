class User {
	//create a user or create user with a cookie, and get the user that is associated with the cookie
	//example:
	//new User({"id":"","username":"", "password":"","security_answer":"","admin":false,"isTemporary":false,"isUsed":false,"cookie":"","db":db},callback)
	//if no user user the cookie it gives back the empty user
	//may also be used if the cookie is null
    constructor(dic,callback){
		Object.assign(this,dic);
		if(this.cookie!==undefined&&this.db!==undefined&&callback!=undefined){
			checkCookie(this.cookie,this.db,(rows)=>{
				getUserByID(rows,this.db,(result)=>{
					//console.log(result);
					if(result!=null)Object.assign(this, result[0]);
					callback(this);
				});
			});
		}else if(callback!=undefined){
			callback(this);
		}
    }

	//funktion geht davon aus, das alles, bis auf das ID attribut in dem derzeitigen User eingetragen ist.
	//gibt im callback die id des neuen kreierten User zurück
	addUser(callback){
		this.db.safeSearch("INSERT INTO shop_users (`username`, `password`,`security_answer`,`admin`,`isTemporary`,`isUsed`) VALUES (?, ?, ?, ?, ?, ?)",
		[this.username,this.password,this.security_answer,this.admin,this.isTemporary,this.isUsed],
		function(res) {
			console.log("added user number "+res["insertId"]);
			callback(res["insertId"]);
		});
	}
	
	//gibt die id eines tempusers zurück die genutzt werden kann
	getTempUser(callback){
		this.db.search("SELECT MIN(id) FROM shop_users WHERE isTemporary=1 AND isUsed=0",(result)=>{
			if(result[0]["MIN(id)"]==null){
				new User({"username":"temp","password":"temp","security_answer":"","admin":false,"isTemporary":true,"isUsed":true,"db":this.db}).addUser((id)=>{
					callback(id);
				});
			}else{
				this.db.safeSearch("UPDATE shop_users SET isUsed=1 WHERE id=?",[result[0]["MIN(id)"]],(res)=>{
					callback(result[0]["MIN(id)"]);
				});
			}
		});
	}
	
	getTemporary(){
		return this.isTemporary;
	}
	
	//password for temp user is temp
	getUser(username,password,callback){
		this.db.safeSearch("SELECT * FROM shop_users WHERE username=? AND password=?",[username,password],(result)=>{
			if(result.length==0){
				callback(this);
			}else{
				Object.assign(this,result[0]);
				callback(this);
			}
		});
	}
	
	//connects the id of *this* user to the cookie
	connectUserWithCookie(cookie,callback){
		this.db.safeSearch("SELECT user_id FROM shop_login_cookies WHERE user_id=?",[this.id],(result)=>{
			if(result.length==0){
				this.db.safeSearch("INSERT INTO shop_login_cookies (`user_id`,`cookie`) VALUES (?,?)",[this.id,cookie],(result)=>{
					callback(result);
				});
			}else{
				this.db.safeSearch("UPDATE shop_login_cookies SET cookie=? WHERE user_id=?",[cookie,this.id],(result)=>{
					callback(result);
				});
			}
		});
	}
	
	//deletes cookie associated with *this* user
	disconnectCookieFromUser(callback){
		this.db.safeSearch("DELETE FROM shop_login_cookies WHERE user_id=?;",[this.id],(res)=>{
			callback(res);
		});
	}

	
	isAdmin(){
		return this.admin;
	}
	
	isEmpty(){
		for(var prop in this) {
			if(this[prop]==null||this[prop]==this["db"]||prop=="cookie")continue;
			if(this.hasOwnProperty(prop))
				return false;
		}
		return true;
	}
}

//checks if the cookie exists in the database and gives back the matching user_id
function checkCookie(cookie,db,callback){
	if(cookie==null){
		callback(null);
		return;
	}
	db.search("SELECT user_id FROM shop_login_cookies WHERE cookie=\""+cookie+"\"",(rows)=>{
		if(rows.length==0){
			callback(null);
		}else{
			callback(rows[0]["user_id"]);
		}
	});
}

function getUserByID(id,db,callback){
	if(id==null){
		callback(null);
	}
	db.search("select * from shop_users where id="+id, (rows)=>{
		if(rows.length==0){
			callback(null);
		}
		else callback(rows);
	});
}

module.exports = User