import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';
import logo from '../logo.png';
import $ from 'jquery';

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            pwd: '',
            newUser: '',
            newPwd: '',
            newQuestion: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleLogin(event) {
        const { user, pwd } = this.state;

        $.ajax({
            type:"POST",
            url : encodeURI("/login?username="+String(user)+"&password="+String(pwd)),
            success : (data)=>{
                Auth.login(() => {
                    this.props.history.push("/account");
                });
            },
            error : function(data){
                if(data.status==400){
                    alert("Username oder Passwort ist falsch");
                }else if(data.status==429){
                    alert("Too many attemps. Try again in 10 minutes");
                }else{
                    alert("There is an internal server issue. Please wait while we resolve the issue");
                }
            }
        });
    }

    handleSignup(event) {
        const { newUser, newPwd, newQuestion } = this.state;
        if(newUser==undefined||newPwd==undefined||newQuestion==undefined){
            alert("Bitte füllen sie alle Felder aus");
            return;
        }
        if(25<newUser.length) alert("Username is too long: please do not use more than 25 characters");
        if(newUser.length<3) alert("Username is too short: please use more than 3 characters");
        if(100<newPwd.length) alert("Password is too long: please do not use more than 100 characters");
        if(newPwd.length<8) alert("Password is too short: please use at least 8 characters");
        if(100<newQuestion.length) alert("Security answer is too long: please do not use more than 100 characters");
        if(newQuestion.length<2) alert("Security answer is too short: please use at least 2 characters");

        $.ajax({
            type:"POST",
            url : encodeURI("/register?username="+String(newUser)+"&password="+String(newPwd)+"&security_answer="+String(newQuestion)),
            success : (data)=>{
                Auth.login(() => {
                    this.props.history.push("/account");
                });
            },
            error : function(data){
                if(data.status==429){
                    alert("You made too many new Accounts, try again in a day")
                }else if(data.status==400){
                    alert("Dieser Nutzername existiert bereits")
                }else{
                    alert("There is an internal server issue. Please wait while we resolve the issue");
                }
            }
        });
    }
    
    render() {
        return (
            <main id="login-signup">
                {/* Logo */}
                <Link to="/">
                    <img src={logo} height={45} alt="Shop" />
                </Link>
                {/* Tabs */}
                <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-login-tab" data-toggle="tab" href="#nav-login" role="tab" aria-controls="nav-login" aria-selected="true">Anmelden</a>
                    <a className="nav-item nav-link" id="nav-signup-tab" data-toggle="tab" href="#nav-signup" role="tab" aria-controls="nav-signup" aria-selected="false">Registrieren</a>
                </div>
                </nav>
                {/* LogIn */}
                <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
                    <form>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <input 
                            name="user"
                            type="text" 
                            className="form-control"
                            id="inputStraße" 
                            placeholder="Nutzername" 
                            value={this.state.user} 
                            onChange={this.handleChange} 
                            required 
                        /> 
                        </div>
                        <div className="form-group col-md-12">
                        <input 
                            name="pwd"
                            type="password" 
                            className="form-control" 
                            id="inputNr" 
                            placeholder="Passwort" 
                            value={this.state.pwd} 
                            onChange={this.handleChange} 
                            required 
                        />
                        </div>
                    </div>
                    <button onClick={this.handleLogin} type="button" className="btn btn-outline-dark no-radius btn-lg btn-block" data-dismiss="modal">Anmelden</button>
                    </form>
                </div>
                {/* SignUp */}
                <div className="tab-pane fade" id="nav-signup" role="tabpanel" aria-labelledby="nav-signup-tab">
                    <form>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <input name="newUser" type="text" className="form-control" id="inputStraße" placeholder="Nutzername" />
                        </div>
                        <div className="form-group col-md-12">
                        <input name="newPwd" type="password" className="form-control" id="inputNr" placeholder="Passwort" />
                        </div>
                        <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Sicherheitsfrage:</label>
                        <input name="newQuestion" type="text" className="form-control" id="inputOrt" placeholder="Wie heißt Ihr Geburtsort?" />
                        </div>
                    </div>
                    <button onClick={this.handleSignup} type="button" className="btn btn-outline-dark no-radius btn-lg btn-block" data-dismiss="modal">Registrieren</button>
                    </form>
                </div>
                </div>
            </main>
        )
    }
}

export default Login;
