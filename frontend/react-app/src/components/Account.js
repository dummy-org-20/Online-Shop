import React, { Component } from 'react';
import Header from './Header';

class Account extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <h1>Mein Konto</h1>
            </React.Fragment>
        )
    }
}

export default Account;