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

const UserRoute = require('./routes/user');
const StaffRoute = require('./routes/staff');
const AdminRoute = require('./routes/admin');

app.use('/api/user', UserRoute);
app.use('/api/staff', StaffRoute);
app.use('/api/admin', AdminRoute);


app.get("/", (req, res) => {
  res.send("Backend Works");
});
