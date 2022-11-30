const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
    unique: true,
  },
  koreanName: String,
  englishName: String,
  department: String,

  photoUrl: String,
  // 실습 문서 포스트만 출력 결과를 보면 createdAt도 함께 출력이 되더라구요?
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
