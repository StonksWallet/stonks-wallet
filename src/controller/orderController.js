const Order = require("../model/Order/Order.js");
const OrderRepository = require('../service/repositories/OrderRepository.js');
const { OrderSerializer } = require("../service/serializer/index.js");

function sendResponse(res, status, result, serializer) {
    res.status(status);
    res.send(serializer.serialize(result));
}

module.exports = {
    createOrder: async (req, res, next) => {
        const user_email = req.user.email;
        const { name, price, order_date, quantity, type_order } = req.body;
        try {
            Order.validate(name, price, order_date, quantity, type_order);
            const order = new Order(name, user_email, price, order_date, quantity, type_order);
            const result = await OrderRepository.create(order);

            sendResponse(res, 201, result, new OrderSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    },
    getOrders: async (req, res, next) => {
        const user_email = req.user.email;
        const { name } = req.body;
        const filter = name || 'none';
        try {
            const result = name ? await OrderRepository.findByNameUserEmail(filter, user_email) : await OrderRepository.findByUserEmail(user_email);
            
            sendResponse(res, 200, result, new OrderSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    },
    editOrder: async (req, res, next) => {
        const user_email = req.user.email;
        const { id, name, price, order_date, quantity, type_order } = req.body;
        try {
            Order.validate(name, price, order_date, quantity, type_order);
            const order = new Order(name, user_email, price, order_date, quantity, type_order, id)
            const result = await OrderRepository.update(order);
            
            sendResponse(res, 202, result, new OrderSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    },
    deleteOrder: async (req, res, next) => {
        const { id } = req.body;
        try {
            const result = await OrderRepository.deleteById(id);

            sendResponse(res, 202, result, new OrderSerializer(res.getHeader('Content-Type')));
        }   catch (error) {
            next(error)
        }
    }
};