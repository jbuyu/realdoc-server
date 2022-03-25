const mongoose = require("mongoose");

const ConsultationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    phoneNo: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 60,
    },
    gender: {
      type: String,
      required: true,
      maxlength: 60,
    },
    dateOfBirth: {
      type: String,
      required: true,
      maxlength: 60,
    },
    symptoms: {
      type: String,
      required: true,
    },
    consultationType: {
      type: String,
      required: true,
      maxlength: 40,
    },
    status: {
      type: String,
      default: "Pending",
    },
    diagnosis: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Consultation", ConsultationSchema);
