const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    uuid: { type: String, required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    user_name: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    is_deleted: { type: Boolean, required: true, default: true },
  },
  { collection: "admin", timestamps: true }
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
