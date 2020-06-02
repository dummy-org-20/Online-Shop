import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ShoppingCartItem extends Component {
    
    state = this.props.item;

    increaseAmount() {
        this.props.changeSum(parseInt(this.state.price));
        fetch("/setWarenkorb?item_id="+this.state.id+"&count="+ 1, {method: 'POST'}).then(response => {
            this.setState({amount: this.state.amount + 1})
        });
    }

    decreaseAmount() {
        this.props.changeSum(-1*parseInt(this.state.price));
        fetch("/setWarenkorb?item_id="+this.state.id+"&count="+ -1, {method: 'POST'}).then(response => {
            this.setState({amount: this.state.amount - 1},()=>{
            if(this.state.amount==0){
                this.props.delete(this.state.id);
                return;
            }})
        });
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    render() {
        return (
            <tr>
                <td onClick={() => window.location.href='../details/'+this.state.id}>
                    <img src={ this.state.img } width={45} height={45} alt="This is where the item would be displayed"/>
                    <span> { this.state.title }</span>
                </td>
                <td>
                    <button type="button" className="btn btn-outline-dark no-radius" onClick={() => this.decreaseAmount()}>-</button>
                    <span className="ammount">{ this.state.amount }</span>
                    <button type="button" className="btn btn-outline-dark no-radius" onClick={() => this.increaseAmount()}>+</button>
                </td>
                <td>
                    <p> { this.formatPrice(parseInt(this.state.price)*parseInt(this.state.amount)) } </p>
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