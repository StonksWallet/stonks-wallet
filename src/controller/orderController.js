const Order = require("../model/User/Order.js");
const OrderRepository = require('../service/Repositories/UserRepository.js');
const { UserSerializer } = require("../service/Serializer/index.js");
const {DuplicatedEmailError} = require("../util/errors");

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

            sendResponse(res, 201, result, new UserSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    },
    getOrder: async (req, res, next) => {
        const { name } = req.body;
        const filter = name || 'none';
        try {
            const result = name ? await OrderRepository.listByName(filter) : await OrderRepository.list();
            sendResponse(res, 201, result, new UserSerializer(res.getHeader('Content-Type')));
        } catch (error) {
            next(error)
        }
    }
};