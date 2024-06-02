const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const Bookings = require("../models/bookings");

const users = (req, res, next) => {
  User.find()
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

const user = (req, res, next) => {
  User.find({ email: req.body.email, password: req.body.password, is_deleted: false })
    .then((response) => {
      if (response.length > 0) {
        res.json({ data: response, message: "", error: "" });
      } else {
        res.json({ data: response, message: "No User Found", error: "" });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const registerUser = (req, res, next) => {
  User.find()
    .then((response) => {
      const emails = response.map((x) => x.email);
      const mobiles = response.map((x) => x.mobile);
      if (response.length > 0 && emails.includes(req.body.email)) res.json({ data: [], message: "Email Already Registered!", error: "" });
      else if (response.length > 0 && mobiles.includes(req.body.mobile)) res.json({ data: [], message: "Mobile Already Registered!", error: "" });
      else {
        let new_user = new User({
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
            res.json({ data: [], message: "User Added", error: "" });
          })
          .catch((error) => {
            res.json({ data: [], message: "An Error Occured", error: error.message });
          });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const updateUser = (req, res, next) => {
  User.updateOne({ uuid: req.body.uuid }, { $set: { first_name: req.body.first_name, last_name: req.body.last_name, mobile: req.body.mobile } }).then(
    (response) => {
      if (response.modifiedCount > 0) {
        User.find({ uuid: req.body.uuid }).then((response1) => {
          if (response1.length > 0) res.json({ data: response1, message: "User Details Updated Successfully", error: "" });
          else res.json({ data: [], message: "User not found", error: "" });
        });
      } else res.json({ data: [], message: "Error Occured Updating The User Details", error: "" });
    }
  );
};

const updateUserPassword = (req, res, next) => {
  User.updateOne({ uuid: req.body.uuid }, { $set: { password: req.body.password } }).then((response) => {
    if (response.modifiedCount > 0) res.json({ data: [], message: "User Password Updated Successfully", error: "" });
    else res.json({ data: [], message: "Error Occured Updating The User Password", error: "" });
  });
};

const toggleUser = (req, res, next) => {
  User.updateOne({ uuid: req.body.uuid }, { $set: { is_active: req.body.is_active } }).then((response) => {
    if (response.modifiedCount > 0) {
      let status = req.body.is_active ? "Enabled" : "Disabled";
      res.json({ data: [], message: "User " + status + " Successfully", error: "" });
    } else res.json({ data: [], message: "Error Occured Updating The User Status", error: "" });
  });
};

const bookService = (req, res, next) => {
  let book_service = new Bookings({
    uuid: uuidv4(),
    user_uuid: req.body.user_uuid,
    status: 0,
    service_uuid: req.body.service_uuid,
    service_name: req.body.service_name,
    service_cost: req.body.service_cost,
    service_description: req.body.service_description,
    service_date: req.body.service_date,
    service_address: req.body.service_address,
    service_for_other: req.body.service_for_other,
    notes: req.body.notes,
  });

  book_service
    .save()
    .then((response) => {
      res.json({ data: [], message: "Booking Added Successfully", error: "" });
    })
    .catch((error) => {
      res.json({
        data: [],
        message: "An Error Occured Booking the service",
        error: error.message,
      });
    });
};

const cancelService = (req, res, next) => {
  Bookings.updateOne({ uuid: req.body.uuid }, { $set: { is_cancelled: 1, status: 4 } }).then((response) => {
    if (response.modifiedCount > 0) {
      res.json({ data: [], message: "Cancelled booking Successfully", error: "" });
    } else res.json({ data: [], message: "Error Occured cancelling the booking", error: "" });
  });
};

const feedbackService = (req, res, next) => {
  Bookings.updateOne({ uuid: req.body.uuid }, { $set: { feedback: req.body.feedback, rating: req.body.rating, status:5 } }).then((response) => {
    if (response.modifiedCount > 0) {
      res.json({ data: [], message: "Feedback Added Successfully", error: "" });
    } else res.json({ data: [], message: "Error Occured while adding feedback to booking", error: "" });
  });
};

const getServices = (req, res, next) => {
  //0 scheduled
  //1 assigned
  //2 completed
  //3 completed and paid -> option to give feedback
  //4 cancelled
  //5 feedback given

  //Scheduled Services - Status = 0,1,2 and Pay button is enabled for user if status is 2 which states that service is completed
  //Completed Services - Status = 3 , on this search user is given an option to give feedback
  //Cancelled Services - Status = 4
  Bookings.find({ user_uuid: req.body.user_uuid, status: { $in: req.body.status } })
    .then((response) => {
      if (response.length > 0) {
        res.json({ data: response, message: "", error: "" });
      } else {
        res.json({ data: response, message: "No bookings Found", error: "" });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const payForService = (req, res, next) => {
  Bookings.updateOne(
    { uuid: req.body.uuid },
    {
      $set: {
        status: 3,
        is_paid: 1,
      }
    }
  ).then((response) => {
    if (response.modifiedCount > 0) {
      res.json({
        data: [],
        message: "Service Paid Successfully",
        error: "",
      });
    } else
      res.json({
        data: [],
        message: "Error Occured Paying to The Service",
        error: "",
      });
  });
};

module.exports = {
  users,
  registerUser,
  user,
  updateUser,
  updateUserPassword,
  toggleUser,
  bookService,
  cancelService,
  feedbackService,
  getServices,
  payForService
};
