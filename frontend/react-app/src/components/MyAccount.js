import React, { Component } from 'react';
import Auth from './Auth';

class MyAccount extends Component {
    render() {
        return (
            <React.Fragment>
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="row"><b>Nutzername:</b></th>
        <td> { Auth.state.user }</td>
                    </tr>
                    <tr>
                        <th scope="row"><b>Konto-Typ:</b></th>
        <td> { Auth.state.type }</td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default MyAccount;
