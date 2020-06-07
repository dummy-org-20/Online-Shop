import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SoppingCart from './components/ShoppingCart';
import Products from './components/Products';
import Details from './components/Details';
import Account from './components/Account';
import Login from './components/Login';
import Auth from './components/Auth'
import {ProtectedRoute} from "./components/ProtectedRoute";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth:false,
      initialised:false
    };
  }

  getInitialState= function () {
    return { info: {} };
  }

  componentDidMount() {
    const getAuth= async ()=>{
      let auth=await Auth.isAuthenticated();
      this.setState({
        auth:auth,
        initialised:true
      })
      Auth.initializeAppUpdate(this.checkChange)
    }
    getAuth();
  }

  checkChange= async ()=>{
    let auth=await Auth.isAuthenticated();
    if(this.state.auth!=auth){
      this.setState({
        auth:auth
      })
    }
    return new Promise((resolve,reject)=>{
      resolve(true)
    })
  }

  render() {
    return (
      <div>
      { this.state.initialised ?
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shopping-cart" exact component={SoppingCart} />
            <Route path="/products" exact component={Products} />
            <Route path="/details/:id" exact component={Details} />
            <ProtectedRoute path="/account" exact component={Account} auth={()=>{return this.state.auth}} checkChange={this.checkChange}/>
            <Route path="/login" exact component={Login} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </Router> : false}</div>
    );
  }
}
export default App;