import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import $ from 'jquery';
import ProductCard from './ProducCard';

const url="http://localhost:8000";

const SortingAlgorithm={
    "ASC": function(a,b){return a["price"]-b["price"]},
    "DESC": function(a,b){return b["price"]-a["price"]},
    "ALPHASC" : function(a,b){return a["name"].localeCompare(b["name"])},
    "ALPHDESC" : function(a,b){return b["name"].localeCompare(a["name"])},
}

class Products extends Component {

    constructor(){
        super()
        this.state={categories:[],
        checkedCategories:[],
        search:"",
        sort:"ALPHASC",
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
        console.log("im called");
        $(window).unbind("change");
        $(window).on('change',()=>{
            this.setState({
                items:[],
                search: $(".form-control#myInput")[0].value,
            })
            this.searchAndDisplay();
        });
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
                                console.log(this.state.checkedCategories)
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
            })
            $(".form-control#myInput")[0].value=this.state.search;
            this.checkBoxes();
            this.searchAndDisplay();
        }).catch(function (error) {
            console.log(error)
        });
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    sorting=(sort)=>{
        if(this.state.sort==sort)return;
        this.setState({
            sort:sort,
            items:[]
        })
        this.searchAndDisplay();
    }    

    searchAndDisplay(){
        console.log(this.state.search);
        fetch("/search?category="+String(this.state.checkedCategories)+"&item="+String(this.state.search),{method:"GET"}).then(response => response.json()).then((data)=>{
            let sortedData=data.sort(SortingAlgorithm[this.state.sort]);
            sortedData.forEach(element => {
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

export default Products;
