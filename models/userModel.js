const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Provide your username"],
  },
  password: {
    type: String,
    required: [true, "Provide your password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
