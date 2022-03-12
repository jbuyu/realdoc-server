const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    throw new Error("Users not Found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    throw new Error("User not found");
  }
});
const getMe = asyncHandler(async (req, res) => {
  res.send({
    message: "Found me",
  });
});

const registerUser = asyncHandler(async (req, res) => {
  let userEmail = req.body.email;
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
    console.log("created");
  } catch (error) {
    res.status(500).json(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Login user",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    console.log("none");
    res.status(400);
    throw new Error("User not found");
  }
  await user.findOneAndRemove();
  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  getMe,
};
