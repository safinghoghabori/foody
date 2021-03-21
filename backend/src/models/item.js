const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "none",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: "true",
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
