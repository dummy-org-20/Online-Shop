class Auth {
    constructor() {
        this.authenticated = false;
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
