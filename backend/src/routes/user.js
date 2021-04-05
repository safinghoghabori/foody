const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");
const Item = require("../models/item");
const Seller = require("../models/seller");
const Order = require("../models/order");

const router = express.Router();

//require crypto package to pass it as email token
const crypto = require("crypto");

//require sendGrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { firstname, lastname, email, password, address, state, city } = req.body;
    if (!firstname || !lastname || !email || !password || !address || !state || !city) {
      return res.status(404).send({ error: "All fields are required...!" });
    }

    const emailToken = crypto.randomBytes(64).toString("hex");

    //create model object to store data into database
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      address,
      state,
      city,
      emailToken,
      isVerified: false,
    });
    console.log(`user signup...${user}`);

    //create msg object and send it
    const msg = {
      from: "safinghoghabori65@gmail.com",
      to: email,
      subject: "Foody - Verify your email",
      text: `
        Hello, thanks for registering on our site.
        Please copy and paste the address below to verify your account.
        http://${req.headers.host}/verify-user-email?token=${emailToken}
      `,
      html: `
        <h1>Hello, ${firstname} ${lastname}</h1>
        <h3>thanks for registering on our site.</h3>
        <h3>Please click on below link to verify your account.</h3>
        <a href="http://${req.headers.host}/verify-user-email?token=${emailToken}">Verify your account...click here!</a>
      `,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log("signup email sending error...", error);
    }

    //save user into database
    await user.save(req.body);
    // res.send(user);
    res.status(200).send({ msg: "Please check your email to verify your account" });
  } catch (error) {
    //throw error if email already exists
    if (error.keyValue) {
      return res.status(404).send({ error: "Email already exists...!" });
    }
    console.log(error);
    res.status(404).send({ error });
  }
});

// Email verification route
router.get("/verify-user-email", async (req, res) => {
  try {
    const user = await User.findOne({ emailToken: req.query.token });
    if (!user) {
      return res.status(404).send({ error: "Token is invalid...try again" });
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    res.status(200).send({ msg: "Account verified successfully..." });
  } catch (error) {
    console.log("user verify email error...", error);
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

    //check if user is verified or not(verify his account by checking email or not)
    if (!user.isVerified) {
      return res.status(404).send({ error: "Please verify your account and try again...!" });
    }

    //if success
    res.send(user);
  } catch (error) {
    res.status(404).send({ error });
  }
});

//reset password route
router.post("/reset-user-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User doesn't exist with this email...!" });
    }

    const resetPasswordToken = crypto.randomBytes(64).toString("hex");

    user.resetPasswordToken = resetPasswordToken;
    user.expirePasswordToken = Date.now() + 3600000;
    await user.save();

    //create msg object and send it
    const msg = {
      from: "safinghoghabori65@gmail.com",
      to: email,
      subject: "Foody - Reset Password",
      text: `
        Hello, reset your password.
        Please copy and paste the address below to reset your password.
        http://localhost:3000/new-user-password/token=${resetPasswordToken}
      `,
      html: `
        <h1>Hello, ${user.firstname} ${user.lastname}</h1>
        <h3>Reset your password.</h3>
        <h3>Please click on below link to reset your password.</h3>
        <a href="http://localhost:3000/new-user-password/token=${resetPasswordToken}">Reset password...click here!</a>
      `,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log("signup email sending error...", error);
    }

    res.status(200).send({ msg: "Please check your email to reset password" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
});

// New password route
router.post("/new-user-password", async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    console.log("token...", token);

    const user = await User.findOne({
      resetPasswordToken: token,
      expirePasswordToken: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return res.status(404).send({ error: "Try again! Session has already expired...!" });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.expirePasswordToken = null;

    await user.save();
    res.status(200).send({ msg: "Password updated successfully...!" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "Can't reset password, something went wrong...!" });
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
