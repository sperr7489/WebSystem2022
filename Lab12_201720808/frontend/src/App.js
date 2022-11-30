import "./App.css";
import SearchStudent from "./Component/SearchStudent";
import AddStudent from "./Component/AddStudent";
import StudentBoard from "./Component/StudentBoard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const [studentList, setStudentList] = useState([]);

  const addStudentList = (data) => {
    setStudentList([...studentList, data]);
  };
  const selectStudentList = (data) => {
    setStudentList([data, ...studentList]);
  };
  const deleteStudentElement = (data) => {
    const newList = studentList.filter((v) => v.studentId !== data);
    setStudentList([...newList]);
  };

  const state = useSelector((state) => {
    const { value } = state;

    return value;
  });
  const initiate = (event) => {
    event.preventDefault();
    dispatch({ type: "counter/initiate" });
    window.location.reload();
  };

  return (
    <div className="App">
      <h1> Lab12_201720808 김기창 </h1>

      <SearchStudent selectStudent={selectStudentList}></SearchStudent>
      <AddStudent id="addStudent" addStudent={addStudentList}></AddStudent>
      {studentList.length === 0 ? (
        <div>
          <pre>누적 서버 요청 횟수 : {state}</pre>
          <button onClick={initiate}> 초기화 </button>
        </div>
      ) : (
        <div>
          <div>
            <pre>누적 서버 요청 횟수 : {state}</pre>
            <button onClick={initiate}> 초기화 </button>
          </div>
          <ul>
            {studentList.map((val, i) => (
              <StudentBoard
                key={i}
                index={`${i + 1}.`}
                koreanName={val.koreanName}
                englishName={val.englishName}
                photoURL={val.photoURL}
                studentId={val.studentId}
                department={val.department}
                deleteStudentElement={deleteStudentElement}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
