const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  audoIndex: true,
});

//check connection
mongoose.connection.on("connected", () => {
  console.log("Database connected successfully....!");
});
mongoose.connection.on("error", (error) => {
  console.log(`Error...${error}`);
});
