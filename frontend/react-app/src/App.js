import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SoppingCart from './components/ShoppingCart';
import Products from './components/Products';
import Details from './components/Details';
import Account from './components/Account';
import Login from './components/Login';
import {ProtectedRoute} from "./components/ProtectedRoute";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shopping-cart" exact component={SoppingCart} />
            <Route path="/products" exact component={Products} />
            <Route path="/details/:id" exact component={Details} />
            <ProtectedRoute path="/account" exact component={Account} />
            <Route path="/login" exact component={Login} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;