import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import StudentBoard from "./Component/StudentBoard";
function App() {
  return (
    <div className="body">
      <h1> Lab10 201720808 김기창 </h1>
      <ul>
        {data.map((val, i) => (
          <StudentBoard
            key={i}
            index={`${i + 1}.`}
            koreanName={val.koreanName}
            englishName={val.englishName}
            photoURL={val.photoURL}
            studentId={val.studentId}
            department={val.department}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
