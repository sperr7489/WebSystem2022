import Loading from "../src/components/Loading";
import React, { Component, useEffect, useState } from "react";
import { HashRouter, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import ListPage from "./pages/ListPage";
import RegisterPage from "./pages/RegisterPage";
import BookInfo from "./pages/BookInfo";
import "./css/app.css";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const mainApi = async () => {
    setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
    try {
      const response = await axios.get(`http://localhost:3030/`);
      const result = response;
      setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  return (
    <div className="App">
      {loading ? <Loading /> : null}
      <HashRouter>
        <div id="header">
          <h2>서지 정보 관리기</h2>
          <Link to="/">
            <button id="mainButton" type="button">
              메인으로
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/book">
            <Route path=":bookId" eleme1nt={<BookInfo />} />
          </Route> */}
          <Route path="/book/:bookId" element={<BookInfo />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
