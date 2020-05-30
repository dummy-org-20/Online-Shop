import React, { Component } from 'react';
import ShoppingCartItem from './ShoppingCartItem';
import PropTypes from 'prop-types';

class ShoppingCartItems extends Component {
    render() {
        return this.props.items.map((item) =>(
            (
                <ShoppingCartItem key={item.id} changeSum={this.props.changeSum} item={item} />
            )
        ));
    }
}

// PropTypes
ShoppingCartItems.protoTypes = {
    items: PropTypes.array.isRequired
}


export default ShoppingCartItems;

