const mongoose = require("mongoose");
const validator = require("validator");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Employee Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email Id"],
  },
  mobileNo: {
    type: Number,
    required: [true, "Please Enter Employee Mobile No."],
    min: [1000000000, "Mobile No. must be at least 10 digits"],
    max: [9999999999, "Mobile No. can have at most 10 digits"],
  },
  designation: {
    type: String,
    required: [true, "Please Enter Employee Designation"],
  },
  gender: {
    type: String,
    required: [true, "Please Enter Employee Gender"],
  },
  course: { type: String, required: [true, "Please Enter Employee Course"] },
  imgpath: {
    type: String,
    required: [true, "Please Upload Employee Image"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
