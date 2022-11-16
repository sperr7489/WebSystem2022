import { useState } from "react";

import InputClock from "./InputClock";
import Clock from "./Clock";
import "./main.css";
export default function Main() {
  const [clockList, setClockList] = useState([]);

  // 등록하는 것
  const onRegister = (data) => {
    const { name, hour, min, sec } = data;
    if (!name) {
      return alert("이름을 반드시 입력해주세요");
    }

    if (hour > 23 || hour < 0) {
      return alert("0~23까지의 시간을 입력해주세요");
    }
    if (min > 59 || min < 0) {
      return alert("0~59까지의 분을 입력해주세요");
    }
    if (sec > 59 || sec < 0) {
      return alert("0~59까지의 초를 입력해주세요");
    }

    setClockList([...clockList, data]);
  };

  const onRemove = (data) => {
    const newData = clockList.filter((val, i) => data !== i);
    setClockList([...newData]);

    // setClockList(clockList.filter((clock) => clock.id !== id));
  };

  // 시계 정보 수정하기
  const updateClock = (data) => {
    const newData = [...clockList];
    clockList.map((v, i) => {
      if (i == data.id) {
        newData[i].name = data._name;
        newData[i].hour = data._hour;
        newData[i].min = data._min;
        newData[i].sec = data._sec;
      }
    });
    setClockList(newData);
  };

  const hourPlus = () => {
    const newData = [...clockList];
    newData.map((v, i) => {
      v.hour = (v.hour + 1) % 24;
    });
    setClockList(newData);
  };
  const minPlus = () => {
    const newData = [...clockList];
    newData.map((v, i) => {
      v.min = (v.min + 10) % 60;
    });
    setClockList(newData);
  };
  const secPlus = () => {
    const newData = [...clockList];
    newData.map((v, i) => {
      v.sec = (v.sec + 10) % 60;
    });
    setClockList(newData);
  };
  const hourMinus = () => {
    const newData = [...clockList];
    newData.map((v, i) => {
      v.hour = v.hour - 1 >= 0 ? v.hour - 1 : 24 + (v.hour - 1);
    });
    setClockList(newData);
  };
  const minMinus = () => {
    const newData = [...clockList];
    newData.map((v, i) => {
      v.min = v.min - 10 >= 0 ? v.min - 10 : 60 + (v.min - 10);
    });
    setClockList(newData);
  };
  const secMinus = () => {
    const newData = [...clockList];
    newData.map((v, i) => {
      v.sec = v.sec - 10 >= 0 ? v.sec - 10 : 60 + (v.sec - 10);
    });
    setClockList(newData);
  };

  return (
    <div className="main">
      <p className="mainTitle">다중 시계 조작기</p>
      <InputClock onRegister={onRegister}></InputClock>

      <div className="control">
        <p>시계 조작 패널</p>
        <div className="button">
          <button onClick={hourMinus}>-1 H</button>
          <button onClick={minMinus}>-10 M </button>
          <button onClick={secMinus}>-10 S</button>
          <button onClick={secPlus}>+10 S</button>
          <button onClick={minPlus}>+10 M</button>
          <button onClick={hourPlus}>+1 H</button>
        </div>
      </div>
      {clockList.map((clockInfo, i) => {
        const { name, hour, min, sec } = clockInfo;
        return (
          <Clock
            key={i}
            id={i}
            name={name}
            hour={hour}
            min={min}
            sec={sec}
            update={updateClock}
            remove={onRemove}
          ></Clock>
        );
      })}
    </div>
  );
}
