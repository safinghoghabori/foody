const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  restaurantname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "seller",
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
