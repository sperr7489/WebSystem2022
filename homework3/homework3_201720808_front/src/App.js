import React, { Component } from "react";
import { HashRouter, Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import ListPage from "./pages/ListPage";
import RegisterPage from "./pages/RegisterPage";
import BookInfo from "./pages/BookInfo";
import "./css/app.css";

function App() {
  return (
    <div className="App">
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
