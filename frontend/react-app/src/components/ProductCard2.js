import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductCard2 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-3">
                    <Link to={"/details/"+String(this.props.id)}>
                    <div className="card no-radius">
                        <div className="zoom">
                        <img className="card-img-top" style={{"max-width":"100%","max-height":"100%","object-fit": "contain"}} src={this.props.url} alt={this.props.alt} name={this.props.name} />
                        </div>
                        <div className="card-body">
                            <h5>{this.props.name}</h5>
                            <h5>{this.props.price}</h5>
                        </div>
                    </div>
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

ProductCard2.protoTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id : PropTypes.number.isRequired
}

export default ProductCard2;