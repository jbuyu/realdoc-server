const express = require("express");
const {
  getConsultations,
  updateConsultation,
  createConsultation,
  deleteConsultation,
  getDoctorConsultations,
} = require("../controllers/consultationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getConsultations)
  .post(createConsultation);
router
  .route("/:id")
  .put(protect, updateConsultation)
  .delete(protect, deleteConsultation);

router.route("/doctor-consultations").get(protect, getDoctorConsultations);

module.exports = router;
