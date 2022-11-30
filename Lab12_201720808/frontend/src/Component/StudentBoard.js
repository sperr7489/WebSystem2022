import axios from "axios";
import React from "react";
import Student from "./Student";
import "./studentBoard.css";
import { useDispatch, useSelector } from "react-redux";

function StudentBoard({
  index,
  koreanName,
  englishName,
  photoURL,
  studentId,
  department,
  deleteStudentElement,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    console.log("state : ", state);
    const { value } = state;

    return value;
  });
  const deleteStudent = async () => {
    try {
      if (state == 10) {
        return alert("더이상 서버와 통신할 수 없습니다.");
      }
      dispatch({ type: "counter/incremented" });
      const { data } = await axios.delete(
        "http://localhost:4000/student/" + studentId
      );
      const { studentId: id } = data;
      deleteStudentElement(id);
    } catch (err) {
      console.log(err);
    }
  };

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
      <button onClick={deleteStudent}> 삭제 </button>
    </li>
  );
}

export default StudentBoard;
