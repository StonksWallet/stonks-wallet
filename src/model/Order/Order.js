const validator = require("../../util/helpers/validators.js");

class Order {
    constructor(name, user_email, price, order_date, id = null) {
        this.name = name;
        this.user_email = user_email;
        this.price = price;
        this.order_date = order_date;
        this.id = id;
    }
    static validate(name, user_email, price, order_date) {
        validator.emptyField({
            name: name,
            user_email: user_email,
            price: price,
            order_date: order_date
        });
        validator.validateEmail(user_email);
    }
}

module.exports = Order;