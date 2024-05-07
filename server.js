const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://bandasrinivasulu123:S6uRgHni5GxvyP9b@clustersrinu.itvxdtz.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Your application logic after successful connection
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

// const UserRoute = require('./routes/user');
// const AdminRoute = require('./routes/admin');
// const RideRoute = require('./routes/ride');
// const PoolRoute = require('./routes/pool');

// app.use('/api/user', UserRoute);
// app.use('/api/admin', AdminRoute);
// app.use('/api/ride', RideRoute);
// app.use('/api/pool', PoolRoute);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
app.post("/register_user_test", (req, res) => {
  mongoose.connect("");
  console.log(req.body);
  res.send("Working");
});

app.post("/get_user_test", function (req, res) {
  console.log(req.body);
  var users = ["abc@gmail.com", "sample@gmail.com"];
  if (users.includes(req.body.user_email)) {
    res.json({ email: req.body, message: "login successfull!!", status: true });
  } else {
    res.json({
      email: req.body,
      message: "User Doesnot exist, Please register to continue!!",
      status: false,
    });
  }
});
