import { useState } from "react";
import "./inputClock.css";
function InputClock(props) {
  const { onRegister } = props;
  // 시계의 이름, 시간, 분, 초
  const [name, setName] = useState("");
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const nameChangeHandler = (event) => {
    const name = event.target.value;
    setName(name);
  };
  const hourChangeHandler = (event) => {
    const hour = event.target.value;
    setHour(hour);
  };
  const minChangeHandler = (event) => {
    const min = event.target.value;
    setMin(min);
  };
  const secChangeHandler = (event) => {
    const sec = event.target.value;
    setSec(sec);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      name,
      hour,
      min,
      sec,
    };
    onRegister(data);

    document.getElementById("name").value = "";
    document.getElementById("hour").value = "";
    document.getElementById("min").value = "";
    document.getElementById("sec").value = "";
  };

  return (
    <form onSubmit={submitHandler} className="clock_info">
      <p className="infoTitle">시계 정보 입력 패널</p>
      <div>
        <div className="pannel">
          <label htmlFor="name"> 시계 이름 </label>
          <input
            type="text"
            id="name"
            placeholder="시계 이름을 입력하세요"
            onChange={nameChangeHandler}
          />
        </div>
        <div className="pannel">
          <label htmlFor="hour"> 시계 초기 시간 </label>
          <input
            type="text"
            id="hour"
            placeholder="0~23"
            onChange={hourChangeHandler}
          ></input>
        </div>
        <div className="pannel">
          <label htmlFor="min"> 시계 초기 분 </label>
          <input
            type="text"
            id="min"
            placeholder="0~59"
            onChange={minChangeHandler}
          />
        </div>
        <div className="pannel">
          <label htmlFor="sec"> 시계 초기 초 </label>
          <input
            type="text"
            placeholder="0~59"
            id="sec"
            onChange={secChangeHandler}
          />
        </div>
      </div>
      <button className="buttonPlus" type="submit">
        추가
      </button>
      <hr />
    </form>
  );
}

export default InputClock;
