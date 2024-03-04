const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");

// routes import
const user = require("./routes/userRoute");
const employee = require("./routes/employeeRoute");

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "src", "assets")));

app.use("/api/v1", user);
app.use("/api/v1", employee);
module.exports = app;
