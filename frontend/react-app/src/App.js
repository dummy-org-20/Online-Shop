import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SoppingCart from './components/SoppingCart';
import Products from './components/Products';
import Details from './components/Details';
import Account from './components/Account';
import Login from './components/Login';

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shopping-cart" component={SoppingCart} />
            <Route path="/products" component={Products} />
            <Route path="/details/:id" component={Details} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;