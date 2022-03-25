const validator = require('../../util/helpers/validators.js')

class Order {
  constructor (name, user_email, price, order_date, quantity, type_order, id = null) {
    this.name = name
    this.user_email = user_email
    this.price = price
    this.order_date = order_date
    this.id = id
    this.quantity = quantity
    this.type_order = type_order
  }

  static validate (name, price, order_date, quantity, type_order) {
    validator.emptyField({
      name: name,
      price: price,
      order_date: order_date,
      quantity: quantity
    })
  }
}

module.exports = Order
