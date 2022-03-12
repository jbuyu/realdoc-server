const asyncHandler = require("express-async-handler");

const getConsultations = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get consultations",
  });
});

const createConsultations = asyncHandler(async (req, res) => {
  if (!require.body.message) {
    throw new Error("Please add a text field");
  }
});
const updateConsultations = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Update consultations",
  });
});
const deleteConsultations = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Delete consultations",
  });
});

module.exports = {
  getConsultations,
  createConsultations,
  updateConsultations,
  deleteConsultations,
};
