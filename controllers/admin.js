const { v4: uuidv4 } = require("uuid");
const Admin = require("../models/admin");
const User = require("../models/user");
const Staff = require("../models/staff");
const Service = require("../models/service");
const Bookings = require("../models/bookings");

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
    is_deleted: false,
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
      if (response.length > 0 && emails.includes(req.body.email)) res.json({ data: [], message: "Email Already Registered!", error: "" });
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
  Admin.updateOne({ uuid: req.body.uuid }, { $set: { password: req.body.password } }).then((response) => {
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

const toggleUser = (req, res, next) => {
  User.updateOne({ uuid: req.body.uuid }, { $set: { is_deleted: req.body.is_deleted } }).then((response) => {
    if (response.modifiedCount > 0) {
      let status = !req.body.is_deleted ? "Enabled" : "Disabled";
      res.json({ data: [], message: "User " + status + " Successfully", Error: "", status: 200 });
    } else res.json({ data: [], message: "Error Occured Updating The User Status", Error: "", status: 200 });
  });
};

const toggleStaff = (req, res, next) => {
  Staff.updateOne({ uuid: req.body.uuid }, { $set: { is_deleted: req.body.is_deleted } }).then((response) => {
    if (response.modifiedCount > 0) {
      let status = !req.body.is_deleted ? "Enabled" : "Disabled";
      res.json({ data: [], message: "Staff " + status + " Successfully", Error: "", status: 200 });
    } else res.json({ data: [], message: "Error Occured Updating The Staff Status", Error: "", status: 200 });
  });
};

const addService = (req, res, next) => {
  let new_service = new Service({
    uuid: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    time: req.body.time,
  });
  new_service
    .save()
    .then((response) => {
      res.json({ data: [], message: "Service Added Successfully", error: "" });
    })
    .catch((error) => {
      res.json({
        data: [],
        message: "An Error Occured Adding the service",
        error: error.message,
      });
    });
};

const modifyService = (req, res, next) => {
  Service.updateOne(
    { uuid: req.body.uuid },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        time: req.body.time,
      },
    }
  ).then((response) => {
    if (response.modifiedCount > 0) {
      res.json({
        data: [],
        message: "Service Details Updated Successfully",
        error: "",
      });
    } else
      res.json({
        data: [],
        message: "Error Occured Updating The Service Details",
        error: "",
      });
  });
};

const toggleService = (req, res, next) => {
  Service.updateOne({ uuid: req.body.uuid }, { $set: { is_deleted: req.body.is_deleted } }).then((response) => {
    if (response.modifiedCount > 0) {
      let status = !req.body.is_deleted ? "Enabled" : "Disabled";
      res.json({ data: [], message: "Service " + status + " Successfully", Error: "", status: 200 });
    } else res.json({ data: [], message: "Error Occured Updating The Service Status", Error: "", status: 200 });
  });
};

const viewServices = (req, res, next) => {
  Service.find().then((response) => {
    if (response.length > 0) {
      res.json({ data: response, message: "", error: "" });
    } else {
      res.json({ data: response, message: "No Services Found", error: "" });
    }
  });
};

const staffReport = (req, res, next) => {
  const aggregateQuery = [
    {
      $lookup: {
        from: "staff",
        localField: "staff_uuid",
        foreignField: "uuid",
        as: "staff",
      },
    },
    {
      $group: {
        _id: "$staff_uuid",
        user_name: { $first: "$staff.user_name" },
        mobile: { $first: "$staff.mobile" },
        numAvailableServices: {
          $sum: {
            $cond: [{ $eq: ["$status", 0] }, 1, 0],
          },
        },
        numAssignedServices: {
          $sum: {
            $cond: [{ $eq: ["$status", 1] }, 1, 0],
          },
        },
        numCompletedServices: {
          $sum: {
            $cond: [{ $eq: ["$status", 5] }, 1, 0],
          },
        },
        moneyEarned: {
          $sum: {
            $cond: [{ $eq: ["$status", 5] }, "$service_cost", 0],
          },
        },
      },
    },
  ];

  Bookings.aggregate(aggregateQuery)
    .then((response) => {
      if (response.length > 0) {
        res.json({ data: response, message: "", error: "" });
      } else {
        res.json({ data: response, message: "No Staff Found", error: "" });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const userReport = (req, res, next) => {
  const aggregateQuery = [
    {
      $lookup: {
        from: "user",
        localField: "user_uuid",
        foreignField: "uuid",
        as: "user",
      },
    },
    {
      $group: {
        _id: "$user_uuid",
        user_name: { $first: "$user.user_name" },
        mobile: { $first: "$user.mobile" },
        numScheduledServices: {
          $sum: {
            $cond: [{ $eq: ["$status", 0] }, 1, 0],
          },
        },
        numCancelledServices: {
          $sum: {
            $cond: [{ $eq: ["$status", 4] }, 1, 0],
          },
        },
        numCompletedServices: {
          $sum: {
            $cond: [{ $eq: ["$status", 5] }, 1, 0],
          },
        },
        moneySpent: {
          $sum: {
            $cond: [{ $eq: ["$status", 5] }, "$service_cost", 0],
          },
        },
      },
    },
  ];

  Bookings.aggregate(aggregateQuery)
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

module.exports = {
  admins,
  registerAdmin,
  admin,
  updateAdmin,
  updateAdminPassword,
  toggleUser,
  toggleStaff,
  addService,
  modifyService,
  toggleService,
  viewServices,
  staffReport,
  userReport
};
