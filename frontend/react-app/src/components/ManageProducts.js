import React, { Component } from 'react';

class ManageProducts extends Component {

    constructor() {
        super();
            this.state = {items: []
        }
    }

    deleteItem(id){
        fetch("/item.delete?id="+parseInt(id),{method:"POST"}).then(data=> {
            console.log(data)
            window.location.reload(false);
        });
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    componentDidMount(){
        fetch("/userItems").then(response=>response.json()).then(data=>{
            fetch("/categories").then(response=>response.json()).then(data2=>{
            var items=[]
            for(let i=0;i<data.length;i++){
                    var cat;
                    for(let j = 0;j<data2.length;j++){
                        if(data2[j].id==data[i].category_id){
                            cat = data2[j].name;
                        }
                    }
                    items.push(<React.Fragment>
                    <tr>
                        <td>{data[i].id}</td>
                        <td>
                        <img src={data.urls.length!=0?"/image/"+data[i].urls[0]:"/image/0/test.jpg"} width={45} height={45} />
                        <span>{" "+data[i].name}</span>
                        </td>
                        <td>{this.formatPrice(data[i].price)}</td>
                    <td>{cat}</td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius" onClick={()=>{if(window.confirm("Möchtest du wirklich dieses Item löschen?"))this.deleteItem(data[i].id)}}>
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                    </React.Fragment>)
                    if(items.length==data.length){
                        this.setState({
                            items:items
                        })
                    }
                }
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Produkt</th>
                        <th scope="col">Preis</th>
                        <th scope="col">Kategorie</th>
                        <th scope="col">Optionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default ManageProducts;
