const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingsSchema = new Schema(
  {
    uuid: { type: String, required: false },
    user_uuid: { type: String, required: true },
    status: { type: Number, required: true },
    staff_uuid: { type: String, required: false },

    service_uuid: { type: String, required: true },
    service_name: { type: String, required: true },
    service_cost: { type: Number, required: true },
    service_description: { type: String, required: true },
    service_date: { type: Date, required: true },
    service_address: { type: String, required: false },
    service_for_other: { type: Boolean, required: true, default: false },

    is_cancelled: { type: Boolean, required: true, default: false },
    is_paid: { type: Boolean, required: true, default: 0 },

    notes: { type: String, required: false },
    feedback: { type: String, required: false },
    rating: { type: Number, required: false },
  },
  { collection: "bookings", timestamps: true }
);
const Bookings = mongoose.model("Bookings", bookingsSchema);
module.exports = Bookings;
