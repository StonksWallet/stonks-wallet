const orderController = require('../controller/orderController')
const { Auth } = require('../util/middlewares')

module.exports = app => {
  app.route('/order/create')
    .post(
      Auth.bearer,
      orderController.createOrder
    )

  app.route('/order')
    .get(
      Auth.bearer,
      orderController.getOrders
    )

  app.route('/order/edit')
    .put(
      Auth.bearer,
      orderController.editOrder
    )

  app.route('/order/delete')
    .delete(
      Auth.bearer,
      orderController.deleteOrder
    )
}
