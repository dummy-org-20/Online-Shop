import React, { Component } from 'react';

class AddProducts extends Component {
    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-row">
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="titel" placeholder="Titel" />
                    </div>
                    <div className="form-group col-md-12">
                        <textarea className="form-control" id="description" rows={3} placeholder="Beschreibung" defaultValue={""} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="select">Kategorie</label>
                        <select className="form-control" id="select">
                        <option>Technik</option>
                        <option>Bücher</option>
                        <option>Haushalt</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="price">Preis (in €)</label>
                        <input type="text" className="form-control" id="price" placeholder="9,99" />
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile1" />
                        <label className="custom-file-label" htmlFor="customFile1">Bild 1 (Titelbild)</label>
                        </div>
                    </div>
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile2" />
                        <label className="custom-file-label" htmlFor="customFile2">Bild 2</label>
                        </div>
                    </div>
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile3" />
                        <label className="custom-file-label" htmlFor="customFile3">Bild 3</label>
                        </div>
                    </div>
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile4" />
                        <label className="custom-file-label" htmlFor="customFile4">Bild 4</label>
                        </div>
                    </div>
                    </div>
                    <button type="button" className="btn btn-outline-dark no-radius btn-lg" data-dismiss="modal">Produkt einstellen</button>
                </form>
            </React.Fragment>
        )
    }
}

export default AddProducts;