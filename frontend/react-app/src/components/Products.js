import React, { Component } from 'react';
import Header from './Header';
import $ from 'jquery';
import ProductCard from './ProducCard';
import { withRouter } from "react-router-dom";

const url="http://localhost:8000";
let oldCat=[];
let oldSearch="";

const SortingAlgorithm={
    "ASC": function(a,b){return parseFloat(a.props["price"].substring(0,a.props["price"].length-1).replace(",",".")-b.props["price"].substring(0,b.props["price"].length-1).replace(",","."))},
    "DESC": function(a,b){return parseFloat(b.props["price"].substring(0,b.props["price"].length-1).replace(",",".")-a.props["price"].substring(0,a.props["price"].length-1).replace(",","."))},
    "ALPHASC" : function(a,b){return a.props["name"].localeCompare(b.props["name"])},
    "ALPHDESC" : function(a,b){return b.props["name"].localeCompare(a.props["name"])},
}

class Products extends Component {

    constructor(){
        super()
        this.state={categories:[],
        checkedCategories:[],
        search:"",
        sort:"",
        items:[]}
    }

    checkBoxes(){
        for(let i=0;i<this.state.checkedCategories.length;i++){
            let number=parseInt(this.state.checkedCategories[i]);
            if(Number.isInteger(number)&&number>=1&&number<=this.state.categories.length&&this.state.checkedCategories[i].match(/^[0-9]+$/) != null){
                $(".form-check-input#CheckBox"+String(number)).prop("checked",true);
            }else{
                this.state.checkedCategories.splice(i,1)
            }
        }
    }

    update = ()=>{
        if(arraysEqual(oldCat,this.state.checkedCategories)&&oldSearch==$(".form-control#myInput")[0].value)return;
        this.setState({
            items:[],
            search: $(".form-control#myInput")[0].value,
        },()=>{
            oldCat=this.state.checkedCategories.concat();
            oldSearch=this.state.search;
            this.searchAndDisplay(()=>{this.sorting(this.state.sort)});
            this.props.history.push("/products?categories="+String(this.state.checkedCategories)+"search="+String(this.state.search));
        })
    }

    componentDidMount() {
        fetch("/categories").then(response => response.json()).then(data => {
			for(let i=0;i<data.length;i++){
				this.setState({
					categories: this.state.categories.concat(
                    <div key={String(data[i]["id"])} className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue id={"CheckBox"+String(data[i]["id"])} onChange={
                            (event)=>{
                                let checkbox=event.target;
                                if(!checkbox.checked) {
                                    let index=this.state.checkedCategories.indexOf(checkbox.id.substring(checkbox.id.length-1))
                                    if(index!=-1) this.state.checkedCategories.splice(index,1)
                                }else{
                                    let index=this.state.checkedCategories.indexOf(checkbox.id.substring(checkbox.id.length-1))
                                    if(index==-1) this.setState({
                                        checkedCategories:this.state.checkedCategories.concat([checkbox.id.substring(checkbox.id.length-1)])
                                    })
                                }
                            }
                        } />
                    <label className="form-check-label" htmlFor="defaultCheck1">{data[i]["name"]}</label>
                    </div>
                    )
				})
            }
            let searchParams = new URLSearchParams(window.location.search);
            this.setState({
                checkedCategories: searchParams.get("categories").split(","),
                search:searchParams.get("search")
            },()=>{
                oldSearch=this.state.search;
                oldCat=this.state.checkedCategories;
                $(".form-control#myInput")[0].value=this.state.search;
                this.checkBoxes();
                this.searchAndDisplay(()=>{this.sorting("ALPHASC")});
            })
        }).catch(function (error) {
            console.log(error)
        });
    }

    getCategories=()=>{
        return this.state.checkedCategories
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    sorting=(sort)=>{
        this.setState({
            sort:sort,
            items:this.state.items.sort(SortingAlgorithm[sort])
        })
        //this.searchAndDisplay();
    }    

    searchAndDisplay(callback){
        fetch("/search?category="+String(this.state.checkedCategories)+"&item="+String(this.state.search),{method:"GET"}).then(response => response.json()).then((data)=>{
            data.forEach(element => {
                element["price"]=this.formatPrice(parseInt(element["price"]));
                if(element["urls"]["0"]==undefined){
                    this.setState({
                        items:this.state.items.concat(<ProductCard url={url+"/image/Test/test.jpg"} alt={element["name"]} id={element["id"]} name={element["name"]} price={element["price"]}/>)
                    });
                }else{
                    this.setState({
                        items:this.state.items.concat(<ProductCard url={url+"/image/"+element["urls"]["0"]} alt={element["name"]} id={element["id"]} name={element["name"]} price={element["price"]}/>)
                    });
                }
            });
            if(callback!=undefined)callback();
        });
    }

    render() {
        return (
            <React.Fragment>
                <Header name="Produkte" update={this.update} sorting={this.sorting}/>
                {/* Products */}
                <main id="products" className="container">
                <div className="row">
                    <div className="col-3">
                    <ul className="list-group list-group-flush">
                        <li key="1" className="list-group-item">
                        <h3 className="font-weight-bold">Filter</h3>
                        </li>
                        <li keys="2" className="list-group-item">
                        <h5>Kategorie</h5>
                        {this.state.categories}
                        </li>
                        <li key="3" className="list-group-item" id="price-limit">
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
                        {this.state.items}
                    </div>
                    </div>
                </div>
                </main>
            </React.Fragment>
        )
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  export default withRouter(Products);
