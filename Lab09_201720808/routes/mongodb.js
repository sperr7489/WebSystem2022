const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/test_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = {
  connect,
};
