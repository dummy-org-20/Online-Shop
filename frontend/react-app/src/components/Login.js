import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <main id="login-signup">
                {/* Logo */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/500px-Amazon_logo.svg.png" width={150} height={45} alt="Shop" />
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
                        <input type="text" className="form-control" id="inputStraße" placeholder="Nutzername" />
                        </div>
                        <div className="form-group col-md-12">
                        <input type="password" className="form-control" id="inputNr" placeholder="Passwort" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-dark no-radius btn-lg btn-block" data-dismiss="modal">Anmelden</button>
                    </form>
                </div>
                {/* SignUp */}
                <div className="tab-pane fade" id="nav-signup" role="tabpanel" aria-labelledby="nav-signup-tab">
                    <form>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="inputStraße" placeholder="Nutzername" />
                        </div>
                        <div className="form-group col-md-12">
                        <input type="password" className="form-control" id="inputNr" placeholder="Passwort" />
                        </div>
                        <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Sicherheitsfrage:</label>
                        <input type="text" className="form-control" id="inputOrt" placeholder="Wie heißt Ihr Geburtsort?" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-dark no-radius btn-lg btn-block" data-dismiss="modal">Registrieren</button>
                    </form>
                </div>
                </div>
            </main>
        )
    }
}

export default Login;
