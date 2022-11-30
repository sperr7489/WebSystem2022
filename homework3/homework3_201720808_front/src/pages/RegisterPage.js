import { useState } from "react";
import "../css/registerPage.css";

export default function RegisterPage() {
  const [inputs, setInputs] = useState({
    bookName: "",
    bookIntro: "",
    publish: "",
    author: "",
  });

  const { bookName, bookIntro, publish, author } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, id } = e.target; // 우선 e.target 에서 id 과 value 를 추출
    console.log("[id] : ", [id]);
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [id]: value, // id 키를 가진 값을 value 로 설정
    });
  };

  return (
    <div>
      <h2 className="bookDetailInfo">새로운 책 등록</h2>
      <div className="bookDetailInfo">
        <label htmlFor="bookName">
          <span>* </span>책이름
        </label>
        <input
          type="text"
          className="txt-input"
          id="bookName"
          placeholder="책 이름을 입력해주세요"
          value={bookName}
          onChange={onChange}
        />
      </div>

      <div className="bookDetailInfo">
        <label htmlFor="bookIntro">
          <span>* </span>책 한 줄 소개
        </label>
        <input
          type="text"
          className="txt-input"
          id="bookIntro"
          placeholder="이 책의 간단한 내용을 입력해주세요"
          value={bookIntro}
          onChange={onChange}
        />
      </div>

      <div className="bookDetailInfo">
        <label htmlFor="publish">
          <span>* </span>출간 연도
        </label>
        <input
          type="text"
          className="txt-input"
          id="publish"
          placeholder="출간 연도를 입력하세요"
          value={publish}
          onChange={onChange}
        />
      </div>
      <div className="bookDetailInfo">
        <label htmlFor="author">
          <span>* </span>저자
        </label>
        <input
          type="text"
          className="txt-input"
          id="author"
          placeholder="저자를 입력하세요"
          value={author}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
// const [inputs, setInputs] = useState({
//   bookName: "",
//   bookIntro: "",
//   publish: "",
//   author: "",
// });

// const { bookName, bookIntro, publish, author } = inputs; // 비구조화 할당을 통해 값 추출

// const onChange = (e) => {
//   const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
//   console.log("value : ", value);
//   console.log("test");
//   setInputs({
//     ...inputs, // 기존의 input 객체를 복사한 뒤
//     [name]: value, // name 키를 가진 값을 value 로 설정
//   });
// };
