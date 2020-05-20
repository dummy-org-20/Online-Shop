import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ShoppingCartItem extends Component {
    
    state = {amount: this.props.item.menge}

    increaseAmount() {
        fetch("/setWarenkorb?item_id="+this.props.item.id+"&count="+ 1, {method: 'POST'}).then(response => {
            this.setState({amount: this.state.amount + 1})
        });
    }

    decreaseAmount() {
        fetch("/setWarenkorb?item_id="+this.props.item.id+"&count="+ -1, {method: 'POST'}).then(response => {
            this.setState({amount: this.state.amount - 1})
        });
    }

    render() {
        return (
            <tr>
                <td>
                    <img src={ this.props.item.img } width={45} height={45} />
                    <span> { this.props.item.titel }</span>
                </td>
                <td>
                    <button type="button" className="btn btn-outline-dark no-radius" onClick={() => this.decreaseAmount()}>-</button>
                    <span className="ammount">{ this.state.amount }</span>
                    <button type="button" className="btn btn-outline-dark no-radius" onClick={() => this.increaseAmount()}>+</button>
                </td>
                <td>
                    <p>{ this.props.item.preis } €</p>
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