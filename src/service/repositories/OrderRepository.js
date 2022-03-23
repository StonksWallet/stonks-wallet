const OrderModel = require('../../model/Order/OrderModel.js');
const Order = require("../../model/Order/Order.js");

module.exports = {
    save: async (order) => {
        const instance = new OrderModel(order);
        const result = await instance.save();
        return result.toObject();
    },
    find: async () => {
        const result = await OrderModel.find();
        if(!result)
            throw new OrderNotFound();
        return result.map(order => new Order(order.name, order.user_email, order.price, order.order_date));
    },
    findByOrderName: async (order_name) => {
        const result = await OrderModel.find({name: order_name})
        if(!result)
            throw new OrderNotFound();
        return result.map(order => new Order(order.name, order.user_email, order.price, order.order_date));
    },
    findByUserEmail: async (user_email) => {
        const result = await OrderModel.findOne({user_email: user_email});
        if(!result)
            throw new OrderNotFound();

        return result.map(order => new Order(order.name, order.user_email, order.price, order.order_date));
    },
    findById: async (id) => {
        const result = await OrderModel.findById(id);
        if(!result)
            throw new OrderNotFound();

        return new Order(result.name, result.user_email, result.price, result.order_date);
    }
}