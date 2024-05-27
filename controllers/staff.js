const { v4: uuidv4 } = require("uuid");
const Staff = require("../models/staff");
const Bookings = require("../models/bookings");

const staffs = (req, res, next) => {
  Staff.find()
    .then((response) => {
      if (response.length > 0) {
        res.json({ data: response, message: "", error: "" });
      } else {
        res.json({ data: response, message: "No Staffs Found", error: "" });
      }
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const staff = (req, res, next) => {
  Staff.find({ email: req.body.email, password: req.body.password, is_active: true })
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

const registerStaff = (req, res, next) => {
  Staff.find()
    .then((response) => {
      const emails = response.map((x) => x.email);
      const mobiles = response.map((x) => x.mobile);
      if (response.length > 0 && emails.includes(req.body.email)) res.json({ data: [], message: "Email Already Registered!", error: "" });
      else if (response.length > 0 && mobiles.includes(req.body.mobile)) res.json({ data: [], message: "Mobile Already Registered!", error: "" });
      else {
        let new_staff = new Staff({
          uuid: uuidv4(),
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          mobile: req.body.mobile,
          email: req.body.email,
          user_name: req.body.user_name,
          gender: req.body.gender,
          password: req.body.password,
        });
        new_staff
          .save()
          .then((response) => {
            res.json({ data: [], message: "Staff Added", error: "" });
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

const updateStaff = (req, res, next) => {
  Staff.updateOne(
    { uuid: req.body.uuid },
    { $set: { first_name: req.body.first_name, last_name: req.body.last_name, mobile: req.body.mobile } }
  ).then((response) => {
    if (response.modifiedCount > 0) {
      Staff.find({ uuid: req.body.uuid }).then((response1) => {
        if (response1.length > 0) res.json({ data: response1, message: "Staff Details Updated Successfully", error: "" });
        else res.json({ data: [], message: "Staff not found", error: "" });
      });
    } else res.json({ data: [], message: "Error Occured Updating The Staff Details", error: "" });
  });
};

const updateStaffPassword = (req, res, next) => {
  Staff.updateOne({ uuid: req.body.uuid }, { $set: { password: req.body.password } }).then((response) => {
    if (response.modifiedCount > 0) res.json({ data: [], message: "Staff Password Updated Successfully", error: "" });
    else res.json({ data: [], message: "Error Occured Updating The Staff Password", error: "" });
  });
};

const toggleStaff = (req, res, next) => {
  Staff.updateOne({ uuid: req.body.uuid }, { $set: { is_active: req.body.is_active } }).then((response) => {
    if (response.modifiedCount > 0) {
      let status = req.body.is_active ? "Enabled" : "Disabled";
      res.json({ data: [], message: "Staff " + status + " Successfully", error: "" });
    } else res.json({ data: [], message: "Error Occured Updating The Staff Status", error: "" });
  });
};

const getServices = (req, res, next) => {
  Bookings.find({ status: { $in: [0] } })
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

const getAssignedServices = (req, res, next) => {
  //get assigned-1, completed-2 bookings
  //Scheduled Services - Status = 0,1,2 and Pay button is enabled for user if status is 2 which states that service is completed
  //Completed Services - Status = 3 , on this search user is given an option to give feedback
  //Cancelled Services - Status = 4
  Bookings.find({ staff_uuid: req.body.staff_uuid, status: { $in: req.body.status } })
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

const assignService = (req, res, next) => {
  Bookings.updateOne({ uuid: req.body.uuid }, { $set: { status: 1, staff_uuid: req.body.staff_uuid } })
    .then((response) => {
      res.json({ data: response, message: "Service assigned to staff successfully", error: "" });
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

const completeService = (req, res, next) => {
  Bookings.updateOne({ uuid: req.body.uuid }, { $set: { status: 2 } })
    .then((response) => {
      res.json({ data: response, message: "Service completed by staff successfully", error: "" });
    })
    .catch((error) => {
      res.json({ data: [], message: "An Error Occured", error: error.message });
    });
};

module.exports = {
  staffs,
  registerStaff,
  staff,
  updateStaff,
  updateStaffPassword,
  toggleStaff,
  assignService,
  completeService,
  getServices,
  getAssignedServices,
};
