const mongoose = require("mongoose");

//for delivery address
const deliveryInfo = {
  street: String,
  locality: String,
  aptName: String,
  zip: String,
  phoneNo: Number,
};

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
  role: {
    type: String,
    default: "user",
  },
  deliveryAddress: deliveryInfo,
  cart: {
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (item) {
  const cartItemIndex = this.cart.items.findIndex((cp) => {
    return cp.item.toString() === item._id.toString();
  });
  console.log("cartItemIndex...", cartItemIndex);
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  console.log("updatedCartItems...", updatedCartItems);

  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].qty + 1;
    updatedCartItems[cartItemIndex].qty = newQuantity;
  } else {
    updatedCartItems.push({
      item: item._id,
      qty: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };

  console.log("updatedCart...", updatedCart);

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.reduceFromCart = function (itemId) {
  const newCart = this.cart.items.map((item) => {
    if (item.item.toString() === itemId.toString())
      return {
        ...item.toObject(),
        qty: item.qty - 1,
      };
    return item.toObject();
  });

  console.log("newCart...", newCart);
  const finalNewCart = newCart.filter((item) => {
    return item.qty > 0;
  });
  this.cart.items = finalNewCart;
  return this.save();
};

userSchema.methods.deleteCartItem = function (itemId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.item.toString() !== itemId.toString();
  });
  console.log("updatedCartItems...", updatedCartItems);
  this.cart.items = updatedCartItems;
  return this.save();
};

//After placing order this will be used to clear cart
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
