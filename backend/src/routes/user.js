const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");
const Item = require("../models/item");
const Seller = require("../models/seller");
const Order = require("../models/order");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { firstname, lastname, email, password, address, state, city } = req.body;
    if (!firstname || !lastname || !email || !password || !address || !state || !city) {
      return res.status(404).send({ error: "All fields are required...!" });
    }

    //create model object to store data into database
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      address,
      state,
      city,
    });
    console.log(`user signup...${user}`);

    //save user into database
    await user.save(req.body);
    res.send(user);
  } catch (error) {
    //throw error if email already exists
    if (error.keyValue) {
      return res.status(404).send({ error: "Email already exists...!" });
    }
    console.log(error);
    res.status(404).send({ error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ error: "All fields are required...!" });
    }

    //find user by his email & password
    const user = await User.findOne({ email, password }).select("-password");
    if (!user) {
      return res.status(404).send({ error: "Invalid email or password...!" });
    }

    //if success
    res.send(user);
  } catch (error) {
    res.status(404).send({ error });
  }
});

router.post("/add-to-cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.body.itemId;
    const itemQty = req.body.itemQty;
    console.log(userId, itemId, itemQty);
    let targetItem;

    if (itemQty === undefined) itemQty = 1;

    //find item from Item collection
    const item = await Item.findById(itemId);
    targetItem = item;

    //find logged in user
    const user = await User.findById(userId);

    if (user) {
      await user.addToCart(targetItem);
    } else {
      res.status(404).send({ msg: "User not found...!" });
    }

    res.status(200).send({ msg: "Item added to cart successfully...!", item });
  } catch (error) {
    res.status(404).send({ error: "Item can't be added...something went wrong!" });
  }
});

router.get("/get-cart-items/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    //find user
    const user = await User.findById(userId).populate("cart.items.item");

    console.log("user...", user);
    if (user) {
      const cartItems = user.cart.items;
      console.log("cartItems...", cartItems);
      let totalPrice = 0;
      cartItems.forEach((item) => {
        totalPrice = totalPrice + item.qty * item.item.price;
      });

      res.status(200).send({ cart: cartItems, totalPrice });
      // res.status(200).send(user.cart.items);
    } else {
      res.status(404).send({ error: "User not found...!" });
    }
  } catch (error) {
    res.status(404).send({ error: "Cannot get items...something went wrong!" });
  }
});

router.post("/reduce-cart-item/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.body.itemId;

    console.log(userId, itemId);

    //find user
    const user = await User.findById(userId);

    //find item and reduce qty
    await user.reduceFromCart(itemId);

    res.status(200).send({ msg: "Item successfully reduced from cart...!" });
  } catch (error) {
    res.status(404).send({ error: "Could not reduce cart item...something went wrong" });
  }
});

/*[NOTE: here we done some kind of insert/create operation,so we will use POST method instead of DELETE, see .removeFromCart method inside user model]*/
router.post("/delete-cart-item/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.body.itemId;

    //find user
    const user = await User.findById(userId);

    //find item and delete
    await user.deleteCartItem(itemId);

    res.status(200).send({ msg: "Item successfully removed from cart...!" });
  } catch (error) {
    res.status(404).send({ error: "Could not delete cart item...something went wrong" });
  }
});

//Add deliverAddress of user in User model
router.post("/add-delivery-address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { street, locality, aptName, zip, phoneNo } = req.body;

    //find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "Could not find user...!" });
    }

    console.log("add user...", user);

    //update delivery address of that user
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        deliveryAddress: {
          street,
          locality,
          aptName,
          zip,
          phoneNo,
        },
      },
      { new: true }
    );
    console.log("add updatedUser...", updatedUser);

    res.status(200).send({ updatedUser });
  } catch (error) {
    res.status(404).send({ error: "Could not add delivery address...!" });
  }
});

router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Seller.find().select("-password");

    if (!restaurants) {
      res.status(400).send({ error: "No restaurants available...!" });
    } else {
      res.status(200).send(restaurants);
    }
  } catch (error) {
    res.status(400).send({ error: "Could not find restaurants...something went wrong!" });
  }
});

router.get("/restaurant/:selId", async (req, res) => {
  try {
    const selId = req.params.selId;
    const restaurant = await Seller.findById(selId).select("-password").populate("items");

    if (!restaurant) {
      res.status(400).send({ error: "No restaurant available...!" });
    } else {
      res.status(200).send(restaurant);
    }
  } catch (error) {
    res.status(400).send({ error: "Could not find restaurant...something went wrong!" });
  }
});

router.post("/order/:userId", (req, res) => {
  const userId = req.params.userId;
  let userObj;

  /*CHANGE: to handle different items from different sellers*/
  User.findById(userId)
    .then((user) => {
      userObj = user;
      return user.populate("cart.items.item").execPopulate();
    })
    .then((result) => {
      const sellers = result.cart.items.reduce((acc, item) => {
        if (!acc[item.item.creator]) {
          acc[item.item.creator] = [];
        }

        acc[item.item.creator].push(item);
        return acc;
      }, {});

      // console.log("result...", result);
      // console.log("result delivery add...", result.deliveryAddress);

      for (let [seller, cartItem] of Object.entries(sellers)) {
        Seller.findById(seller).then((seller) => {
          const items = cartItem.map((i) => {
            return { item: { ...i.item._doc }, qty: i.qty };
          });
          const order = new Order({
            items: items,
            user: {
              userId: result,
              name: result.firstname,
              email: result.email,
              address: result.deliveryAddress,
            },
            seller: {
              sellerId: seller,
              name: seller.restaurantname,
              phone: seller.phoneno,
            },
          });
          order.save();
        });
      }
      return result;
    })
    .then((result) => {
      // to make change in db we need to use .save() but it is being done into clearCart() so we dont need to write it here:)
      return userObj.clearCart();
    })
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(404).send({ error: "Something went wrong...!" });
    });
});

router.get("/user-orders/:userId", async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.params.userId);

    //find all orders created by logged in user only
    const userOrders = await Order.find({ "user.userId": userId });

    if (!userOrders) {
      res.status(404).send({ error: "There is no order available...!" });
    } else {
      res.status(200).send({ userOrders });
    }
  } catch (error) {
    res.status(404).send({ error: "Something went wrong...!" });
  }
});

module.exports = router;
