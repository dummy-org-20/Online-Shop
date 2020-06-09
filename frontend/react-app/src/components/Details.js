import React, { Component } from 'react';
import Header from './Header';
import Cookies from 'js-cookie';

class Details extends Component {

    constructor() {
        super()
        this.state = {
            id: -1,
            name: "",
            price: 0,
            description: "",
            amount: 1,
            urls: []
        }
    }

    componentDidMount() {
        fetch("/item/" + this.props.match.params.id).then(response => response.json()).then(data => {
            this.setState({ 
                id: this.props.match.params.id,
                name: data.name,
                description: data.description,
                price: data.price,
                amount: 1,
                urls: this.urlsToArray(data.urls)
            });
        }).catch(function (error) {
            console.log(error.message)
        });
    }

    urlsToArray(urls, id) {
        let array = [];
        for(let i in urls) {
            array[i] = "/image/" + urls[i];
        }
        if(urls[0]==undefined){
            array[0]=="/image/0/test.jpg";
        }
        return array
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€" 
        return euro + "," + cent + "€"
    }

    increaseAmount() {
        this.setState({
            amount: this.state.amount + 1
        });
    }

    decreaseAmount() {
        if(this.state.amount == 1) return;
        this.setState({
            amount: this.state.amount - 1
        });
    }

    addToCart() {
        let sessionID = Cookies.get("sessionID")
        let item_id = this.state.id
        let count = this.state.amount

        const options = {
            method: "POST",
            headers: {
                cookie: "sessionID=" + sessionID
            }
        }

        fetch("/setWarenkorb?item_id=" + item_id + "&count=" + count, options).then(response => {
            let status = response.status
            if(status != 200) {
                console.log("no user, you idiot")
                return
            }
            console.log("nice shot")
            this.setState({
                amount: 1
            });
            this.props.history.push("/shopping-cart")
        })
        .catch(function (error) {
            console.log(error.message)
        });
    }

    render() {
        if(this.state.name == undefined) {
            return "TODO: Creating page for item not found"
        }

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
                                    {
                                        this.state.urls.map((item, index) => (
                                            <div data-target="#carousel" data-slide-to={index} className="thumb">
                                                <img src={item} />
                                            </div>
                                        ))
                                    }
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* Image-Slider-Image */}
                        <div id="image-slider-img" className="col-10">
                            <div className="carousel-inner">
                            {
                                this.state.urls.map((item, index) => {
                                    return index == 0 ?
                                        <div className="carousel-item active">
                                            <img className="d-block w-100 carousel-img" src={item} alt={index} />
                                        </div>
                                        :
                                        <div className="carousel-item">
                                            <img className="d-block w-100 carousel-img" src={item} alt={index} />
                                        </div>
                                })
                            }
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Details-Info */}
                    <div id="details-info" className="col-6">
                        <h2><b>{this.state.name}</b></h2>
                        <h1>{this.formatPrice(this.state.price)}</h1>
                        <h5>Beschreibung</h5>
                        <p>{this.state.description}</p>
                        <button type="button" className="btn btn-outline-dark no-radius btn-lg" onClick={() => this.decreaseAmount()}>-</button>
                        <span className="ammount">{this.state.amount}</span>
                        <button type="button" className="btn btn-outline-dark no-radius btn-lg" onClick={() => this.increaseAmount()}>+</button>
                        <button id="add-to-cart" type="button" className="btn btn-dark no-radius btn-lg" data-toggle="modal" data-target="#myModal" onClick={() => this.addToCart()}>IN DEN EINKAUFSWAGEN</button>
                    </div>
                </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Details;
