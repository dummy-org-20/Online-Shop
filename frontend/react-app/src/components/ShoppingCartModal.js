import React, { Component } from 'react';

class ShoppingCartModal extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content no-radius">
                    <div className="modal-header">
                        <h4 className="modal-title">BESTELLUNG</h4>
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    <div className="modal-body">
                        <h3>Summe: 39,48€</h3>
                        <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Vorname</label>
                            <input type="text" className="form-control" id="inputVorname" placeholder="Vorname" />
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Nachname</label>
                            <input type="text" className="form-control" id="inputNachname" placeholder="Nachname" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-10">
                            <label htmlFor="inputEmail4">Straße</label>
                            <input type="text" className="form-control" id="inputStraße" placeholder="Straße" />
                            </div>
                            <div className="form-group col-md-2">
                            <label htmlFor="inputPassword4">Nr.</label>
                            <input type="text" className="form-control" id="inputNr" placeholder="Nr." />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                            <label htmlFor="inputEmail4">PLZ</label>
                            <input type="text" className="form-control" id="inputPlz" placeholder="PLZ" />
                            </div>
                            <div className="form-group col-md-7">
                            <label htmlFor="inputPassword4">Ort</label>
                            <input type="text" className="form-control" id="inputOrt" placeholder="Ort" />
                            </div>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-dark no-radius btn-lg" data-dismiss="modal">Bestellen</button>
                    </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ShoppingCartModal;
