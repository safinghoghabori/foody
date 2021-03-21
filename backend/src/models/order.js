const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: {
          // type: mongoose.Schema.Types.ObjectId,
          type: Object,
          required: true,
          // ref: "Item",
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: Object,
        required: true,
      },
    },
    seller: {
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Seller",
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
