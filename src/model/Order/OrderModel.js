const { Schema, model } = require('mongoose')

const OrderModel = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  order_date: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type_order: {
    type: Boolean,
    required: true
  }
},
{
  timestamps: true
})

module.exports = model('Order', OrderModel)
