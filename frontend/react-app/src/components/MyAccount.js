import React, { Component } from 'react';

class MyAccount extends Component {
    render() {
        return (
            <React.Fragment>
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="row"><b>Nutzername:</b></th>
                        <td>@peter</td>
                    </tr>
                    <tr>
                        <th scope="row"><b>Konto-Typ:</b></th>
                        <td>Admin</td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" className="btn btn-danger no-radius">Abmelden</button>
            </React.Fragment>
        )
    }
}

export default MyAccount;
