import "../css/bookCard.css";
import { Link } from "react-router-dom";

export default function BookCard(props) {
  const { bookId, bookName, publish, author, deleteBook } = props;

  const deleteEvent = () => {
    deleteBook(bookId);
  };

  return (
    <div id="bookCard">
      <h3 id="bookName">{bookName}</h3>
      <h4 id="author">
        {author} 저 ({publish}년)
      </h4>
      <h4 id="bookId">서지 관리 ID : {bookId}</h4>

      <div className="cardLayer">
        <button onClick={deleteEvent} className="cardButton delete">
          삭제
        </button>
        <Link to={`/book/${bookId}`}>
          <button className="cardButton specific">자세히</button>
        </Link>
      </div>
    </div>
  );
}
