const express = require("express");
const {
  getConsultations,
  updateConsultation,
  createConsultation,
  deleteConsultation,
} = require("../controllers/consultationControllers");

const router = express.Router();

router.route("/").get(getConsultations).post(createConsultation);
router.route("/:id").put(updateConsultation).delete(deleteConsultation);

module.exports = router;
