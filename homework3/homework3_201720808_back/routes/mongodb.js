const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/homework3_201720808", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = {
  connect,
};
