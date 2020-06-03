class Auth {
    constructor() {
        this.authenticated = false;
        this.state = {
            user:"" 
        };
        
        this.getCookie(() => {this.fetchUser((data) => {
            if (data.username !== 'temp') {
                this.authenticated = true;
            }
            this.state.user = data.username;
        });})
        // Check if User is already logged in
        
        
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
            if (data.username !== 'temp') {
                this.authenticated = true;
            }
            this.state.user = data.username;
            cb(); // call back für spaeter
        });
    }

    logout(cb) {
        this.fetchUser((data) => {
            if (data.username !== 'temp') {
                this.authenticated = false;
            }
            this.state.user = "";
            cb(); // call back für spaeter
        });
    }

    signup(cb) {
        this.fetchUser((data) => {
            this.authenticated = true;
            this.state.user = data.username;
            cb(); // call back für spaeter
        });
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth;
