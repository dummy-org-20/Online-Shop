import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import HomeCarousel from './HomeCarousel';
import HomeCategories from './HomeCategorie';
import ProductCard from './ProducCard';

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
        for(let i=1;i<9;i++){
            var item=[]
            fetch("/item/"+i,{method:"GET"}).then(response=>response.json()).then((element)=>{
                element["price"]=this.formatPrice(parseInt(element["price"]));
                if(element["urls"]["0"]==undefined){
                item=item.concat([<ProductCard url={"/image/Test/test.jpg"} alt={element["name"]} id={element["id"]} name={element["name"]} price={element["price"]}/>])
                }else{
                item=item.concat([<ProductCard url={"/image/"+element["urls"]["0"]} alt={element["name"]} id={element["id"]} name={element["name"]} price={element["price"]}/>])
                }
                if(item.length==8){
                    this.setState({
                        items:item.sort(function(a,b){return a.props["id"]-b.props["id"]})
                    })
                }
            });
        }
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