import React, { Component } from 'react';
import Header from './Header';
import ShoppingCartItems from './ShoppingCartItems';
import ShoppingCartModal from './ShoppingCartModal';


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
            <React.Fragment>
                <Header name="Warenkorb" sort="d-none" />
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
                <ShoppingCartModal />
            </React.Fragment>
        )
    }
}

export default SoppingCart;