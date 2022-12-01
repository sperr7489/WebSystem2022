import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../css/bookInfo.css";
import axios from "axios";
export default function BookInfo() {
  let { bookId } = useParams();

  const [bookInfo, setBookInfo] = useState({
    bookName: "",
    author: "",
    publish: "",
    summary: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3030/book/${bookId}`);
      const { result: book } = data;
      setBookInfo({ ...book });
    };
    fetchData();
  }, []);

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
