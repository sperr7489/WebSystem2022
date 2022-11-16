import React from "react";
import Student from "./Student";
import "./studentBoard.css";
function StudentBoard({
  index,
  koreanName,
  englishName,
  photoURL,
  studentId,
  department,
}) {
  return (
    <li className="listElement">
      <span>{index}</span>
      <Student
        koreanName={koreanName}
        englishName={englishName}
        photoURL={photoURL}
        studentId={studentId}
        department={department}
      />
    </li>
  );
}

export default StudentBoard;
