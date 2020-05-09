import React, { Component } from 'react';

class ManageProducts extends Component {
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
                        <th scope="col">Rabatt</th>
                        <th scope="col">Optionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>187</td>
                        <td>
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap</span>
                        </td>
                        <td>15,99€</td>
                        <td>Bekleidung</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>0%</option>
                            <option>10%</option>
                            <option>20%</option>
                            <option>30%</option>
                            <option>40%</option>
                            <option>50%</option>
                            </select>
                        </div>
                        </td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                    <tr><td>197</td>
                        <td>
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap</span>
                        </td>
                        <td>15,99€</td>
                        <td>Bekleidung</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>0%</option>
                            <option>10%</option>
                            <option>20%</option>
                            <option>30%</option>
                            <option>40%</option>
                            <option>50%</option>
                            </select>
                        </div>
                        </td>
                        <td>
                        <button type="button" className="btn btn-danger no-radius">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default ManageProducts;
