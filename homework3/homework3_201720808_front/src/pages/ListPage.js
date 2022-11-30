import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import "../css/listPage.css";

export default function ListPage() {
  const [bookList, setBookList] = useState([]);

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    axios.get("http://localhost:3030/book/all").then((response) => {
      const { result } = response.data;
      setBookList(result);
    });
  }, []);

  return (
    <div>
      <div id="pannel">
        <h2>화면 조작 패널</h2>
        <span style={{ fontWeight: "bold" }}>
          현재 등록되어 있는 서지 정보는 4개입니다.
        </span>
        <br />
        <span style={{ fontSize: 25 }}>특정 연도만 확인하기</span>

        <div>
          <label for="test"></label>
          <input
            id="test"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          My Value
        </div>
      </div>

      <div id="BookCardList">
        {bookList.map((val, i) => (
          <BookCard
            key={i}
            bookId={val.bookId}
            bookName={val.bookName}
            publish={val.publish}
            author={val.author}
          />
        ))}
      </div>
    </div>
  );
}
