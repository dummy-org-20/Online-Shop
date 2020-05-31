import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';


import logo from '../logo.png';

class Header extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            redirect:false,
            categories:[],
            search:"", 
        };
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    handleSearchBar= (event)=>{
        if (event.which == 13 || event.keyCode == 13) {
            this.setState({
                search: $(".form-control#myInput")[0].value,
                redirect:true,
            })
            console.log("searchbar is updating")
        }
    }

    renderRedirect(){
        if(window.location.pathname=="/products"&&this.state.redirect){
            this.state.redirect=false;
            this.props.update();
        }
        if(this.state.redirect){
            this.state.redirect=false;
            return <Redirect to={'/products?categories='+String(this.state.categories)+"&search="+String(this.state.search)} />
        }
    }

    render() {
        return (
            <div>
                {/* NAV-BAR */}
                {/* Main-Navbar */}
                <nav id="main-navbar" className="navbar navbar-expand-lg">
                <div className="container">
                    {/* Logo */}
                    <Link to="/">
                    <img src={logo} height={45} alt="Logo" />
                    </Link>
                    {/* Message, Profile-Pic, Shoppingcart-Icon */}
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <p id="welcome">Willkommen</p>
                    </li>
                    <li className="nav-item">
                        <Link to="/account">
                        <img id="profil-img" src="https://stafforgserv.com.au/wp-content/uploads/2018/09/user-img.png" width={45} height={45} />
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
                    {this.renderRedirect()}
                    <input className="form-control" id="myInput" type="text" placeholder="Suche" onKeyPress={this.handleSearchBar}/>
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
                            <a className="dropdown-item" id="1" href="#" onClick={()=>this.props.sorting("ASC")}>Preis aufsteigend</a>
                            <a className="dropdown-item" id="2" href="#" onClick={()=>this.props.sorting("DESC")}>Preis absteigen</a>
                            <a className="dropdown-item" id="3" href="#" onClick={()=>this.props.sorting("ALPHASC")}>Alphabetisch aufsteigend</a>
                            <a className="dropdown-item" id="4" href="#" onClick={()=>this.props.sorting("ALPHDESC")}>Alphabetisch absteigend</a>
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
