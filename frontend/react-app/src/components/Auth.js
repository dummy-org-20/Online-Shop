class Auth {
    constructor() {
        this.authenticated = false;

        // Check if User is already logged in
        fetch("/user", {method: 'GET'}).then(response => response.json()).then(data => {
            if (data.username !== 'temp') {
                this.authenticated = true;
            }
        });
    }

    login(cb) {
        console.log();
        this.authenticated = true;
        cb(); // call back für spaeter
    }

    logout(cb) {
        this.authenticated = false;
        cb(); // call back für spaeter
    }

    signup(cb) {
        this.authenticated = true;
        cb(); // call back für spaeter
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth;
