const express = require("express");
const {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  getMe,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getUsers).post(registerUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/me/:id").post(getMe);

module.exports = router;
