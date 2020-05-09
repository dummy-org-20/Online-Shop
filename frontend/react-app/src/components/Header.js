import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                {/* NAV-BAR */}
                {/* Main-Navbar */}
                <nav id="main-navbar" className="navbar navbar-expand-lg">
                <div className="container">
                    {/* Logo */}
                    <Link to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/500px-Amazon_logo.svg.png" width={150} height={45} alt="Shop" />
                    </Link>
                    {/* Message, Profile-Pic, Shoppingcart-Icon */}
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <p id="welcome">Wilkommen, Paul</p>
                    </li>
                    <li className="nav-item">
                        <Link to="/account">
                        <img id="profil-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdOvjx-Ooi0vYqAiqSAZFXeDlbRJnskm2blrI-QBmf91TedpD-&usqp=CAU" width={45} height={45} />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shopping-cart">
                        <i className="fa fa-shopping-bag" />
                        </Link>
                    </li>
                    </ul>
                </div>
                </nav>
                {/* Second-Navbar */}
                <nav id="second-navbar" className="navbar navbar-expand-lg">
                <div className="container">
                    {/* Heading */}
                    <div className="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2">
                    <h5>{this.props.name}</h5>
                    </div>
                    {/* Search-Bar */}
                    <div id="search-bar" className="mx-auto order-0">
                    <input className="form-control" id="myInput" type="text" placeholder="Suche" />
                    </div>
                    {/* Sort */}
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className={"nav-item " + this.props.sort}>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle no-radius btn-outline-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sortieren
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Preis absteigend</a>
                            <a className="dropdown-item" href="#">Preis aufsteigend</a>
                            <a className="dropdown-item" href="#">Alphabetisch</a>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </div>
        )
    }
}

export default Header;
