class User {
	//create a user or create user with a cookie, and get the user that is associated with the cookie
	//example:
	//new User(1,"xd","password","mom",true,false,true) creates a normal user
	//new User(0,0,0,0,0,0,0,req.cookies["sessionID"],db,callback) gives back the user that uses the cookie in the callback
	//if no user user the cookie it gives back the empty user
	//may also be used if the cookie is undefined
    constructor(id, username, password, security_answer, admin, isTemporary, isUsed, cookie, db, callback){
		if(cookie!==null&&db!=null){
			checkCookie(cookie,db,(rows)=>{
				getUserByID(rows,db,(result)=>{
					//console.log(result);
					if(result!=null)Object.assign(this, result[0]);
					callback(this);
				});
			});
		}
		else{
			this.id = id;
			this.username = username;
			this.password = password;
			this.security_answer = security_answer;
			this.admin = admin;
			this.isTemporary=isTemporary;
			this.isUsed=isUsed;
			if(callback!=null)callback(this);
		}
    }

	//funktion geht davon aus, das alles, bis auf das ID attribut in dem derzeitigen User eingetragen ist.
	//gibt im callback die id des neuen kreierten User zurück
	addUser(db,callback){
		db.safeSearch("INSERT INTO shop_users (`username`, `password`,`security_answer`,`admin`,`isTemporary`,`isUsed`) VALUES (?, ?, ?, ?, ?, ?)",
		[this.username,this.password,this.security_answer,this.admin,this.isTemporary,this.isUsed],
		function(res) {
			console.log("added user number "+res["insertId"]);
			callback(res["insertId"]);
		});
	}
	
	//gibt die id eines tempusers zurück die genutzt werden kann
	getTempUser(db,callback){
		db.search("SELECT MIN(id) FROM shop_users WHERE isTemporary=1 AND isUsed=0",(result)=>{
			if(result[0]["MIN(id)"]==null){
				new User(0,"temp","temp","",false,true,true).addUser(db,(id)=>{
					callback(id);
				});
			}else{
				db.safeSearch("UPDATE shop_users SET isUsed=1 WHERE id=?",[result[0]["MIN(id)"]],(res)=>{
					callback(result[0]["MIN(id)"]);
				});
			}
		});
	}
	
	//connects the id of *this* user to the cookie
	connectUserWithCookie(db,cookie){
		db.safeSearch("SELECT cookie FROM shop_login_cookies WHERE cookie=?",[cookie],(result)=>{
			if(result.length==0){
				db.safeSearch("INSERT INTO shop_login_cookies (`user_id`,`cookie`) VALUES (?,?)",[this.id,cookie],(result)=>{
					//maybe return if it worked
				});
			}else{
				db.safeSearch("UPDATE shop_login_cookies SET user_id=? WHERE cookie=?",[this.id,cookie],(result)=>{
					//maybe return if it worked
				});
			}
		});
	}
	
	//deletes cookie associated with *this* user
	disconnectCookieFromUser(db){
		db.safeSearch("DELETE FROM shop_login_cookies WHERE user_id=?;",[this.id],(res)=>{
			//maybe return it worked
		});
	}
	
	isAdmin(){
		return this.admin;
	}
	
	isEmpty(){
		for(var prop in this) {
			if(this.hasOwnProperty(prop))
				return false;
		}
		return true;
	}
}

//checks if the cookie exists in the database and gives back the matching user_id
function checkCookie(cookie,db,callback){
	if(cookie==undefined){
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