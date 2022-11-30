import { useState } from "react";
import { useParams } from "react-router";
import "../css/bookInfo.css";

export default function BookInfo() {
  let { bookId } = useParams();

  const [bookInfo, setBookInfo] = useState({
    bookName: "기창이 일대기",
    author: "감기창",
    publish: "2022",
    summary: "김기창의 성공신화를 그려낸 이야기",
  });

  const { bookName, author, publish, summary } = bookInfo;

  return (
    <div id="bookInfo">
      <h3 id="title">{bookName}</h3>
      <div id="author_Year">
        <ul>
          <li>저자 : {author}</li>
          <li>출간년도 : {publish} </li>
        </ul>
      </div>
      <h3> 소개글 </h3>
      <span> {summary} </span>
      <span id="reference">
        {author}, {bookName} {publish}
      </span>
    </div>
  );
}
