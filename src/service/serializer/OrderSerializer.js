const Serializer = require("./Serializer.js");

class OrderSerializer extends Serializer {
    constructor(contentType, extraFields = []) {
        super();
        this.contentType = contentType;
        this.publicFields = ['_id', 'name', 'user_email', 'price', 'order_date'].concat(extraFields);
    }
}

module.exports = OrderSerializer;
