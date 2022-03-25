const Serializer = require('./Serializer.js')

class OrderSerializer extends Serializer {
  constructor (contentType, extraFields = []) {
    super()
    this.contentType = contentType
    this.publicFields = ['id', 'name', 'user_email', 'price', 'order_date', 'quantity', 'type_order'].concat(extraFields)
  }
}

module.exports = OrderSerializer
