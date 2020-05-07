import React, { Component } from 'react';
import Header from './Header';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <h1>Home</h1>
            </React.Fragment>
        )
    }
}

export default Home;