const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  paymentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled', 'processing'],
    default: 'pending'
  },
  shippingAddress: {
    name: String,
    email: String,
    address: String
  }
}, {
  timestamps: true // Esto agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Order', orderSchema); 