
class User {
    
    constructor(id, username, password, securityAnswer, admin){
        this.id = id;
        this.username = username;
        this.password = password;
        this.securityAnswer = securityAnswer;
        this.admin = admin;
    }

}

module.exports = User