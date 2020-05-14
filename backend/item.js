var fs = require('fs');

class ShopItem {

    constructor(id, creator_id, category_id, price, name, description, isAvailable) {
        this.id = id;
        this.creator_id = creator_id;
        this.category_id = category_id;
        this.price = price;
        this.name = name;
        this.description = description;
        this.isAvailable = isAvailable;
    }

    getImagesURL(item_id,callback){
        db.search("SELECT url FROM shop_item_images WHERE item_id="+item_id+" ORDER BY order_id ASC",(rows)=>{
            result={};
            for(let i =0;i<rows.length;i++){
                result[i]=rows[i]["url"];
            }
            callback(result);
        });
    }
    
    getItem(id, db, callback) {
        db.safeSearch("SELECT * FROM shop_items WHERE id=?", [id], function(rows) {
            let item = Object.assign(new ShopItem(), rows[0]);
            getImagesURL(id, images => {
                item.urls=images;
                callback(item);
            });
        });
    }
    
    insertItem(item, db, callback) {
        db.safeSearch("INSERT INTO shop_items (`creator_id`, `category_id`, `price`, `name`, `description`) VALUES (?, ?, ?, ?, ?)",
                    [item.creator_id, item.category_id, item.price, item.name, item.description],
                    function(result) {
            callback(result.affectedRows > 0 ? result.insertId : -1);
        });
    }
    
    deleteItem(id, db, callback) {
        db.safeSearch("UPDATE shop_items SET isAvailable=0 WHERE id=?", [id], function(result) {
            callback(result.affectedRows > 0)
        });
    }

    setImage(image_string, order_id, db, callback){
                let id = String(this.id);
                let path = "images/"+id
                if(!fs.existsSync(path)){
                    if(!fs.existsSync("images")){
                        fs.mkdirSync("images");
                    } 
                    fs.mkdirSync(path);
                }
                base64_decode(image_string, path+"/"+order_id+".jpg");
                //WIP
                //binary stream as input => convert to jpeg or png and drop to correct directory
                db.safeSearch("INSERT INTO shop_item_images (`item_id`, `url`, `order_id`) VALUES (?,?,?)", 
                [id, path+"/"+(order_id)+".jpg", order_id], function(x){ console.log(">successfully added url to database<") });
    }

    testImage(){
        let enc_img = base64_encode("images/Test/test.jpg");
        //console.log(enc_img);
        base64_decode(enc_img,"images/Test/testName.jpg");
    }

}

//encodes the image given at the path "file" to a base64 encoded string 
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
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