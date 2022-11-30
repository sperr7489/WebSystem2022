var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const db = require("./mongodb");
const bookModel = require("../models/book");
const resStatus = require("../config/baseResponseStatus");
const { basicResponse, resultResponse } = require("../config/response");
const book = require("../models/book");

let randomBookId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

// const db = mongoose.connection;

// GET /book : 라우터에 대해서 DB가 연결이 되었는지 확인하는 것.
router.get("/", async (req, res) => {
  db.connect()
    .then(() => {
      res.status(200).send(basicResponse(resStatus.DB_CONNECTED));
    })
    .catch(() => {
      res.status(500).send(basicResponse(resStatus.DB_NOT_CONNECTED));
    });
});

// GET /book/all 모든 책의 데이터를 가져오기
router.get("/all", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send(basicResponse(resStatus.DB_NOT_CONNECTED));
  });
  try {
    const result = await bookModel.find({});
    // console.log(result); result는 배열 형태로 반환된다.
    const booksResult = [];
    result.map((v, i) => {
      const bookInfo = {
        bookId: v.bookId,
        bookName: v.bookName,
        publish: v.publish,
        author: v.author,
      };

      booksResult.push(bookInfo);
    });

    return res.status(200).send(resultResponse(resStatus.SUCCESS, booksResult));
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(resultResponse(DB_ERROR, error.message));
  }
});

// GET /book/:bookId 특정 책의 정보 확인
router.get("/:bookId", async (req, res) => {
  db.connect().catch(() => {
    return res.status(500).send(basicResponse(resStatus.DB_NOT_CONNECTED));
  });
  try {
    const { bookId } = req.params;
    const [result] = await bookModel.find({ bookId: bookId });

    if (!result) {
      return res.status(500).send(basicResponse(resStatus.NOT_EXIST_BOOK));
    }
    return res.status(200).send(resultResponse(resStatus.SUCCESS, result));
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .send(resultResponse(resStatus.DB_ERROR, error.message));
  }
});

// POST /book : 책 1개의 데이터를 생성하여 DB에 저장한다.
router.post("/", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send(basicResponse(resStatus.DB_NOT_CONNECTED));
  });
  try {
    // 1000~9999 까지의 랜덤한 숫자
    // let bookId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    let bookExist = true; // 존재한다고 가정
    let bookId;
    do {
      bookId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      bookExist = (await bookModel.find({ bookId: bookId }))[0];
      console.log("bookExist : ", bookExist);
    } while (bookExist);

    console.log("빠져나온다.");
    const { bookName, summary, publish, author } = req.body;
    if (isNaN(publish))
      // 숫자가 아니면 true를 반환한다.
      return res.status(400).send("연도는 숫자만 입력되어야 합니다.");

    const book = new bookModel({
      bookId: bookId,
      bookName: bookName,
      summary: summary,
      publish: publish,
      author: author,
    });

    const result = await book.save();

    return res.status(200).send(resultResponse(resStatus.SUCCESS, result));
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate")) {
      return res.status(400).send(basicResponse(resStatus.BOOK_DUPLICATED));
    } else {
      if (error.message.includes("required")) {
        return res.status(400).send(basicResponse(resStatus.EMPTY_DATA));
      }
    }
  }
});

// delete /book/:bookId  특정 학번을 가진 책의 데이터를 삭제하는 것.
router.delete("/:bookId", async (req, res) => {
  // db 연결
  db.connect().catch(() => {
    return res.status(500).send(basicResponse(resStatus.DB_NOT_CONNECTED));
  });
  try {
    const { bookId } = req.params;
    const result = await bookModel.deleteOne({ id: bookId });

    // const result = bookModel.({ bookId: bookId });
    if (result.deletedCount == 0) {
      return res.status(500).send(basicResponse(resStatus.NOT_EXIST_BOOK));
    }
    return res.status(200).send(basicResponse(resStatus.SUCCESS));
  } catch (error) {
    return res.status(500).send(basicResponse(resStatus.DELETE_ERROR));
  }
});

module.exports = router;
