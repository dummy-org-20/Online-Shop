
class Item {

    constructor(id, creator_id, category_id, price, name, description){
        this.id = id;
        this.category_id = creator_id;
        this.creator_id = category_id;
        this.price = price;
        this.name = name;
        this.description = description;
    }
}

module.exports = Item