//require dotenv
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//db file
require("./src/db/mongoose");

//import routes
const userRoutes = require("./src/routes/user");
const itemRoutes = require("./src/routes/item");
const sellerRoutes = require("./src/routes/seller");
const paymentRoutes = require("./src/routes/paymentRoute");
const adminRoutes = require("./src/routes/adminRoute");

const app = express();
const port = process.env.PORT || 5000;

//parse nodejs body
app.use(express.json());
app.use(bodyParser.json());

/*[Deployment: to heroku] */
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

//Register router here
app.use(userRoutes);
app.use(sellerRoutes);
app.use(itemRoutes);
app.use(paymentRoutes);
app.use(adminRoutes);

/*Image upload functionality--to make "uploads" folder publically available so that we can use it and view in the browser*/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
