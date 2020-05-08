import React, { Component } from 'react';
import Header from './Header';

class Details extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <h1>Details</h1>
                <p>Link: {this.props.match.params.id}</p>
            </React.Fragment>
        )
    }
}

export default Details;
