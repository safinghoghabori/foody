const express = require("express");
var mongoose = require("mongoose");

const Item = require("../models/item");
const Seller = require("../models/seller");

const router = express.Router();

/*Image upload functionality--import path,fs in-built packages to access uploads folder(it's being used in last method "clearImage", see bottom)*/
const path = require("path");
const fs = require("fs");

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
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/*Image upload functionality--initialise multer object*/
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.post("/create-item/:selId", upload.single("itemImage"), async (req, res) => {
  console.log("item body...", req.body);
  console.log("item image...", req.file);
  //   var selId = mongoose.Types.ObjectId(req.params.selId);
  try {
    const selId = req.params.selId;
    const { title, description, price, tags } = req.body;

    if ((!title, !description, !price)) {
      return res.status(404).send({ error: "All fields are required...!" });
    }

    //check image is uploaded or not
    if (!req.file) {
      return res.status(404).send({ error: "Image is required...!" });
    }

    //find seller who created the item
    const seller = await Seller.findById(selId);

    //store created item
    const item = new Item({
      title,
      description,
      price,
      image: req.file.path, //to store default path of image into database
      tags,
      creator: seller._id,
    });
    console.log("created item...", item);

    //save item into database
    await item.save(req.body);

    //add item to whome it is created
    seller.items.push(item);
    await seller.save();

    res.status(200).send({
      msg: "Item created, hurray!",
      item: item,
      creator: { _id: seller._id, name: seller.restaurantname },
    });
  } catch (error) {
    res.status(404).send({ error: "Item not created...!" });
  }
});

router.get("/get-items/:selId", async (req, res) => {
  try {
    // const selId = req.params.id;
    const selId = mongoose.Types.ObjectId(req.params.selId);

    //find items created by logged in seller
    const items = await Item.find({ creator: selId });

    if (items.length) {
      res.status(200).send(items);
    } else {
      res.status(200).send({ msg: "You dont have any items...!" });
    }
  } catch (error) {
    res.status(400).send({ error: "Item not found...!" });
  }
});

router.put("/edit-item/:itemId", upload.single("itemImage"), async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log("item req body...", req.body);

    const { title, description, price, tags, itemImage } = req.body;

    console.log(title, description, price);
    if (!title || !description || !price) {
      return res.status(404).send({ error: "All fields are required...!" });
    }

    /*Image upload functionality--check if image selected, then store it in var "image" */
    if (req.file) {
      var image = req.file.path;
    } else {
      image = itemImage;
    }
    console.log("new image...", image);

    const fetchItem = await Item.findById(itemId);

    /*Image upload functionality--import multer npm package*/
    if (image !== fetchItem.image) {
      console.log("old image...", fetchItem.image);
      clearImage(fetchItem.image);
    }

    if (!fetchItem) {
      return res.status(404).send({ error: "Could not find any Item with the given itemId" });
    }

    fetchItem.title = title;
    fetchItem.description = description;
    fetchItem.price = price;
    fetchItem.image = image;
    fetchItem.tags = tags;

    await fetchItem.save();
    res.status(200).send({
      msg: "Item updated successfully...!",
      item: fetchItem,
    });
  } catch (error) {
    res.status(400).send({ error: "Item can't be updated...something went wrong!" });
  }
});

router.delete("/delete-item/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log("itemId...", itemId);

    //delete item from items collection
    const item = await Item.findByIdAndDelete(itemId);

    console.log("item delete...", item);
    /*Image upload functionality--to delete image from the folder*/
    clearImage(item.image);

    //delete(pull) item from Sellers collection
    const seller = await Seller.findOne({ _id: item.creator });

    seller.items.pull(item._id);
    await seller.save();

    res.status(200).send({ msg: "Item deleted successfully...!" });
  } catch (error) {
    res.status(404).send({ error: "Item can't be deleted...something went wrong!" });
  }
});

/*Image upload functionality--to clear image from the folder*/
const clearImage = (filepath) => {
  //this will give whole path i.e.C:\Users\dell\Desktop\my-project\backend\src\routes\uploads\50560-xyz.jpg
  filepath = path.join(__dirname, filepath);

  //remove extra path
  filepath = filepath.replace("\\src\\routes", "");

  fs.unlink(filepath, (error) => {
    console.log(error);
  });
};

module.exports = router;
