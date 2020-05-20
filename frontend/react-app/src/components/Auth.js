class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb) {
        this.authenticated = true;
        cb(); // call bach für spaeter
    }

    logout(cb) {
        this.authenticated = false;
        cb(); // call bach für spaeter
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth;
