const express = require("express");
const db = require("./config/db");
const userRoutes = require("./routes/router");
const latLong = require("./routes/latitude");
const kml = require("./routes/kml");
// const { Sequelize, Op } = require("sequelize");
const multer = require("multer");
const shape = require("./routes/shapeRouter");
const cors = require("cors");
const Sequelize = require("sequelize");
const cookieParser = require("cookie-parser");

const fs = require("fs");
const csv = require("csv-parser");
const Kinnaur = require("./models/birdsData");
const { Op } = require("sequelize");
const { constants } = require("zlib");
const { compareSync } = require("bcrypt");
// const CustomReporter = require('./customReporter');

// new CustomReporter();


const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Set the allowed origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Set allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Set allowed headers
  res.setHeader("Access-Control-Allow-Credentials", true); // Enable credentials (if needed)
  next();
});

app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/latLong", latLong);
app.use("/kml", kml);
app.use("/shape", shape);

db.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
