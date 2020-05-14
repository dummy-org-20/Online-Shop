import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-3">
                    <Link to="/details/abc">
                    <div className="card no-radius">
                        <div className="zoom">
                        <img className="card-img-top" src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/i1-512bfa8a-01a0-4971-bd34-9cef18a159e0/air-force-1-07-damenschuh-sg6nmr.jpg" alt="Kein Bild" />
                        </div>
                        <div className="card-body">
                        <h5>Nike Air Force 1</h5>
                        <h5>99,99€</h5>
                        </div>
                    </div>
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductCard;