import React, { Component } from 'react';
import Header from './Header';
import MyAccount from './MyAccount';
import MyOrders from './MyOrders';
import AddProduct from './AddProducts';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import Auth from './Auth';

class Account extends Component {
    render() {
        return (
            <React.Fragment>
                <Header name="Mein Konto" sort="d-none" />
                {/* BENUTZER-KONTO */}
                <main id="benutzer-konto" className="container">
                <div className="row">
                    {/* Tabs */}
                    <div className="col-md-3">
                    <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                        <li className="nav-item">
                        <a className="nav-link active" id="mein-konto-tab" data-toggle="tab" href="#mein-konto" role="tab" aria-controls="mein-konto" aria-selected="true">Mein Konto</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" id="bestellungen-tab" data-toggle="tab" href="#bestellungen" role="tab" aria-controls="bestellungen" aria-selected="false">Bestellungen</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" id="add-produkt-tab" data-toggle="tab" href="#add-produkt" role="tab" aria-controls="add-produkt" aria-selected="false">Produkt hinzufügen</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" id="nutzer-verwalten-tab" data-toggle="tab" href="#nutzer-verwalten" role="tab" aria-controls="nutzer-verwalten" aria-selected="false">Nutzer verwalten</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" id="produkte-verwalten-tab" data-toggle="tab" href="#produkte-verwalten" role="tab" aria-controls="produkte-verwalten" aria-selected="false">Produkte verwalten</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" id="bestellungen-verwalten-tab" data-toggle="tab" href="#bestellungen-verwalten" role="tab" aria-controls="bestellungen-verwalten" aria-selected="false">Bestellungen verwalten</a>
                        </li>
                    </ul>
                    {/* Signout-Btn */}
                    <div className="text-center">
                        <button onClick={
                            () => {
                                Auth.logout(() => {
                                    this.props.history.push("/");
									fetch("/logout");
                                });
                            }
                        } type="button" id="signout-btn" className="btn btn-danger no-radius text-center">Abmelden</button>
                    </div>
                    </div>
                    {/* Content */}
                    <div className="col-md-9">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="mein-konto" role="tabpanel" aria-labelledby="mein-konto-tab">
                            <MyAccount />
                        </div>
                        <div className="tab-pane fade" id="bestellungen" role="tabpanel" aria-labelledby="bestellungen-tab">
                            <MyOrders />
                        </div>
                        <div className="tab-pane fade" id="add-produkt" role="tabpanel" aria-labelledby="add-produkt-tab">
                            <AddProduct />
                        </div>
                        <div className="tab-pane fade" id="nutzer-verwalten" role="tabpanel" aria-labelledby="nutzer-verwalten-tab">
                            <ManageUsers />
                        </div>
                        <div className="tab-pane fade" id="produkte-verwalten" role="tabpanel" aria-labelledby="produkte-verwalten-tab">
                            <ManageProducts />
                        </div>
                        <div className="tab-pane fade" id="bestellungen-verwalten" role="tabpanel" aria-labelledby="bestellungen-verwalten-tab">
                            <ManageOrders />
                        </div>
                    </div>
                    </div>
                </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Account;