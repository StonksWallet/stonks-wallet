const orderController = require('../controller/orderController');
const { Auth } = require('../util/middlewares');

module.exports = app => {
    app.route('/order')
        .post(orderController.createOrder);

    app.route('/order')
        .get(
            Auth.bearer,
            orderController.getOrders
        );
};