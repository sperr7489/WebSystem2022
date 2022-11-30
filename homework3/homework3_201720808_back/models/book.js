const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // 뭐하나라도 빠지면 안되기 때문에 required로 설정해둔다.
  bookId: { type: Number, required: true },
  bookName: { type: String, required: true },
  publish: { type: String, required: true },
  author: { type: String, required: true },
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("book", bookSchema);
