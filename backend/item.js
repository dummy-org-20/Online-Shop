class ShopItem {

    constructor(id, creator_id, category_id, price, name, description) {
        this.id = id;
        this.creator_id = creator_id;
        this.category_id = category_id;
        this.price = price;
        this.name = name;
        this.description = description;
    }

}

//also change delete item so that it marks it as unavaible instead of deleting it for real

function getImagesURL(item_id,callback){
	db.search("SELECT url FROM shop_item_images WHERE item_id="+item_id+" ORDER BY order_id ASC",(rows)=>{
		result={};
		for(let i =0;i<rows.length;i++){
			result[i]=rows[i]["url"];
        }
        
		callback(result);
	});
}

function getItem(id, db, callback) {
    db.safeSearch("SELECT * FROM shop_items WHERE id=?", [id], function(rows) {
        let item = Object.assign(new ShopItem(), rows[0]);
        getImagesURL(id, images => {
            item.urls=images;
            callback(item);
        });
    });
}

function insertItem(item, db, callback) {
    db.safeSearch("INSERT INTO shop_items (`creator_id`, `category_id`, `price`, `name`, `description`) VALUES (?, ?, ?, ?, ?)",
                [item.creator_id, item.category_id, item.price, item.name, item.description],
                function(result) {
        callback(result.affectedRows > 0 ? result.insertId : -1);
    });
}

function deleteItem(id, db, callback) {
    db.safeSearch("DELETE FROM shop_items WHERE id=?", [id], function(result) {
        callback(result.affectedRows > 0)
    });
}

module.exports.ShopItem = ShopItem;
module.exports.getItem = getItem;
module.exports.insertItem = insertItem;
module.exports.deleteItem = deleteItem;