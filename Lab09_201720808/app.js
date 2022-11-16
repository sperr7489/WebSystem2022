var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const db = require("./routes/mongodb");
const indexRouter = require("./routes/index");
const studentRouter = require("./routes/students");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// db.connect();

app.use("/", indexRouter);
app.use("/student", studentRouter);

app.listen(3000, () => {
  console.log("3000 포트에서 서버가 열려있음");
});

module.exports = app;
