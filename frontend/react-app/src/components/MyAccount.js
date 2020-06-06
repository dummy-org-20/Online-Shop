import React, { Component } from 'react';
import Auth from './Auth';

class MyAccount extends Component {

    constructor(props){
        super(props);
        this.state={
            username:"",
            type:"Nutzer"
        }
    }

    async componentDidMount(){
        let type=await Auth.getType();
        let username=await Auth.getUser();
        this.setState({
            type:type,
            username:username
        })
    }

    render() {
        return (
            <React.Fragment>
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="row"><b>Nutzername:</b></th>
        <td> { this.state.username }</td>
                    </tr>
                    <tr>
                        <th scope="row"><b>Konto-Typ:</b></th>
        <td> {this.state.type }</td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default MyAccount;
