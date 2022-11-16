import React from "react";
import "./student.css";

function Student({ koreanName, englishName, photoURL, studentId, department }) {
  return (
    <div className="Card">
      <div className="SchoolName">
        <img
          src="https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-system06.png"
          className="AjouLogo"
          alt="logo"
        />
      </div>
      <div className="StudentInfo">
        <img className="Photo" src={photoURL} />
        <div>
          <pre>{koreanName}</pre>
          <pre>{englishName}</pre>
          <pre>{studentId}</pre>
          <pre>{department}</pre>
        </div>
      </div>
    </div>
  );
}
export default Student;
