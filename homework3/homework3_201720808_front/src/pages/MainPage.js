import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <h1>서지 정보 관리기에 오신 것을 환영합니다</h1>
      <Link to="/list">
        <button id="mainButton" type="button">
          책 목록 확인
        </button>
      </Link>
      <Link to="/register">
        <button id="mainButton" type="button">
          새로운 책 추가
        </button>
      </Link>
    </div>
  );
}
