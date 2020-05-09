class User {
    //can also be made only with cookie and db reference but needs to use callback
    constructor(id, username, password, security_answer, admin, cookie, db,callback){
		if(cookie!=null&&db!=null){
			checkCookie(cookie,db,(rows)=>{
				getUserByID(rows,db,(result)=>{
					console.log(result);
					Object.assign(this, result[0]);
					callback();
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
		}
    }

	//funktion geht davon aus, das alles, bis auf das ID attribut in dem derzeitigen User eingetragen ist.
	addUser(db){
		db.safeSearch("INSERT INTO shop_users (`username`, `password`,`security_answer`,`admin`,`isTemporary`,`isUsed`) VALUES (?, ?, ?, ?, ?, ?)",
		[this.username,this.password,this.security_answer,this.admin,this.isTemporary,this.isUsed],
		function(res) {
			console.log("added user number "+result);
		});
	}
	
	//gibt die id eines tempusers zurück die genutzt werden kann
	getTempUser(){
		db.search("SELECT MIN(id) FROM shop_users WHERE isTemporary=1 AND isUsed=0",(result)=>{
			if(result.length==0){
				
			}
		});
	}
	
	connectUserWithCookie(){
	
	}
	
	disconnectCookieFromUser(user_id){
	
	}
	
	isAdmin(){
		return this.admin;
	}
}

//checks if the cookie exists in the database and gives back the matching user_id
function checkCookie(cookie,db,callback){
	db.search("SELECT user_id FROM shop_login_cookies WHERE cookie=\""+cookie+"\"",(rows)=>{
		if(rows.length==0){
			callback(null);
		}else{
			callback(rows[0]["user_id"]);
		}
	});
}

function getUserByID(id,db,callback){
	db.search("select * from shop_users where id="+id, (rows)=>{
		callback(rows);
	});
}

module.exports = User