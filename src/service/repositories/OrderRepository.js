const OrderModel = require('../../model/Order/OrderModel.js');
const Order = require("../../model/Order/Order.js");

module.exports = {
    create: async (order) => {
        const instance = new OrderModel(order);
        const result = await instance.save();
        return result.toObject();
    },
    update: async (order) => {
        await OrderModel.findByIdAndUpdate(order.id, order);
        const result = await OrderModel.findById(order.id);
        return result.toObject();
    },
    findByParams: async(params) => {
        const result = await OrderModel.find(params)
        return result.map(order => new Order(
            order.name, order.user_email, order.price, order.order_date, order.quantity, order.type_order, order._id
        ))
    },
    findByOrderName: async (name) => {
        const result = await OrderModel.find({name: name})
        if(!result)
            throw new OrderNotFound();
        return result.map(order => new Order(
            order.name, order.user_email, order.price, order.order_date, order.quantity, order.type_order, order._id
        ));
    },
    findByUserEmail: async (user_email) => {
        const result = await OrderModel.find({user_email: user_email});
        if(!result)
            throw new OrderNotFound();
        return result.map(order => new Order(
            order.name, order.user_email, order.price, order.order_date, order.quantity, order.type_order, order._id
        ));
    },
    findById: async (id) => {
        const result = await OrderModel.findById(id);
        if(!result)
            throw new OrderNotFound();
        return result.toObject();
    },
    findByNameUserEmail: async (name, user_email) => {
        const result = await OrderModel.find({name: name, user_email: user_email})
        if(!result)
            throw new OrderNotFound();
        return result.map(order => new Order(
            order.name, order.user_email, order.price, order.order_date, order.quantity, order.type_order, order._id
        ));
    },
    deleteById: async (id) => {
        const result = await OrderModel.findByIdAndDelete(id);
        if(!result)
            throw new OrderNotFound();
        return result.toObject();
    }
}