import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function SearchStudent(props) {
  const { selectStudent } = props;

  const [studentId, setStudentId] = useState(""); // 학번을 기본 state로
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    const { value } = state;

    return value;
  });
  const searchStudent = async (event) => {
    event.preventDefault();
    try {
      if (state == 10) {
        return alert("더이상 서버와 통신할 수 없습니다.");
      }

      if (studentId === "") {
        return alert("학번을 입력해주세요");
      }

      dispatch({ type: "counter/incremented" });
      const { data } = await axios.get(
        "http://localhost:4000/student/" + studentId
      );

      const info = {
        ...data,
      };
      selectStudent(info);
    } catch (err) {
      console.log(err);

      alert("해당 학번의 학생이 존재하지 않는다. ");
    } finally {
      document.getElementById("search_studentId").value = "";
      setStudentId("");
    }
  };

  const studentIdChangeHandler = (event) => {
    const targetId = event.target.value;
    setStudentId(targetId);
  };
  return (
    <div>
      <form onSubmit={searchStudent}>
        <input
          id="search_studentId"
          onChange={studentIdChangeHandler}
          defaultValue={studentId}
          type="text"
        ></input>
        <button> 조회</button>
      </form>
    </div>
  );
}
