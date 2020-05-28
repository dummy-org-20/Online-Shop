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

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent <= 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    render() {
        return (
            <tr>
                <td onClick={() => window.location.href='../details/'+this.props.item.id}>
                    <img src={ this.props.item.img } width={45} height={45} alt="This is where the item would be displayed"/>
                    <span> { this.props.item.titel }</span>
                </td>
                <td>
                    <button type="button" className="btn btn-outline-dark no-radius" onClick={() => this.decreaseAmount()}>-</button>
                    <span className="ammount">{ this.state.amount }</span>
                    <button type="button" className="btn btn-outline-dark no-radius" onClick={() => this.increaseAmount()}>+</button>
                </td>
                <td>
                    <p> { this.formatPrice(this.props.item.preis) } </p>
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