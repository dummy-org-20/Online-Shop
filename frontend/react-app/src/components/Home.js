import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import HomeCarousel from './HomeCarousel';
import HomeCategories from './HomeCategorie';
import ProductCard2 from './ProductCard2';

class Home extends Component {

    constructor(){
        super()
        this.state={
            items:[]
        }
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    componentDidMount(){
            fetch("/homepage",{method:"GET"}).then(response=>response.json()).then((elements)=>{
                var item = []
                for(let i = 0; i < 8; i++){
                    var element = elements[i];
                    if(element["urls"]["0"]==undefined){
                        item=item.concat([<ProductCard2 url={"/image/0/test.jpg"} alt={element["name"]} id={element["id"]} name={element["name"]} price={this.formatPrice(element["price"])}/>])
                    }else{
                        item=item.concat([<ProductCard2 url={"/image/"+element["urls"]["0"]} alt={element["name"]} id={element["id"]} name={element["name"]} price={this.formatPrice(element["price"])}/>])
                    }
                    if(item.length==8){
                        this.setState({
                            items:item.sort(function(a,b){return a.props["id"]-b.props["id"]})
                        })
                    }
                }
            });
    }

    render() {
        return (
            <React.Fragment>
                <Header name="Startseite" sort="d-none" />
                {/* Home */}
                <main id="home">
                <HomeCarousel />
                <div className="container">
                    <HomeCategories />
                    <Link to="/products?categories=&search=">
                        <button type="button" id="products-btn" className="btn btn-secondary btn-lg no-radius">Alle Produkte</button>
                    </Link>
                    <div className="row">
                    {this.state.items}
                    </div>
                </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Home;