const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    res.status(422).json({
      status: "Fail",
      message: "Please add all fields",
    });
  }

  const cekUsername = await User.findOne({ username });
  if (cekUsername) {
    res.status(422).json({
      status: "Fail",
      message: "Username already exsits",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    username,
    password: passwordHash,
  });
  const saveUser = await newUser.save();
  createSendToken(saveUser, 201, req, res);
});

exports.signIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({
      status: "Fail",
      message: "Please provide username and password",
    });
  }

  const savedUser = await User.findOne({ username }).select("-_id");
  if (!savedUser) {
    return res.status(404).json({
      status: "Fail",
      message: "User not found",
    });
  }

  const checkPassword = await bcrypt.compare(password, savedUser.password);
  if (checkPassword) {
    createSendToken(savedUser, 201, req, res);
  } else {
    res.status(422).json({
      status: "Fail",
      message: "Invalid username or password",
    });
  }
});

exports.requireLogin = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      status: "Fail",
      message: "You must be signed in!",
    });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.status(401).json({
        status: "Fail",
        message: "You must be signed in",
      });
    }
    const { id } = payload;
    const userData = await User.findById(id);
    req.user = userData;
    next();
  });
});
