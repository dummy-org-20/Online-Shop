import React, { Component } from 'react';

class MyOrders extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            orders:[]
        };
    }

    formatPrice(price) {
        let euro = Number.parseInt(price / 100)
        let cent = price % 100
        if(cent == 0) return euro + "€"
        if(cent < 10) return euro + ",0" + cent + "€"
        return euro + "," + cent + "€"
    }

    componentDidMount(){
        fetch("/boughtItems").then(data=>data.json()).then(response=>{
            var orders=[]
            for(let i=0;i<response.length;i++){
                var items=[];
                var sum=0;
                for(let j=0;j<response[i].length-1;j++){
                    items.push(<React.Fragment>
                        <img src={response[i][j].urls.length!=0? "/image/"+response[i][j].urls[0]:"image/test/test.jpg"} width={45} height={45} />
                        <span>{" "+response[i][j].name+" ("+response[i][j].amount+" Stk.)"}</span>
                        <br /></React.Fragment>)
                    sum+=response[i][j].price*response[i][j].amount
                }
                var addr=response[i][response[i].length-1].address.split(";")
                orders.push(<tr>
                    <td>{response[i][response[i].length-1].order_id}</td>
                    <td>
                    {items}
                    </td>
                    <td>{this.formatPrice(sum)}</td>
                    <td>{addr[0]+" "+addr[1]}<br/>{addr[2]+" "+addr[3]+"."}<br/>{addr[4]+" "+addr[5]}</td>
                    <td>offen</td>
                </tr>)
            }
            this.setState({
                orders:orders
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Artikel</th>
                        <th scope="col">Preis</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orders}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default MyOrders;