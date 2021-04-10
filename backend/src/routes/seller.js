const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Seller = require("../models/seller");
const Order = require("../models/order");

//require crypto package to pass it as email token
const crypto = require("crypto");

//require sendGrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*Image upload functionality--import multer npm package*/
const multer = require("multer");

/*Image upload functionality--use .diskStorage method to modify the file in various aspects i.e. destination,size, etc...*/
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 90000) + 10000 + "-" + file.originalname);
  },
});

/*Image upload functionality--to allow only specific type of file i.e. jpg,png etc*/
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); //accept the file
  } else {
    cb(null, false); //reject the file
  }
};

/*Image upload functionality--initialise multer object*/
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

/*Image upload functionality--write method as middleware to parse request to the file obbjbect*/
router.post("/sellerSignup", upload.single("restImage"), async (req, res) => {
  console.log("req.file...", req.file);
  console.log(req.body.restaurantname);

  try {
    const { tags, restaurantname, email, password, address, state, city, phoneno } = req.body;

    if (
      !email ||
      !password ||
      !address ||
      !state ||
      !city ||
      !tags ||
      !restaurantname ||
      !phoneno
    ) {
      console.log(tags, restaurantname, email, password, city, state, address, phoneno);
      return res.status(404).send({ error: "All fields are required...!" });
    }

    //check image is uploaded or not
    if (!req.file) {
      return res.status(404).send({ error: "Image is required...!" });
    }

    const emailToken = crypto.randomBytes(64).toString("hex");

    //create model object to store data into database
    const seller = new Seller({
      restaurantname,
      email,
      password,
      address,
      state,
      city,
      image: req.file.path, //to store default path of image into database
      tags,
      phoneno,
      emailToken,
      isVerified: false,
    });

    //create msg object and send it
    const msg = {
      from: "safinghoghabori65@gmail.com",
      to: email,
      subject: "Foody - Verify your email",
      text: `
        Hello, thanks for registering on our site.
        Please copy and paste the address below to verify your account.
        http://${req.headers.host}/verify-seller-email?token=${emailToken}
      `,
      html: `
        <h1>Hello, ${restaurantname}</h1>
        <h5>thanks for registering on our site.</h5>
        <h5>Please click on below link to verify your account.</h5>
        <h6><a href="http://${req.headers.host}/verify-seller-email?token=${emailToken}">Verify your account...click here!</a></h6>
      `,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log("signup email sending error...", error);
    }

    //save seller into database
    await seller.save(req.body);
    res.send({ msg: "Please check your email to verify your account" });
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
router.get("/verify-seller-email", async (req, res) => {
  try {
    const seller = await Seller.findOne({ emailToken: req.query.token });
    if (!seller) {
      return res.status(404).send({ error: "Token is invalid...try again" });
    }
    seller.emailToken = null;
    seller.isVerified = true;
    await seller.save();
    res.status(200).send({ msg: "Account verified successfully..." });
  } catch (error) {
    console.log("seller verify email error...", error);
    res.status(404).send({ error });
  }
});

router.post("/sellerSignin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ error: "All fields are required...!" });
    }

    //find seller by his email & password
    const seller = await Seller.findOne({ email, password }).select("-password");
    if (!seller) {
      return res.status(404).send({ error: "Invalid email or password...!" });
    }

    //check if seller is verified or not(verify his account by checking email or not)
    if (!seller.isVerified) {
      return res.status(404).send({ error: "Please verify your account and try again...!" });
    }

    //if success
    res.send(seller);
  } catch (error) {
    res.status(404).send({ error });
  }
});

//reset password route
router.post("/reset-seller-password", async (req, res) => {
  try {
    const { email } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).send({ error: "User doesn't exist with this email...!" });
    }

    const resetPasswordToken = crypto.randomBytes(64).toString("hex");

    seller.resetPasswordToken = resetPasswordToken;
    seller.expirePasswordToken = Date.now() + 3600000;
    await seller.save();

    //create msg object and send it
    const msg = {
      from: "safinghoghabori65@gmail.com",
      to: email,
      subject: "Foody - Reset Password",
      text: `
        Hello, reset your password.
        Please copy and paste the address below to reset your password.
        http://localhost:3000/new-seller-password/token=${resetPasswordToken}
      `,
      html: `
        <h1>Hello, ${seller.restaurantname}</h1>
        <h5>Please click on below link to reset your password.</h5>
        <h6><a href="http://localhost:3000/new-seller-password/token=${resetPasswordToken}">Reset password...click here!</a><h6>
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
router.post("/new-seller-password", async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    console.log("token...", token);

    const seller = await Seller.findOne({
      resetPasswordToken: token,
      expirePasswordToken: { $gt: Date.now() },
    });
    console.log(seller);
    if (!seller) {
      return res.status(404).send({ error: "Try again! Session has already expired...!" });
    }

    seller.password = newPassword;
    seller.resetPasswordToken = null;
    seller.expirePasswordToken = null;

    await seller.save();
    res.status(200).send({ msg: "Password updated successfully...!" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "Can't reset password, something went wrong...!" });
  }
});

/*this is same as user's orders route, we can make both common too  */
router.get("/seller-orders/:selId", async (req, res) => {
  try {
    const selId = mongoose.Types.ObjectId(req.params.selId);

    //find all orders created by logged in user only
    const userOrders = await Order.find({ "seller.sellerId": selId });

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
