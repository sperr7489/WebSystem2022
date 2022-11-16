import { useState } from "react";
import "./clockUpdate.css";
export default function ClockUpdate(props) {
  const { id, name, hour, min, sec, updateInfo, onToggle } = props;

  const [_name, setName] = useState(name);
  const [_hour, setHour] = useState(hour);
  const [_min, setMin] = useState(min);
  const [_sec, setSec] = useState(sec);

  const nameChangeHandler = (event) => {
    const targetName = event.target.value;
    setName(targetName);
  };
  const hourChangeHandler = (event) => {
    const targetHour = event.target.value;
    setHour(targetHour);
  };
  const minChangeHandler = (event) => {
    const targetMin = event.target.value;
    setMin(targetMin);
  };
  const secChangeHandler = (event) => {
    const targetec = event.target.value;
    setSec(targetec);
  };

  const updateClock = (event) => {
    event.preventDefault();

    const data = { id, _name, _hour, _min, _sec };

    updateInfo(data);

    document.getElementById("name").value = "";
    document.getElementById("hour").value = "";
    document.getElementById("min").value = "";
    document.getElementById("sec").value = "";
  };

  const onCancel = (event) => {
    onToggle(false);
    setName(name);
    setName(hour);
    setName(min);
    setName(sec);
  };
  return (
    <div className="clockUpdate">
      <form onSubmit={updateClock}>
        <div>
          <div>
            <label htmlFor="name"> 시계 이름 </label>
            <input
              type="text"
              id="name"
              defaultValue={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="hour"> 시계 초기 시간 </label>
            <input
              type="text"
              id="hour"
              defaultValue={hour}
              onChange={hourChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="min"> 시계 초기 분 </label>
            <input
              type="text"
              id="min"
              defaultValue={min}
              onChange={minChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="sec"> 시계 초기 초 </label>
            <input
              type="text"
              id="sec"
              defaultValue={sec}
              onChange={secChangeHandler}
            />
          </div>
        </div>
        <button type="submit">수정</button>
      </form>
      <button onClick={onCancel}>수정 취소</button>
    </div>
  );
}
