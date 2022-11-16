var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const db = require("./mongodb");
const studentModel = require("../models/student");

// const db = mongoose.connection;

// GET /student : 라우터에 대해서 DB가 연결이 되었는지 확인하는 것.
router.get("/", async (req, res) => {
  db.connect()
    .then(() => {
      res.send("DB is connected");
    })
    .catch(() => {
      res.send("DB is unconnected");
    });
});

// GET /student/all 모든 학생의 데이터를 가져오기
router.get("/all", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send("DB가 연결되어 있지 않다. ");
  });
  try {
    const result = await studentModel.find({});
    return res.send(result);
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});

// GET /student/:studentId 특정 학생의 정보 확인
router.get("/:studentId", async (req, res) => {
  db.connect().catch(() => {
    return res.status(500).send("DB가 연결되어 있지 않다. ");
  });
  try {
    const { studentId } = req.params;
    const [result] = await studentModel.find({ studentId: studentId });
    if (!result) {
      return res.status(404).send("데이터가 존재하지 않는다. ");
    }
    return res.send(result);
  } catch (error) {
    console.log(error.message);
    return res.send(error.message);
  }
});
// POST /student : 학생 1개의 데이터를 생성하여 DB에 저장한다.
router.post("/", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send("DB가 연결되어 있지 않다. ");
  });
  try {
    const { studentId, score, name } = req.body;
    const student = new studentModel({
      studentId: studentId,
      score: score,
      name: name,
    });

    const result = await student.save();

    return res.send(result);
  } catch (error) {
    if (error.message.includes("duplicate")) {
      return res.status(400).send("학번이 중복되었다. ");
    } else if (error.message.includes("required")) {
      return res.status(400).send("학번이 입력되지 않았다.");
    } else {
      return res.status(500).send("DB 에러 발생");
    }
    // if (error == "MongooseError") res.status(500);
  }
});

// PUT /student/:studentId  특정 학번을 가진 학생의 데이터를 갱신하는 것.
router.put("/:studentId", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send("DB가 연결되어 있지 않다. ");
  });
  try {
    const { studentId } = req.params;

    if (!studentId) {
      //학번이 존재하지 않는다면?
      return res.status(400).send("학번이 지정되지 않았습니다. ");
    }
    const body = req.body;
    const updateResult = await studentModel.updateOne(
      { studentId: studentId },
      { score: body.score, name: body.name }
    );
    const { matchedCount } = updateResult;
    if (matchedCount == 0) {
      return res
        .status(404)
        .send(" 해당 학번에 대한 데이터가 존재하지 않는다. ");
    }
    if (body.studentId) {
      // 학번이 바디에 있다면?
      return res.status(400).send("학번은 변경할 수 없습니다. ");
    }

    const [result] = await studentModel.find({ studentId: studentId });

    return res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:studentId", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send("DB가 연결되어 있지 않다. ");
  });
  try {
    const { studentId } = req.params;

    const result = await studentModel.deleteOne({ studentId: studentId });
    // const result = studentModel.({ studentId: studentId });
    if (result.deletedCount == 0) {
      return res.status(404).send("해당학번의 데이터가 없다. ");
    }

    return res.send("success");
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
