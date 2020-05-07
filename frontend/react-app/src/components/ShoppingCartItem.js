import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ShoppingCartItem extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                    <span>{ this.props.item.titel }</span>
                </td>
                <td>
                    <button type="button" className="btn btn-outline-dark no-radius">-</button>
                    <span className="ammount">{ this.props.item.menge }</span>
                    <button type="button" className="btn btn-outline-dark no-radius">+</button>
                </td>
                <td>
                    <p>{ this.props.item.preis }</p>
                </td>
            </tr>
        )
    }
}

// PropTypes
ShoppingCartItem.protoTypes = {
    item: PropTypes.object.isRequired
}

export default ShoppingCartItem;