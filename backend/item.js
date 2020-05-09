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

    setImage(id, db, callback){
        db.safeSearch("SELECT * FROM shop_items WHERE id=?", [id], function(rows){
            rslt = Object.assign(new Item(), rows[0]);
            if(rslt == []){
                console.log("Error: item_id was not found in database");
            } else {
                if(!fs.exists(id)){
                    fs.mkdirSync(id);
                }
                //WIP
                //binary stream as input => convert to jpeg or png and drop to correct directory
                db.safeSearch("INSERT INTO shop_item_images (`item_id`, `url`, `order_id`) VALUES (?,?,?)", 
                [id, ])
            }
        });
    }

}

module.exports.ShopItem = ShopItem;