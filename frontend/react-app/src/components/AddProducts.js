import React, { Component } from 'react';
import $ from 'jquery';

class AddProducts extends Component {
	
	constructor(){
		super();
		this.state={options:[]}
	}
	
	componentDidMount() {
        fetch("/categories").then(response => response.json()).then(data => {
			for(let i=0;i<data.length;i++){
				this.setState({
					options:this.state.options.concat(<option key={i} value={data[i].id}>{data[i]["name"]}</option>)
				})
			}
        }).catch(function (error) {
            console.log(error)
        });
    }
	
    render() {
        return (
            <React.Fragment>
                <form action="/item.insert" method="post" id="iteminsert">
                    <div className="form-row">
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="titel" name="name" placeholder="Titel" />
                    </div>
                    <div className="form-group col-md-12">
                        <textarea className="form-control" id="description" name= "description"rows={3} placeholder="Beschreibung" defaultValue={""} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="select">Kategorie</label>
                        <select className="form-control" form="iteminsert" id="select" name="category_id">
							{this.state.options}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="price">Preis (in €)</label>
                        <input type="text" className="form-control" id="price" name="price" placeholder="9,99" />
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
                    <button type="submit" className="btn btn-outline-dark no-radius btn-lg" data-dismiss="modal">Produkt einstellen</button>
					{this.submitForm()}
                </form>
            </React.Fragment>
        )
    }
	
	submitForm(){
		$("#iteminsert").unbind("submit");
		$("#iteminsert").submit(function(e) {
			e.preventDefault(); // avoid to execute the actual submit of the form.
			if(($(".form-control#price")[0].value).match(/^[0-9]+,?[0-9]{2}$/)==null){
				alert("Bitte geben sie beim Preis einen richtigen Wert ein");
				return;
			}
			let oldPreis=$(".form-control#price")[0].value;
			let preis= parseFloat(($(".form-control#price")[0].value.replace(",",".")));
			$(".form-control#price")[0].value = parseInt(preis*100);
			var form = $(this);
			var url = form.attr('action');

			$.ajax({
				   type: "POST",
				   url: url+"?"+form.serialize(),
				   success: function(data){
					 alert("Die Items würden Erfolgreich hinzugefügt");
				   },
				   error: function(data){
					   if(data.status==429){
						   alert("Zu viele Anfragen gesendet, bitte warten sie 20 Minuten");
					   }else {
						   alert("Es gab einen Error bei der Anfrage, überprüfen sie ihre Eingabe.");
					   }
				   }
			});
			$(".form-control#price")[0].value = oldPreis;
			});
		}
		
}

function sendImage(){
	
}

export default AddProducts;