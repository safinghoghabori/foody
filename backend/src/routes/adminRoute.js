const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const Seller = require("../models/seller");

router.get("/get-all-restaurants", async (req, res) => {
  try {
    const restaurants = await Seller.find().select("-password");

    if (!restaurants) {
      return res.status(200).send({ msg: "No restaurants available" });
    }

    res.status(200).send(restaurants);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error });
  }
});

router.delete("/delete-restaurant/:id", async (req, res) => {
  try {
    const restId = req.params.id;

    const rest = await Seller.findById(restId);
    clearImage(rest.image);

    await Seller.findByIdAndDelete(restId);

    res.status(200).send({ msg: "Restaurant deleted successfully" });
  } catch (error) {
    console.log("admin route error...", error);
    res.status(404).send({ error });
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
