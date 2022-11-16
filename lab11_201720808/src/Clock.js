import { useState } from "react";
import ClockUpdate from "./ClockUpdate";
import "./clock.css";

export default function Clock(props) {
  const { id, name, hour, min, sec, update, remove } = props;

  const [mode, setMode] = useState(24);
  const [toggle, setToggle] = useState(true);
  const onChangeMode = () => {
    //12시간제와 24시간제
    mode == 24 ? setMode(12) : setMode(24);
  };

  const clockUpdate = (data) => {
    update(data);
    if (!data._name) {
      return alert("이름을 반드시 입력해주세요");
    }

    if (data._hour > 23 || data._hour < 0) {
      return alert("0~23까지의 시간을 입력해주세요");
    }
    if (data._min > 59 || data._min < 0) {
      return alert("0~59까지의 분을 입력해주세요");
    }
    if (data._sec > 59 || data._sec < 0) {
      return alert("0~59까지의 초를 입력해주세요");
    }

    setToggle(true);
  };

  const onToggle = () => {
    setToggle(() => !toggle);
  };

  const removeClock = (data) => {
    remove(id);
  };

  return (
    <div className>
      <div className="clockPannel">시계 패널</div>
      {toggle ? (
        <div className="clockElement">
          <div className="clockElementName">{name}</div>
          <div className="clockElementInfo">
            <span> {mode == 24 ? mode + "h" : hour >= 12 ? "PM" : "AM"} </span>
            <span>
              {/* 여기서 이상한 점 왜 오전 12시 오후 12시 일까? 0시로 하는게 맞지 않나? */}
              {mode == 24
                ? String(hour).padStart(2, "0")
                : hour % 12 == 0
                ? 12
                : String(hour % 12).padStart(2, "0")}
              :{String(min).padStart(2, "0")}:{String(sec).padStart(2, "0")}
            </span>
          </div>
          <div className="buttonGroup">
            <button onClick={onToggle}>수정</button>
            <button onClick={onChangeMode}>
              {mode == 24 ? 12 : 24}시간제로 전환
            </button>
            <button onClick={removeClock}>삭제</button>
          </div>
        </div>
      ) : (
        <ClockUpdate
          id={id}
          name={name}
          hour={hour}
          min={min}
          sec={sec}
          updateInfo={clockUpdate}
          onToggle={onToggle}
        ></ClockUpdate>
      )}
    </div>
  );
}
