var fs = require('fs');

class ShopItem {

    constructor(id, creator_id, category_id, price, name, description, isAvailable,prc_Angebot) {
        this.id = id;
        this.creator_id = creator_id;
        this.category_id = category_id;
        this.price = price;
        this.name = name;
        this.description = description;
        this.isAvailable = isAvailable;
		this.prc_Angebot=prc_Angebot;
    }

    getImagesURL(item_id,db,callback){
        getImagesURL(item_id,db,callback);
    }
    
    getItem(id, db, callback) {
        db.safeSearch("SELECT * FROM shop_items WHERE id=?", [id], function(rows) {
            let item = Object.assign(new ShopItem(), rows[0]);
            getImagesURL(id,db, images => {
                item.urls=images;
                callback(item);
            });
        });
    }
    
    insertItem(item, db, callback) {
        db.safeSearch("INSERT INTO shop_items (`creator_id`, `category_id`, `price`, `name`, `description`,`isAvailable`,`prc_Angebot`) VALUES (?, ?, ?, ?, ?,?)",
                    [item.creator_id, item.category_id, item.price, item.name, item.description, item.isAvailable,item.prc_Angebot],
                    function(result) {
            callback(result.affectedRows > 0 ? result.insertId : -1);
        });
    }
	
	changeItem(item,db,callback){
		db.safeSearch("UPDATE shop_items SET category_id=?, price=?, name=?, description=?,isAvailable=?, prc_Angebot=?",
		[item.category_id, item.price, item.name, item.description, item.isAvailable,item.prc_Angebot],
		(res)=>{
			callback(res);
		});
	}
    
    deleteItem(id, db, callback) {
        db.safeSearch("UPDATE shop_items SET isAvailable=0 WHERE id=?", [id], function(result) {
            callback(result.affectedRows > 0)
        });
    }
	
	deleteImage(image_name,db,callback){
		db.safeSearch("DELETE FROM shop_item_images WHERE url=? AND item_id=?",[this.id+"/"+image_name,this.id],(res)=>{
			let index="";
			for(let i =0;i<Object.keys(this.urls).length;i++){
				if(this.urls[String(i)]==this.id+"/"+image_name)index=String(i);
			}
			if(index==""){
				callback(false);
				return;
			}
			fs.unlinkSync("../images/"+this.id+"/"+image_name);
			changeOrder(-1,this.id,parseInt(index),db,()=>{callback(true);});
		})
	}

	
    setImage(image_string, order_id, image_name, db, callback){
        let id = String(this.id);
        let path = "../images/";
		let fullpath=path+id+"/"+image_name;
        if(!fs.existsSync(path+id)){
			if(!fs.existsSync(path)){
				fs.mkdirSync(path);
            } 
			fs.mkdirSync(path+id);
        }
        if(!fs.existsSync(fullpath)){
			changeOrder(+1,this.id,order_id-1,db,()=>{
				base64_decode(image_string,fullpath);
				db.safeSearch("INSERT INTO shop_item_images (`item_id`, `url`, `order_id`) VALUES (?,?,?)", 
				[parseInt(id), id+"/"+image_name, order_id], function(x){ console.log(">successfully added url to database<");callback(true); });
			});
        } else {
			fs.truncate(fullpath, 0, function() {
				base64_decode(image_string, fullpath);
				callback(true);
			});	
        }     
    }

}

function changeOrder(amount,item_id,order_id,db,callback){
	db.safeSearch("UPDATE shop_item_images SET order_id=order_id+? WHERE item_id=? AND order_id>?",[amount,item_id,order_id],(e)=>{
		callback();
	});
}

//encodes the image given at the path "file" to a base64 encoded string 
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

//gets item_id returns array in callback with urls of all images that belong to the item_id in the right order
function getImagesURL(item_id,db,callback){
	db.search("SELECT url FROM shop_item_images WHERE item_id="+item_id+" ORDER BY order_id ASC",(rows)=>{
		result={};
		for(let i =0;i<rows.length;i++){
			result[i]=rows[i]["url"];
		}
		callback(result);
	});
}

//gets a base64 encoded String and puts out a jpg at the directory "file"
//"file" also specifies the name (see testclass above)
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer.from(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('>File created at '+file+' from base64 encoded string<');
}

module.exports.ShopItem = ShopItem;