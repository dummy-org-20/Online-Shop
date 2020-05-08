import React, { Component } from 'react';
import ShoppingCartItems from './ShoppingCartItems';
import Header from './Header';


class SoppingCart extends Component {
    state = {
        items: [
            {
                id: 1,
                titel: 'CHAMPION - Legacy Baseball Cap 1',
                preis: '14,34€',
                menge: 1
            },
            {
                id: 2,
                titel: 'CHAMPION - Legacy Baseball Cap 2',
                preis: '15,34€',
                menge: 2
            },
            {
                id: 3,
                titel: 'CHAMPION - Legacy Baseball Cap 3',
                preis: '13,34€',
                menge: 1
            },
        ]
        
    }

    render() {
        return (
            <div>
                <Header />
                {/* SHOPPING-CART-TABLE */}
                <main id="shopping-cart">
                <div className="container">
                    <table className="table borderless">
                    <thead>
                        <tr>
                        <th scope="col">Produkt</th>
                        <th scope="col">Anzahl</th>
                        <th scope="col">Preis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ShoppingCartItems items={this.state.items}/>
                    </tbody>
                    </table>
                    <div id="shopping-cart-options">
                    <button type="button" className="btn btn-outline-dark no-radius btn-lg" data-toggle="modal" data-target="#myModal">BESTELLEN</button>
                    <input className="form-control" id="myInput" type="text" placeholder="Rabatt-Code" />
                    </div>
                </div>
                </main>
                {/* MODAL */}
                <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content no-radius">
                    <div className="modal-header">
                        <h4 className="modal-title">BESTELLUNG</h4>
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    <div className="modal-body">
                        <h3>Summe: 39,48€</h3>
                        <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Vorname</label>
                            <input type="text" className="form-control" id="inputVorname" placeholder="Vorname" />
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Nachname</label>
                            <input type="text" className="form-control" id="inputNachname" placeholder="Nachname" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-10">
                            <label htmlFor="inputEmail4">Straße</label>
                            <input type="text" className="form-control" id="inputStraße" placeholder="Straße" />
                            </div>
                            <div className="form-group col-md-2">
                            <label htmlFor="inputPassword4">Nr.</label>
                            <input type="text" className="form-control" id="inputNr" placeholder="Nr." />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                            <label htmlFor="inputEmail4">PLZ</label>
                            <input type="text" className="form-control" id="inputPlz" placeholder="PLZ" />
                            </div>
                            <div className="form-group col-md-7">
                            <label htmlFor="inputPassword4">Ort</label>
                            <input type="text" className="form-control" id="inputOrt" placeholder="Ort" />
                            </div>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark no-radius btn-lg" data-dismiss="modal">Bestellen</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default SoppingCart;