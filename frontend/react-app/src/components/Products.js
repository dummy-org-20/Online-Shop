import React, { Component } from 'react';
import Header from './Header';
import $ from 'jquery';
import ProductCard from './ProducCard';
import { withRouter } from "react-router-dom";


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
        this.oldCat=[];
        this.oldSearch="";
        this.minPrice=undefined;
        this.maxPrice=undefined;
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

    changePriceRange=()=>{
        let min=$(".form-control#min")[0].value.replace(",",".");
        let max=$(".form-control#max")[0].value.replace(",",".");
        if(min.length==0)min=undefined
        else if(min.match(/^[0-9]*[\.,]?[0-9]+$/)==null) return
        else min=parseFloat(min)
        if(max.length==0)max=undefined
        else if(max.match(/^[0-9]*[\.,]?[0-9]+$/)==null) return
        else max=parseFloat(max)
        if(min!=undefined&&max!=undefined&&min>max)return;
        if(min<0||max<0) return
        var needUpdate=false;
        if(((min!=undefined&&min<this.state.minPrice)||(max!=undefined&&max>this.state.maxPrice)))needUpdate=true;
        else if((min==undefined&&this.state.minPrice!=undefined)||(max==undefined&&this.state.maxPrice!=undefined))needUpdate=true;
        this.setState({
            minPrice:min,
            maxPrice:max
        },()=>{
            if(needUpdate){
                this.setState({
                    items:[]
                },()=>{
                    this.searchAndDisplay(()=>{this.sorting(this.state.sort)});
                })
            }else{
                var newItems=[];
                for(let i=0;i<this.state.items.length;i++){
                    if(parseFloat(this.state.items[i].props["price"].substring(0,this.state.items[i].props["price"].length-1).replace(",","."))>=min&&parseFloat(this.state.items[i].props["price"].substring(0,this.state.items[i].props["price"].length-1).replace(",","."))<=max)newItems.push(this.state.items[i]);
                }
                this.setState({
                    items:newItems
                })
            }
        })
    }

    update = ()=>{
        if(arraysEqual(this.oldCat,this.state.checkedCategories)&&this.oldSearch==$(".form-control#myInput")[0].value)return;
        this.setState({
            items:[],
            search: $(".form-control#myInput")[0].value,
        },()=>{
            this.oldCat=this.state.checkedCategories.concat();
            this.oldSearch=this.state.search;
            this.searchAndDisplay(()=>{this.sorting(this.state.sort)});
            this.props.history.push("/products?categories="+String(this.state.checkedCategories)+"&search="+String(this.state.search));
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
                this.oldSearch=this.state.search;
                this.oldCat=this.state.checkedCategories;
                $(".form-control#myInput")[0].value=this.state.search;
                this.checkBoxes();
                this.searchAndDisplay(()=>{this.sorting("ALPHASC")});
            })
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
        this.setState({
            sort:sort,
            items:this.state.items.sort(SortingAlgorithm[sort])
        })
    }    

    searchAndDisplay(callback){
        fetch("/search?category="+String(this.state.checkedCategories)+"&item="+String(this.state.search),{method:"GET"}).then(response => response.json()).then((data)=>{
            var item=[];
            for(let i=0;i<data.length;i++){
                if(this.state.minPrice!=undefined){
                    if(this.state.minPrice>(data[i]["price"]/100))continue
                }
                if(this.state.maxPrice!=undefined){
                    if(this.state.maxPrice<(data[i]["price"]/100))continue
                }
                data[i]["price"]=this.formatPrice(parseInt(data[i]["price"]));
                if(data[i]["urls"]["0"]==undefined){
                        item=item.concat(<ProductCard url={"/image/Test/test.jpg"} alt={data[i]["name"]} id={data[i]["id"]} name={data[i]["name"]} price={data[i]["price"]}/>)
                }else{
                    item=item.concat(<ProductCard url={"/image/"+data[i]["urls"]["0"]} alt={data[i]["name"]} id={data[i]["id"]} name={data[i]["name"]} price={data[i]["price"]}/>)
                }
            }
            this.setState({
                items:item
            },()=>{
                if(callback!=undefined)callback();
            })
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
                            <input type="text" className="form-control" id="min" placeholder="Von" />
                            </div>
                            <span> - </span>
                            <div className="form-group col-md-4">
                            <input type="text" className="form-control" id="max" placeholder="Bis" />
                            </div>
                            <span> €</span>
                            <div className="form-group col-md-3">
                            <button type="button" className="btn btn-outline-dark no-radius" data-dismiss="modal" onClick={this.changePriceRange}>Los</button>
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
