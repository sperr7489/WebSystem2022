const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/bibliography", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = {
  connect,
};
