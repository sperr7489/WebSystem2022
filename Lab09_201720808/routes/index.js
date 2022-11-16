var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("test 이것은 왜 안될까/?");
});

module.exports = router;
