const Order = require("../model/Order/Order.js");
const OrderRepository = require('../service/Repositories/OrderRepository.js');
const { OrderSerializer } = require("../service/Serializer/index.js");

function sendResponse(res, status, result, serializer) {
    res.status(status);
    res.send(serializer.serialize(result));
}

function endResponse(res, status) {
    res.status(status);
    res.end();
}

module.exports = {
    createOrder: async (req, res, next) => {
        const {name, user_email, price, order_date} = req.body;
        try {
            Order.validate(name, user_email, price, order_date);
            const order = new Order(name, user_email, price, order_date);
            const result = await OrderRepository.save(order);

            sendResponse(res, 201, result, new OrderSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    },
    getOrders: async (req, res, next) => {
        const { name } = req.body;
        const filter = name || 'none';
        try {
            const result = name ? await OrderRepository.findByOrderName(filter) : await OrderRepository.find();
            sendResponse(res, 201, result, new OrderSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    }
};