const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        uuid: { type: String, required: false },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        mobile: { type: String, required: true },
        email: { type: String, required: true },
        user_name: { type: String, required: true },
        gender: { type: String, required: true },
        password: { type: String, required: true },
        is_deleted: {type: Boolean, required: true, default: false}
    },
    { collection: "user", timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;