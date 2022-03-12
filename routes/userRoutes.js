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
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getUsers).post(registerUser);
router.route("/me").get(protect, getMe);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);

module.exports = router;
