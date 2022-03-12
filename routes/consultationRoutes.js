const express = require("express");
const {
  getConsultations,
  updateConsultations,
  createConsultations,
  deleteConsultations,
} = require("../controllers/consultationControllers");

const router = express.Router();

router.route("/").get(getConsultations).post(createConsultations);
router.route("/id").put(updateConsultations).delete(deleteConsultations);

module.exports = router;
