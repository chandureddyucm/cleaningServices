const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");

const users = (req, res, next) => {
    User.find().then(response => {
        if (response.length > 0) {
            res.json({ "data": response, "message": "", "error": "" })
        }
        else {
            res.json({ "data": response, "message": "No Users Found", "error": "" })
        }
    }).catch(error => {
        res.json({ "data": [], "message": "An Error Occured", "error": error.message })
    })
}

const user = (req, res, next) => {
    User.find({ email: req.body.email, password: req.body.password,  is_active: false}).then(response => {
        if (response.length > 0) {
            res.json({ "data": response, "message": "", "error": ""})
        }
        else {
            res.json({ "data": response, "message": "No User Found", "error": "" })
        }
    }).catch(error => {
        res.json({ "data": [], "message": "An Error Occured", "error": error.message })
    })
}

const registerUser = (req, res, next) => {
    User.find().then(response => {
        const emails = response.map(x => x.email);
        const mobiles = response.map(x => x.mobile);
        if (response.length > 0 && emails.includes(req.body.email))
            res.json({ "data": [], "message": "Email Already Registered!", "error": "" })
        else if (response.length > 0 && mobiles.includes(req.body.mobile))
            res.json({ "data": [], "message": "Mobile Already Registered!", "error": "" })
        else {
            let new_user = new User({
                uuid: uuidv4(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                mobile: req.body.mobile,
                email: req.body.email,
                user_name: req.body.user_name,
                gender: req.body.gender,
                password: req.body.password
            });
            new_user.save().then(response => {
                res.json({ "data": [], "message": "User Added", "error": "" })
            }).catch(error => {
                res.json({ "data": [], "message": "An Error Occured", "error": error.message })
            });
        }
    }).catch(error => {
        res.json({ "data": [], "message": "An Error Occured", "error": error.message })
    })
}

const updateUser = (req, res, next)=>{
    User.updateOne({uuid: req.body.uuid}, {$set:{first_name : req.body.first_name, last_name : req.body.last_name, mobile : req.body.mobile}}).then(response=>{
        if (response.modifiedCount > 0) {
            User.find({uuid: req.body.uuid}).then(response1=>{
                if (response1.length > 0) res.json({ data: response1, message: "User Details Updated Successfully", "error": "" });
                else res.json({ data: [], message: "User not found", "error": "" });
            })
        }
        else res.json({ data: [], message: "Error Occured Updating The User Details", "error": "" });
    })
}

const updateUserPassword = (req, res, next)=>{
    User.updateOne({uuid: req.body.uuid}, {$set:{ password : req.body.password}}).then(response=>{
        if (response.modifiedCount > 0) res.json({ data: [], message: "User Password Updated Successfully", "error": "" });
        else res.json({ data: [], message: "Error Occured Updating The User Password", "error": "" });
    })
}

const toggleUser = (req, res, next)=>{
    User.updateOne({uuid: req.body.uuid}, {$set:{ is_active : req.body.is_active}}).then(response=>{
        if (response.modifiedCount > 0) {
            let status = !req.body.is_active ? "Enabled": "Disabled";
            res.json({ data: [], message: "User " +status+ " Successfully", "error": "" });
        }
        else res.json({ data: [], message: "Error Occured Updating The User Status", "error": "" });
    })
  }

module.exports = {
    users, registerUser, user, updateUser, updateUserPassword, toggleUser
}