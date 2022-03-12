const getConsultations = async (req, res) => {
  res.status(200).json({
    message: "Get consultations",
  });
};

const createConsultations = async (req, res) => {
  if (!require.body.message) {
    throw new Error("Please add a text field");
  }
};
const updateConsultations = async (req, res) => {
  res.status(200).json({
    message: "Update consultations",
  });
};
const deleteConsultations = async (req, res) => {
  res.status(200).json({
    message: "Delete consultations",
  });
};

module.exports = {
  getConsultations,
  createConsultations,
  updateConsultations,
  deleteConsultations,
};
