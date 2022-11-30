const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/student", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = {
  connect,
};
