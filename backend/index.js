const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//db file
require("./src/db/mongoose");

//import routes
const userRoutes = require("./src/routes/user");
const itemRoutes = require("./src/routes/item");
const sellerRoutes = require("./src/routes/seller");

const app = express();
const port = process.env.PORT || 5000;

//parse nodejs body
// app.use(express.json());
app.use(bodyParser.json());

//Register router here
app.use(userRoutes);
app.use(sellerRoutes);
app.use(itemRoutes);

/*Image upload functionality--to make "uploads" folder publically available so that we can use it and view in the browser*/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
