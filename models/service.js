const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {
        uuid: { type: String, required: false },
        name: { type: String, required: true },
        description: { type: String, required: true },
        time: { type: String, required: true },
        cost: { type: Number, required: true },
        is_deleted: {type: Boolean, required: true, default: false}
    },
    { collection: "service", timestamps: true }
);
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;