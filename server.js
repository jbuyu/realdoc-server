const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/consultations", require("./routes/consultationRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//overridesd the default express errors
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is starting on port: ", port);
});
