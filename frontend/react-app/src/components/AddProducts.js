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
                <form action="/item.insert" method="post" id="iteminsert" encType="multipart/form-data">
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
                        <input type="file" className="custom-file-input" name="image1" accept="image/png, image/jpeg" id="customFile1"/>
                        <label className="custom-file-label" htmlFor="customFile1" id="customFileLabel1">Bild 1 (Titelbild)</label>
                        </div>
                    </div>
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" name="image2" accept="image/png, image/jpeg" id="customFile2"/>
                        <label className="custom-file-label" htmlFor="customFile2" id="customFileLabel2">Bild 2</label>
                        </div>
                    </div>
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" name="image3" accept="image/png, image/jpeg" id="customFile3"/>
                        <label className="custom-file-label" htmlFor="customFile3" id="customFileLabel3" >Bild 3</label>
                        </div>
                    </div>
                    <div className="form-group col-md-7">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" name="image4" accept="image/png, image/jpeg" id="customFile4"/>
                        <label className="custom-file-label" htmlFor="customFile4" id="customFileLabel4" >Bild 4</label>
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
		$(".custom-file-input#customFile1").unbind("change");
		$(".custom-file-input#customFile2").unbind("change");
		$(".custom-file-input#customFile3").unbind("change");
		$(".custom-file-input#customFile4").unbind("change");
		$("#iteminsert").submit(function(e) {
			$("btn.btn-outline-dark.no-radius.btn-lg").disable = true;
			e.preventDefault(); // avoid to execute the actual submit of the form.
			if(($(".form-control#price")[0].value).match(/^[0-9]+,?[0-9]{2}$/)==null){
				alert("Bitte geben sie beim Preis einen richtigen Wert ein");
				return;
			}
			if($(".form-control#titel")[0].value.length>42){
				alert("Der Name ist zu Lang, bitte wählen sie einen Namen der weniger als 42 Zeichen hat");
				return;
			}
			if($(".form-control#titel")[0].value.length<3){
				alert("Der Name ist zu Kurz, bitte wählen sie einen Namen der mehr als 3 Zeichen hat");
				return;
			}
			if($(".form-control#description")[0].value.length>=800){
				alert("Die Beschreibung ist zu Lang, bitte wählen sie eine Beschreibung die weniger als 800 Zeichen hat");
				return;
			}
			if($(".form-control#description")[0].value.length<10){
				alert("Die Beschreibung ist zu kurz, bitte wählen sie eine Beschreibung die mehr als 10 Zeichen hat");
				return;
			}
			let oldPreis=$(".form-control#price")[0].value;
			let preis= parseFloat(($(".form-control#price")[0].value.replace(",",".")));
			if($(".custom-file-input#customFile1")[0].files!=undefined&&$(".custom-file-input#customFile1")[0].files[0]!=undefined){
				if($(".custom-file-input#customFile1")[0].files[0].name.length>64){
					alert("Der Bildname 1 ist zu lang");
					return;
				}
				else if($(".custom-file-input#customFile1")[0].files[0].name.match(/^[a-zA-Z0-9]+\.\w+$/)==null){
					alert("Im Bildnamen sind nur Buchstaben und Zahlen erlaubt, bitte ändern sie ihr Bildnamen bei Bild Nummer 1");
					return
				}
			}
			if($(".custom-file-input#customFile2")[0].files!=undefined&&$(".custom-file-input#customFile2")[0].files[0]!=undefined){
				if($(".custom-file-input#customFile2")[0].files[0].name.length>64){
					alert("Der Bildname 2 ist zu lang");
					return;
				}
				else if($(".custom-file-input#customFile2")[0].files[0].name.match(/^[a-zA-Z0-9]+\.\w+$/)==null){
					alert("Im Bildnamen sind nur Buchstaben und Zahlen erlaubt, bitte ändern sie ihr Bildnamen bei Bild Nummer 2");
					return
				}
			}if($(".custom-file-input#customFile3")[0].files!=undefined&&$(".custom-file-input#customFile3")[0].files[0]!=undefined){
				if($(".custom-file-input#customFile3")[0].files[0].name.length>64){
					alert("Der Bildname 3 ist zu lang");
					return;
				}
				else if($(".custom-file-input#customFile3")[0].files[0].name.match(/^[a-zA-Z0-9]+\.\w+$/)==null){
					alert("Im Bildnamen sind nur Buchstaben und Zahlen erlaubt, bitte ändern sie ihr Bildnamen bei Bild Nummer 3");
					return
				}
			}if($(".custom-file-input#customFile4")[0].files!=undefined&&$(".custom-file-input#customFile4")[0].files[0]!=undefined){
				if($(".custom-file-input#customFile4")[0].files[0].name.length>64){
					alert("Der Bildname 4 ist zu lang");
					return;
				}
				else if($(".custom-file-input#customFile4")[0].files[0].name.match(/^[a-zA-Z0-9]+\.\w+$/)==null){
					alert("Im Bildnamen sind nur Buchstaben und Zahlen erlaubt, bitte ändern sie ihr Bildnamen bei Bild Nummer 4");
					return
				}
			}
			var form = $(this);
			var url = form.attr('action');
			var request=form.serialize();
			request=request.substr(0,request.search("price")+6)+Math.floor(preis*100);
			$.ajax({
				   type: "POST",
				   url:url+"?"+request,
				   success: async function(data){
					let item_id=data.id;
					let file1=undefined;
					let file2=undefined;
					let file3=undefined;
					let file4=undefined;
					if($(".custom-file-input#customFile1")[0].files[0]!=undefined) file1= await toBase64($(".custom-file-input#customFile1")[0].files[0]);
					if($(".custom-file-input#customFile2")[0].files[0]!=undefined) file2= await toBase64($(".custom-file-input#customFile2")[0].files[0]);
					if($(".custom-file-input#customFile3")[0].files[0]!=undefined) file3= await toBase64($(".custom-file-input#customFile3")[0].files[0]);
					if($(".custom-file-input#customFile4")[0].files[0]!=undefined) file4= await toBase64($(".custom-file-input#customFile4")[0].files[0]);
					if(file1!=undefined)await sendImage(file1,item_id,1,$(".custom-file-input#customFile1")[0].files[0].name);
					if(file2!=undefined)await sendImage(file2,item_id,2,$(".custom-file-input#customFile2")[0].files[0].name);
					if(file3!=undefined)await sendImage(file3,item_id,3,$(".custom-file-input#customFile3")[0].files[0].name);
					if(file4!=undefined)await sendImage(file4,item_id,4,$(".custom-file-input#customFile4")[0].files[0].name);
					alert("Das Item wurde erfolgreich hinzugefügt");
					window.location.reload();
				   },
				   error: function(data){
						$("btn.btn-outline-dark.no-radius.btn-lg").disable = false;
					   if(data.status==429){
						   alert("Zu viele Anfragen gesendet, bitte warten sie 20 Minuten");
					   }else {
						   alert("Es gab einen Error bei der Anfrage, überprüfen sie ihre Eingabe.");
					   }
				   }
			});
			$(".form-control#price")[0].value = oldPreis;
			
			});
		$(".custom-file-input#customFile1").on('change',function(){
			setTimeout(()=>{
				$(".custom-file-label#customFileLabel1")[0].innerHTML=$(".custom-file-input#customFile1")[0].files[0].name;
			},1500);
		});
		$(".custom-file-input#customFile2").on('change',function(){
			setTimeout(()=>{
				$(".custom-file-label#customFileLabel2")[0].innerHTML=$(".custom-file-input#customFile2")[0].files[0].name;
			},1500);
		});
		$(".custom-file-input#customFile3").on('change',function(){
			setTimeout(()=>{
				$(".custom-file-label#customFileLabel3")[0].innerHTML=$(".custom-file-input#customFile3")[0].files[0].name;
			},1500);
		});
		$(".custom-file-input#customFile4").on('change',function(){
			setTimeout(()=>{
				$(".custom-file-label#customFileLabel4")[0].innerHTML=$(".custom-file-input#customFile4")[0].files[0].name;
			},1500);
		});
		}
		
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => {console.log(error);reject(error);};
});

const sendImage = (base64,item_id,order_id,image_name) => new Promise((resolve, reject) => {
	let json={"image":base64.substring(base64.search(",")+1)};
	json = JSON.stringify(json);
    $.ajax({
	  type: "POST",
	  url: encodeURI("/uploadImage?item_id="+item_id+"&order_id="+order_id+"&image_name="+image_name),
	  data: json,
	  contentType: 'application/json',
	  processData: false,
	  success: function(data){resolve(true)},
	  error: function(data) {
		  alert("Das Bild "+order_id+" konnte nicht hochgeladen werden");
		  reject(data);
		}
	});
});

export default AddProducts;