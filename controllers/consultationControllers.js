const asyncHandler = require("express-async-handler");
const Consultation = require("../models/consultationModel");
const twilio = require("twilio");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const getConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find();
  res.status(200).send(consultations);
});

const getConsultation = asyncHandler(async (req, res) => {
  const consultationId = req.params.id;
  try {
    const consultation = await Consultation.find({ _id: consultationId });
    res.status(200).send(consultation[0]);
  } catch (error) {
    throw new Error("Consultation not found");
  }
});

const getDoctorConsultations = asyncHandler(async (req, res) => {
  try {
    const consultations = await Consultation.find({ user: req.user.id });
    res.status(200).send(consultations);
  } catch (error) {
    throw new Error("Consultation not found");
  }
});

//pending consultations
const getPendingConsultations = asyncHandler(async (req, res) => {
  try {
    const consultations = await Consultation.find({ status: "Pending" });
    res.status(200).send(consultations);
  } catch (error) {
    throw new Error("Consultation not found");
  }
});

//completed consultations
const getCompletedConsultations = asyncHandler(async (req, res) => {
  try {
    const consultations = await Consultation.find({ status: "Completed" });
    res.status(200).send(consultations);
  } catch (error) {
    throw new Error("Consultation not found");
  }
});

const createConsultation = asyncHandler(async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);

    let { firstName, lastName, symptoms, consulationType } = consultation;
    let smsData = {
      firstName,
      lastName,
      symptoms,
      consulationType,
    };
    let stringedData = JSON.stringify(smsData);

    //messaging
    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        to: process.env.TWILIO_TO,
        from: process.env.TWILIO_FROM,
        body: stringedData,
      })
      .then((message) => console.log(`Message SID ${message.sid}`))
      .catch((error) => console.error(error));
  } catch (error) {
    console.log("error", error);
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
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  // if (consultation.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
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
  getConsultation,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  getDoctorConsultations,
  getPendingConsultations,
  getCompletedConsultations,
};
