import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Products extends Component {
    render() {
        return (
            <React.Fragment>
                <Header name="Produkte" />
                {/* Products */}
                <main id="products" className="container">
                <div className="row">
                    <div className="col-3">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                        <h3 className="font-weight-bold">Filter</h3>
                        </li>
                        <li className="list-group-item">
                        <h5>Kategorie</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Bücher</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Gaming</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Getränke</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Hardware</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Kameras</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Küchengeräte</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Supplements</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Smartphones</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">Spielzeug</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">TV</label>
                        </div>
                        </li>
                        <li className="list-group-item" id="price-limit">
                        <h5>Preis</h5>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                            <input type="text" className="form-control" id="inkw" placeholder="Von" />
                            </div>
                            <span> - </span>
                            <div className="form-group col-md-4">
                            <input type="text" className="form-control" id="inkw" placeholder="Bis" />
                            </div>
                            <span> €</span>
                            <div className="form-group col-md-3">
                            <button type="button" className="btn btn-outline-dark no-radius" data-dismiss="modal">Los</button>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="col-9">
                    <div className="row">
                        <div className="col-4">
                        <Link to="/details/abc">
                            <div className="card no-radius">
                            <div className="zoom">
                                <img className="card-img-top" src="https://www.sony.de/image/2c01991ee6c32a1ad0f6a9f198086f96?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" alt="Kein Bild" />
                            </div>
                            <div className="card-body">
                                <h5>Sony dowadk</h5>
                                <h5>15,23€</h5>
                            </div>
                            </div>
                        </Link>
                        </div>
                        <div className="col-4">
                        <Link to="/details/abc">
                            <div className="card no-radius">
                            <div className="zoom">
                                <img className="card-img-top" src="https://media.alltricks.com/hd/11069105d528f97290107.69498196.jpg" alt="Kein Bild" />
                            </div>
                            <div className="card-body">
                                <h5>Eastpak Rucksack</h5>
                                <h5>55,99€</h5>
                            </div>
                            </div>
                        </Link>
                        </div>
                        <div className="col-4">
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
                        <div className="col-4">
                        <Link to="/details/abc">
                            <div className="card no-radius">
                            <div className="zoom">
                                <img className="card-img-top" src="https://cdn.eglobalcentral.de/images/magictoolbox_cache/8c95d73fec130487c102a73bf1ab42ce/3/1/31631/thumb360x360/3245460558/apple-iphone-11-128gb-a2223-dual-sim-black.jpg" alt="Kein Bild" />
                            </div>
                            <div className="card-body">
                                <h5>Apple IPhone 11 128GB</h5>
                                <h5>849,99€</h5>
                            </div>
                            </div>
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </main>

            </React.Fragment>
        )
    }
}

export default Products;
