import React, { Component } from 'react';

class ManageUsers extends Component {

    constructor(props) {
        super(props)
        this.state ={
            users:[]
        }
    }

    componentDidMount(){
        fetch("/userAll").then(response=>response.json()).then(data=>{
            var users=[]
            for(let i=0;i<data.length;i++){
                users.push(<React.Fragment>
                    <tr>
                        <td>{data[i].id}</td>
                        <td>{data[i].username}</td>
                <td>{data[i].admin==1?"Admin":"Nutzer"}</td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius" onClick={()=>{if(window.confirm("Möchtest du wirklich diesen Nutzer löschen"))this.deleteUser(data[i].id)}}>
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                </React.Fragment>)
                if(users.length==data.length){
                    this.setState({
                        users:users
                    })
                }
            }
        });
    }

    deleteUser(id){
        fetch("/deleteUser?user="+parseInt(id),{method:"POST"}).then(()=>window.location.reload(false));
    }

    render() {
        return (
            <React.Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nutzername</th>
                        <th scope="col">Konto-Typ</th>
                        <th scope="col">Optionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default ManageUsers;