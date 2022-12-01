import { Link } from "react-router-dom";
import "../css/mainPage.css";
export default function MainPage() {
  return (
    <div id="mainPage">
      <h1>서지 정보 관리기에 오신 것을 환영합니다</h1>
      <h2>실행하실 메뉴를 아래에서 골라주세요</h2>
      <div id="linkMain">
        <Link to="/list">
          <button type="button">책 목록 확인</button>
        </Link>
        <Link to="/register">
          <button type="button">새로운 책 추가</button>
        </Link>
      </div>
    </div>
  );
}
