
class Auth {
    constructor() {
        this.authenticated = false;
        this.updateApp=()=>{};
        this.state = {
            user:"",
            type:"",
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

        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getType = this.getType.bind(this);
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
        this.fetchUser(async (data) => {
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
            await this.updateApp();
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

    getData(cb){
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
                this.cool=true;
            }
            cb();
        });})
    }

    initializeAppUpdate=(func)=>{
        this.updateApp=func;
    }

    isAuthenticated=()=> {
        return new Promise((resolve, reject)=> {
            if(this.cool)resolve(this.authenticated);
            else this.getData(()=>resolve(this.authenticated));
          });
    }

    isAdmin= ()=>{
        return new Promise((resolve, reject)=> {
            if(this.cool)resolve(this.state.admin);
            else this.getData(()=>resolve(this.state.admin));
        });
    }

    getUser= ()=>{
        return new Promise((resolve, reject)=> {
            if(this.cool)resolve(this.state.user);
            else this.getData(()=>resolve(this.state.user));
        });
    }

    getType=()=>{
        return new Promise((resolve, reject)=> {
            if(this.cool)resolve(this.state.type);
            else this.getData(()=>resolve(this.state.type));
        });
    }
}

export default new Auth;
