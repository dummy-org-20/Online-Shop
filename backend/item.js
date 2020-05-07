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

function getItem(id, db, callback) {
    db.safeSearch("SELECT * FROM shop_items WHERE id=?", [id], function(rows) {
        let item = Object.assign(new ShopItem(), rows[0]);

        callback(item);
    })
}

function insertItem(item, db) {
    db.safeSearch("INSERT INTO shop_items (`creator_id`, `category_id`, `price`, `name`, `description`) VALUES (?, ?, ?, ?, ?)",
                [item.creator_id, item.category_id, item.price, item.name, item.description],
                function(rows) {
        console.log(rows);
    })
}

module.exports.ShopItem = ShopItem;
module.exports.getItem = getItem;
module.exports.insertItem = insertItem;