module.exports = {
  //성공
  SUCCESS: { isSuccess: true, status: 200, message: "성공" }, //조회

  SUCCESS_BOOK_REGISTER: {
    isSuccess: true,
    status: 200,
    message: "책 등록에 성공하였습니다.",
  },

  SUCCESS_BOOK_DELETE: {
    isSuccess: true,
    status: 200,
    message: "책 삭제에 성공하였습니다.",
  },
  DB_CONNECTED: {
    isSuccess: true,
    status: 200,
    message: "데이터 베이스에 성공적으로 연결되었다. ",
  }, //조회

  BOOK_DUPLICATED: {
    isSuccess: false,
    status: 400,
    message: "책이름이 중복되었다.",
  },

  EMPTY_DATA: {
    isSuccess: false,
    status: 400,
    message: "책 한 줄 소개를 제외하고는 반드시 전부 입력하세요",
  },

  PUBLISH_MUST_NUM: {
    isSuccess: false,
    status: 400,
    message: "연도는 숫자만 입력되어야 합니다.",
  },

  NOT_EXIST_BOOK: {
    isSuccess: false,
    status: 500,
    message: "해당 책은 디비에 존재하지 않는 책입니다. ",
  },
  DELETE_ERROR: { isSuccess: false, status: 500, message: "책 삭제 실패" },
  DB_ERROR: { isSuccess: false, status: 500, message: "데이터 베이스 에러" },
  DB_NOT_CONNECTED: {
    isSuccess: false,
    status: 500,
    message: "데이터 베이스가 연결되어 있지 않다. ",
  },
};
