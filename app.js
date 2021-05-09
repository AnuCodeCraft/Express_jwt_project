const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

const userRouter = require("./routes/users");

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());


mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false ,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected");
});


app.use("/",userRouter);


app.listen(3000, console.log("server is up and running"));