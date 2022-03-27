const express = require("express");
const {
  getConsultations,
  updateConsultation,
  createConsultation,
  deleteConsultation,
  getDoctorConsultations,
  getConsultation,
  getPendingConsultations,
  getCompletedConsultations,
} = require("../controllers/consultationControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getConsultations).post(createConsultation);
router.route("/pending").get(protect, getPendingConsultations);
router.route("/completed").get(protect, getCompletedConsultations);
router.route("/doctor-consultations").get(protect, getDoctorConsultations);

router
  .route("/:id")
  .get(protect, getConsultation)
  .put(protect, updateConsultation)
  .delete(protect, deleteConsultation);


module.exports = router;
