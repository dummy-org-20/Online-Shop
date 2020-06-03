import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeCarousel extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                    <li data-target="#carousel" data-slide-to={0} className="active" />
                    <li data-target="#carousel" data-slide-to={1} />
                    <li data-target="#carousel" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Link to="/details/36">
                        <img className="d-block w-100 carousel-img" src="https://media.csmobiles.com/modules/ps_imageslider/images/3d2cb66e21a025db4249169cb88c95ca267f9ee6_CSmobiles_banner_iphone11.png" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h4>
                            <mark>Das neue IPhone 11 hier im Shop</mark>
                        </h4>
                        </div>
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link to="/products?categories=1&search=">
                        <img className="d-block w-100 carousel-img" src="http://www.sciencepublishinggroup.com/spg/decotatorfont/img/book/booklist_banner.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h4>
                            <mark>Eine große Auswahl von Büchern</mark>
                        </h4>
                        </div>
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link to="/products?categories=6&search=">
                        <img className="d-block w-100 carousel-img" src="https://media3.bosch-home.com/Images/3200x/MCIM02430361_OptiMUM_MUM9AX5S00_stage_hefekranz.jpg" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                        <h4>
                            <mark>Eine große Auswahl von Küchengeräten</mark>
                        </h4>
                        </div>
                        </Link>
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
            </React.Fragment>
        )
    }
}

export default HomeCarousel;
