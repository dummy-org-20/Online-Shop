import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Header name="Startseite" sort="d-none" />
                {/* Home */}
                <main id="home">
                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                    <li data-target="#carousel" data-slide-to={0} className="active" />
                    <li data-target="#carousel" data-slide-to={1} />
                    <li data-target="#carousel" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100 carousel-img" src="https://cdn.gethypervisual.com/images/shopify/7d72611e-dd89-45ae-92ce-3fd80ce259a2/6304_Apple_iPhone-11-banner.jpg" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h4>
                            <mark>Das neue IPhone 11 hier im Shop</mark>
                        </h4>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 carousel-img" src="http://www.sciencepublishinggroup.com/spg/decotatorfont/img/book/booklist_banner.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h4>
                            <mark>Eine große Auswahl von Büchern</mark>
                        </h4>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 carousel-img" src="https://media3.bosch-home.com/Images/3200x/MCIM02430361_OptiMUM_MUM9AX5S00_stage_hefekranz.jpg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h4>
                            <mark>Eine große Auswahl von Küchengeräten</mark>
                        </h4>
                        </div>
                    </div>
                    </div>
                    <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className="container">
                    <div id="categories" className="row">
                    <div className="col-2 categorie-item">
                        <Link to="/products?categorie=21">
                        <i className="fa fa-mobile" aria-hidden="true" />
                        </Link>
                        <h4>Smartphones</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <a href="#">
                        <i className="fa fa-rocket" aria-hidden="true" />
                        </a>
                        <h4>Spielzeuge</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <a href="#">
                        <i className="fa fa-camera" aria-hidden="true" />
                        </a>
                        <h4>Kameras</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <a href="#">
                        <i className="fa fa-gamepad" aria-hidden="true" />
                        </a>
                        <h4>Gaming</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <a href="#">
                        <i className="fa fa-book" aria-hidden="true" />
                        </a>
                        <h4>Bücher</h4>
                    </div>
                    <div className="col-2 categorie-item">
                        <a href="#">
                        <i className="fa fa-television" aria-hidden="true" />
                        </a>
                        <h4>TV</h4>
                    </div>
                    </div>
                    <Link to="/products">
                        <button type="button" id="products-btn" className="btn btn-secondary btn-lg no-radius">Alle Produkte</button>
                    </Link>
                    <div className="row">
                    <div className="col-3">
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
                    <div className="col-3">
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
                    <div className="col-3">
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
                    <div className="col-3">
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
                    <div className="col-3">
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
                    <div className="col-3">
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
                    </div>
                </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Home;