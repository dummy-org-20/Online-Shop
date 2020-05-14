import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import HomeCarousel from './HomeCarousel';
import HomeCategories from './HomeCategorie';
import ProductCard from './ProducCard';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Header name="Startseite" sort="d-none" />
                {/* Home */}
                <main id="home">
                <HomeCarousel />
                <div className="container">
                    <HomeCategories />
                    <Link to="/products">
                        <button type="button" id="products-btn" className="btn btn-secondary btn-lg no-radius">Alle Produkte</button>
                    </Link>
                    <div className="row">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    </div>
                </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Home;