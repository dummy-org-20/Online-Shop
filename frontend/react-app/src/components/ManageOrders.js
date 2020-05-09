import React, { Component } from 'react';

class ManageOrders extends Component {
    render() {
        return (
            <React.Fragment>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Artikel</th>
                        <th scope="col">Nutzername</th>
                        <th scope="col">Adresse</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>187</td>
                        <td>
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap (4 Stk.)</span>
                        <br />
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap (4 Stk.)</span>
                        <br />
                        </td>
                        <td>@peter_x</td>
                        <td>Max Muster <br />Coblitzallee 1-9, <br />68163 Mannheim</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>offen</option>
                            <option>gesendet</option>
                            </select>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>243</td>
                        <td>
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap (4 Stk.)</span>
                        <br />
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap (4 Stk.)</span>
                        <br />
                        </td>
                        <td>@Karl_Str</td>
                        <td>Max Muster <br />Coblitzallee 1-9, <br />68163 Mannheim</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>offen</option>
                            <option>gesendet</option>
                            </select>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>423</td>
                        <td>
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap (4 Stk.)</span>
                        <br />
                        <img src="https://www.snipes.com/dw/image/v2/BDCB_PRD/on/demandware.static/-/Sites-snse-master-eu/default/dwfe7026cd/1688198_P.jpg?sw=1560&sh=1560&sm=fit&sfrm=png" width={45} height={45} />
                        <span>CHAMPION - Legacy Baseball Cap (4 Stk.)</span>
                        <br />
                        </td>
                        <td>@sarah</td>
                        <td>Max Muster <br />Coblitzallee 1-9, <br />68163 Mannheim</td>
                        <td>
                        <div className="form-group">
                            <select id="inputState" className="form-control">
                            <option selected>offen</option>
                            <option>gesendet</option>
                            </select>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default ManageOrders;
