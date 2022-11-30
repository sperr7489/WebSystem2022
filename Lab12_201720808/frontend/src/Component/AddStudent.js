import axios from "axios";
import { useState } from "react";
import "./addStudent.css";
import { useDispatch, useSelector } from "react-redux";

export default function AddStudent(props) {
  const { addStudent } = props;
  const [studentId, setStudentId] = useState();
  const [koreanName, setKoreanName] = useState();
  const [englishName, setEnglishName] = useState();
  const [department, setDepartMent] = useState();
  const [photoUrl, setPhotoUrl] = useState();

  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const onVisible = (event) => {
    event.preventDefault();

    setVisible((prev) => !prev);
  };

  const studentIdChangeHandler = (event) => {
    const studentId = event.target.value;
    setStudentId(studentId);
  };
  const knChangeHandler = (event) => {
    const koreanName = event.target.value;
    setKoreanName(koreanName);
  };

  const enChangeHandler = (event) => {
    const englishName = event.target.value;
    setEnglishName(englishName);
  };
  const departmentChangeHandler = (event) => {
    const department = event.target.value;
    setDepartMent(department);
  };
  const photoUrlChangeHandler = (event) => {
    const photoUrl = event.target.value;
    setPhotoUrl(photoUrl);
  };
  const state = useSelector((state) => {
    const { value } = state;
    return value;
  });
  const addStudentDb = async (event) => {
    event.preventDefault();
    try {
      if (state == 10) {
        return alert("더이상 서버와 통신할 수 없습니다.");
      }
      const body = {
        studentId: studentId,
        koreanName: koreanName,
        englishName: englishName,
        department: department,
        photoUrl: photoUrl,
      };
      dispatch({ type: "counter/incremented" });
      await axios.post("http://localhost:4000/student", {
        ...body,
      });

      addStudent(body);
      alert("학생 추가가 성공하였습니다.");
    } catch (err) {
      const { data } = err.response;
      console.log(data);
      alert(data);
    } finally {
      document.getElementById("koreanName").value = "";
      document.getElementById("englishName").value = "";
      document.getElementById("studentId").value = "";
      document.getElementById("department").value = "";
      document.getElementById("photoUrl").value = "";
      setStudentId("");
      setKoreanName("");
      setEnglishName("");
      setDepartMent("");
      setPhotoUrl("");
    }
  };

  return (
    <div id="addStudent">
      <button onClick={onVisible}>학생추가</button>
      {visible ? (
        <div></div>
      ) : (
        <form id="addButton">
          <div>
            <label htmlFor="koreanName">국문이름</label>
            <input
              type="text"
              id="koreanName"
              onChange={knChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="englishName">영문이름</label>
            <input
              type="text"
              id="englishName"
              onChange={enChangeHandler}
            ></input>
          </div>
          <div></div>
          <div>
            <label htmlFor="studentId">학번</label>
            <input
              type="text"
              id="studentId"
              onChange={studentIdChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="department">학과</label>
            <input
              type="text"
              id="department"
              onChange={departmentChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="photoUrl">사진주소</label>
            <input
              type="text"
              id="photoUrl"
              onChange={photoUrlChangeHandler}
            ></input>
          </div>
          <button onClick={addStudentDb}>추가</button>
        </form>
      )}
    </div>
  );
}
