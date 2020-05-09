import React, { Component } from 'react';
import Header from './Header';

class Details extends Component {
    render() {
        return (
            <React.Fragment>
                <Header name="Details"  sort="d-none" />
                {/* Details */}
                <main id="details" className="container">
                <div className="row">
                    {/* Image-Slider */}
                    <div className="col-6">
                    <div id="carousel" className="carousel slide" data-ride="carousel">
                        <div className="row">
                        {/* Image-Slider-Preview */}
                        <div id="image-slider-preview" className="col-2">
                            <div className="clearfix">
                            <div id="thumbcarousel" className="carousel slide" data-interval="false">
                                <div className="carousel-inner">
                                <div className="item">
                                    <div data-target="#carousel" data-slide-to={0} className="thumb">
                                    <img src="https://www.sony.de/image/2c01991ee6c32a1ad0f6a9f198086f96?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" />
                                    </div>
                                    <div data-target="#carousel" data-slide-to={1} className="thumb">
                                    <img src="https://media.alltricks.com/hd/11069105d528f97290107.69498196.jpg" />
                                    </div>
                                    <div data-target="#carousel" data-slide-to={2} className="thumb">
                                    <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/i1-512bfa8a-01a0-4971-bd34-9cef18a159e0/air-force-1-07-damenschuh-sg6nmr.jpg" />
                                    </div>
                                    <div data-target="#carousel" data-slide-to={3} className="thumb">
                                    <img src="https://cdn.eglobalcentral.de/images/magictoolbox_cache/8c95d73fec130487c102a73bf1ab42ce/3/1/31631/thumb360x360/3245460558/apple-iphone-11-128gb-a2223-dual-sim-black.jpg" />
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* Image-Slider-Image */}
                        <div id="image-slider-img" className="col-10">
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100 carousel-img" src="https://www.sony.de/image/2c01991ee6c32a1ad0f6a9f198086f96?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 carousel-img" src="https://media.alltricks.com/hd/11069105d528f97290107.69498196.jpg" alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 carousel-img" src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/i1-512bfa8a-01a0-4971-bd34-9cef18a159e0/air-force-1-07-damenschuh-sg6nmr.jpg" alt="Third slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 carousel-img" src="https://cdn.eglobalcentral.de/images/magictoolbox_cache/8c95d73fec130487c102a73bf1ab42ce/3/1/31631/thumb360x360/3245460558/apple-iphone-11-128gb-a2223-dual-sim-black.jpg" alt="Third slide" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Details-Info */}
                    <div id="details-info" className="col-6">
                    <h2><b>IPhone 11 Pro Max 64GB</b></h2>
                    <h1>499,99€</h1>
                    <h5>Beschreibung</h5>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                        labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                        et ea rebum.</p>
                    <button type="button" className="btn btn-outline-dark no-radius btn-lg">-</button>
                    <span className="ammount">1</span>
                    <button type="button" className="btn btn-outline-dark no-radius btn-lg">+</button>
                    <button id="add-to-cart" type="button" className="btn btn-dark no-radius btn-lg" data-toggle="modal" data-target="#myModal">IN DEN EINKAUFSWAGEN</button>
                    </div>
                </div>
                </main>
                <p>Link: {this.props.match.params.id}</p>
            </React.Fragment>
        )
    }
}

export default Details;
