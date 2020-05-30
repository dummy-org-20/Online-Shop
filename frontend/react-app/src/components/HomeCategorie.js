import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeCategories extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="categories" className="row">
                    <div className="col-2 categorie-item">
                        <Link to="/products?categories=8&search=">
                        <i className="fa fa-mobile" aria-hidden="true" />
                        </Link>
                        <h4>Smartphones</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <Link to="/products?categories=9&search=">
                        <i className="fa fa-rocket" aria-hidden="true" />
                        </Link>
                        <h4>Spielzeuge</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <Link to="/products?categories=5&search=">
                        <i className="fa fa-camera" aria-hidden="true" />
                        </Link>
                        <h4>Kameras</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <Link to="/products?categories=2&search=">
                        <i className="fa fa-gamepad" aria-hidden="true" />
                        </Link>
                        <h4>Gaming</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <Link to="/products?categories=1&search=">
                        <i className="fa fa-book" aria-hidden="true" />
                        </Link>
                        <h4>Bücher</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <Link to="/products?categories=10&search=">
                        <i className="fa fa-television" aria-hidden="true" />
                        </Link>
                        <h4>TV</h4>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomeCategories;
