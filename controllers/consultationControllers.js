const asyncHandler = require("express-async-handler");
const Consultation = require("../models/consultationModel");

const getConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find();
  res.status(200).send(consultations);
});

const getDoctorConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find({ user: req.user.id });
  res.status(200).send(consultations);
});

const createConsultation = asyncHandler(async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
    console.log("created");
  } catch (error) {
    res.status(500).json(error);
  }
});

const updateConsultation = asyncHandler(async (req, res) => {
  const consultation = Consultation.findById(req.params.id);
  if (!consultation) {
    res.status(400);
    throw new Error("Consultation not found");
  }

   // Check for user
   if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (consultation.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const updatedConsultation = await Consultation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedConsultation);
});

const deleteConsultation = asyncHandler(async (req, res) => {
  const consultation = Consultation.findById(req.params.id);
  if (!consultation) {
    console.log("none");
    res.status(400);
    throw new Error("Consultation not found");
  }
  await consultation.findOneAndRemove();
  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getConsultations,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  getDoctorConsultations
};
