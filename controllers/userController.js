const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
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
  const { firstname, lastname, email, password } = req.body;
  //check fields
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //find user
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }

  // try {
  //   const user = await User.create(req.body);
  //   res.status(201).json(user);
  //   console.log("created");
  // } catch (error) {
  //   res.status(500).json(error);
  // }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials')
  }
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
