import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import "../css/listPage.css";
import CheckBox from "../components/CheckBox";
import Loading from "../components/Loading";

export default function ListPage() {
  const [loading, setLoading] = useState(false);

  const [bookList, setBookList] = useState([]);
  const [publishList, setPublishList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);

  const [booksLength, setBooksLength] = useState();

  const sort = (arr) => {
    arr.sort(function (a, b) {
      if (a > b) return 1;
      if (a === b) return 0;
      if (a < b) return -1;
    });
  };

  useEffect(() => {
    // axios.get("http://localhost:3030/book/all").then((response) => {
    //   const { result } = response.data;
    //   setBookList(result);
    // });
    const fetchData = async () => {
      setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기

      try {
        const { data } = await axios.get("http://localhost:3030/book/all");
        const { result } = data;
        const yearList = result.map((val) => val.publish);
        const uniqueArr = yearList.filter((element, index) => {
          return yearList.indexOf(element) === index;
        });
        sort(uniqueArr);
        setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        setPublishList(uniqueArr);
        setVisibleList(uniqueArr);
        setBookList(result);
        setBooksLength(result.length);
      } catch (err) {
        const { message } = err;
        const { data, status } = err.response;
        window.alert(message + "\n" + data.message);
      }
    };
    fetchData();
    // 실행함으로써 데이타를 fetching합니다.
  }, [booksLength]);

  const togglePublish = (data) => {
    if (data.checked) {
      //true라면 추가를 해주고
      const list = [...visibleList, data.publish];
      sort(list);
      setVisibleList(list);
    } else {
      //false라면 삭제를 한다.
      let filtered = visibleList.filter((element) => element !== data.publish);
      sort(filtered);
      setVisibleList([...filtered]);
    }
  };

  const deleteBook = (_bookId) => {
    setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기

    axios
      .delete(`http://localhost:3030/book/${_bookId}`)
      .then((val) => {
        setLoading(false);
        const { data } = val;
        window.alert(data.message);
        setBooksLength((prev) => prev - 1);
      })
      .catch((err) => {
        const { message } = err;
        const { data, status } = err.response;
        window.alert(message + "\n" + data.message);
      });
  };

  return (
    <div>
      {loading ? <Loading /> : null}

      <div id="pannel">
        <h2>화면 조작 패널</h2>
        <span style={{ fontWeight: "bold" }}>
          현재 등록되어 있는 서지 정보는 {bookList.length}개입니다.
        </span>
        <br />
        <span style={{ fontSize: 25 }}>특정 연도만 확인하기</span>
        <div id="checkBoxDiv">
          {publishList.map((val, i) => (
            <CheckBox key={i} publish={val} togglePublish={togglePublish} />
          ))}
        </div>
      </div>

      <div id="BookCardList">
        {bookList.map((val, i) => {
          if (visibleList.includes(val.publish)) {
            return (
              <BookCard
                key={i}
                bookId={val.bookId}
                bookName={val.bookName}
                publish={val.publish}
                author={val.author}
                deleteBook={deleteBook}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
