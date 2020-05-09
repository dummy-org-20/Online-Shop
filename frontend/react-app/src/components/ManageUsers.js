import React, { Component } from 'react';

class ManageUsers extends Component {
    render() {
        return (
            <React.Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nutzername</th>
                        <th scope="col">Konto-Typ</th>
                        <th scope="col">Optionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>187</td>
                        <td>@petername</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>Nutzer</option>
                            <option>Admin</option>
                            </select>
                        </div>
                        </td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                    <tr>
                        <td>243</td>
                        <td>@dominik_jem</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option>Nutzer</option>
                            <option selected>Admin</option>
                            </select>
                        </div>
                        </td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                    <tr>
                        <td>423</td>
                        <td>@nadja_234</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>Nutzer</option>
                            <option>Admin</option>
                            </select>
                        </div>
                        </td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default ManageUsers;