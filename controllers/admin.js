const { v4: uuidv4 } = require("uuid");
const Admin = require("../models/admin");

const admins = (req, res, next) => {
  Admin.find()
    .then((response) => {
      if (response.length > 0) {
        res.json({ data: response, message: "", error: "" });
      } else {
        res.json({ data: response, message: "No Users Found", error: "" });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const admin = (req, res, next) => {
  Admin.find({
    email: req.body.email,
    password: req.body.password,
    is_active: true,
  })
    .then((response) => {
      if (response.length > 0) {
        res.json({ data: response, message: "", error: "" });
      } else {
        res.json({ data: response, message: "No Admin Found", error: "" });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const registerAdmin = (req, res, next) => {
  Admin.find()
    .then((response) => {
      const emails = response.map((x) => x.email);
      const mobiles = response.map((x) => x.mobile);
      if (response.length > 0 && emails.includes(req.body.email))
        res.json({ data: [], message: "Email Already Registered!", error: "" });
      else if (response.length > 0 && mobiles.includes(req.body.mobile))
        res.json({
          data: [],
          message: "Mobile Already Registered!",
          error: "",
        });
      else {
        let new_user = new Admin({
          uuid: uuidv4(),
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          mobile: req.body.mobile,
          email: req.body.email,
          user_name: req.body.user_name,
          gender: req.body.gender,
          password: req.body.password,
        });
        new_user
          .save()
          .then((response) => {
            res.json({ data: [], message: "Admin Added", error: "" });
          })
          .catch((error) => {
            res.json({
              data: [],
              message: "An Error Occured",
              error: error.message,
            });
          });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const updateAdmin = (req, res, next) => {
  Admin.updateOne(
    { uuid: req.body.uuid },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
      },
    }
  ).then((response) => {
    if (response.modifiedCount > 0) {
      Admin.find({ uuid: req.body.uuid }).then((response1) => {
        if (response1.length > 0)
          res.json({
            data: response1,
            message: "Admin Details Updated Successfully",
            error: "",
          });
        else res.json({ data: [], message: "Admin not found", error: "" });
      });
    } else
      res.json({
        data: [],
        message: "Error Occured Updating The Admin Details",
        error: "",
      });
  });
};

const updateAdminPassword = (req, res, next) => {
  Admin.updateOne(
    { uuid: req.body.uuid },
    { $set: { password: req.body.password } }
  ).then((response) => {
    if (response.modifiedCount > 0)
      res.json({
        data: [],
        message: "Admin Password Updated Successfully",
        error: "",
      });
    else
      res.json({
        data: [],
        message: "Error Occured Updating The Admin Password",
        error: "",
      });
  });
};

module.exports = {
  admins,
  registerAdmin,
  admin,
  updateAdmin,
  updateAdminPassword,
};