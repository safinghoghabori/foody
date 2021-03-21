const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Seller = require("../models/seller");
const Order = require("../models/order");

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
    });

    //save user into database
    await seller.save(req.body);
    res.send({ msg: "Restaurant created successfully...!" });
  } catch (error) {
    //throw error if email already exists
    if (error.keyValue) {
      return res.status(404).send({ error: "Email already exists...!" });
    }
    console.log(error);
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

    //if success
    res.send(seller);
  } catch (error) {
    res.status(404).send({ error });
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
