const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email Id"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password must have 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashPassword
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = crypto
    .createHash("sha256")
    .update(this.password)
    .digest("hex");
});

// JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  enteredPassword = crypto
    .createHash("sha256")
    .update(enteredPassword)
    .digest("hex");

  return enteredPassword === this.password;
};

module.exports = mongoose.model("User", userSchema);
