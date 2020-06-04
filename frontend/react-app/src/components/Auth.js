class Auth {
    constructor() {
        this.authenticated = false;
        this.state = {
            user:"",
            type:"User",
            admin: false
        };
        this.getCookie(() => {this.fetchUser((data) => {
            if (data.username != 'temp') {
                this.authenticated = true;
                this.state.user = data.username;
                this.state.admin = data.admin;
                if(data.admin==1){
                    this.state.type = "Admin";
                } else {
                    this.state.type = "User";
                }
            this.cool = true;
            }
        });})
    }

    async getCookie(callback){
        fetch("/getCookie").then(response => {callback()});
    }

    fetchUser(callback){
        fetch("/user", {method: 'GET'}).then(response => response.json()).then(data => {
            callback(data);
        });
    }

    login(cb) {
        this.fetchUser((data) => {
            if (data.username != 'temp') {
                this.authenticated = true;
                this.state.user = data.username;
                this.state.admin = data.admin;
                if(data.admin==1){
                    this.state.type = "Admin";
                } else {
                    this.state.type = "User";
                }
            }
            cb(); // call back für spaeter
        });
    }

    logout(cb) {
            this.authenticated = false;
            this.state.user = "";
            this.state.type = "";
            this.state.admin = false;
            cb(); // call back für spaeter
    }

    signup(cb) {
        this.fetchUser((data) => {
            this.authenticated = true;
            this.state.user = data.username;
            this.state.admin = data.admin;
            if(data.admin==1){
                this.state.type = "Admin";
            } else {
                this.state.type = "User";
            }
            cb(); // call back für spaeter
        });
    }

    

    isAuthenticated() {
        return this.authenticated;
    }

    isAdmin(){
        return this.state.admin;
    }
}

export default new Auth;
