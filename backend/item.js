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

function getItem(id, pool, callback) {
    pool.query("SELECT * FROM shop_items WHERE id=?", [id])
		.then((rows) => {
			let item = Object.assign(new ShopItem(), rows[0]);

            callback(item);
		})
		.catch(err => {
			console.log(err); 
			return
		})
}

function insertItem(item, pool) {
    pool.query("INSERT INTO shop_items (`creator_id`, `category_id`, `price`, `name`, `description`)"
            + " VALUES (?, ?, ?, ?, ?)", [item.creator_id, item.category_id, item.price, item.name, item.description])
    .then((rows) => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err); 
        return
    })
}

module.exports.ShopItem = ShopItem;
module.exports.getItem = getItem;
module.exports.insertItem = insertItem;