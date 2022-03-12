const express = require("express");
const { errorHanlder } = require("./middleware/errorMiddleware");

const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/consultations", require("./routes/consultationRoutes"));

//overridesd the default express errors
app.use(errorHanlder);

app.listen(port, () => {
  console.log("Server is starting on port: ", port);
});
