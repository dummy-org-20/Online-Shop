
class User {
    
    constructor(id, username, password, security_answer, admin){
        this.id = id;
        this.username = username;
        this.password = password;
        this.security_answer = security_answer;
        this.admin = admin;
    }

}

module.exports = User