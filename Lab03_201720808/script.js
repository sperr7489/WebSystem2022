/**
 * 본 프로그램은 사용자가 시계 이름, 시, 분, 초를 입력하면 화면에 그대로 내용을 띄워 주고, 사용자가 시간
 * 조작 버튼을 누르면 지금까지 등록된 모든 시계에 일제히 같은 시간 조작을 가하는 프로그램입니다.
 *
 */
class Clock {
  name;
  hour;
  min;
  sec;
  constructor(name, hour, min, sec) {
    this.name = name;
    this.hour = hour;
    this.min = min;
    this.sec = sec;
  }

  hour_plus() {
    this.hour++;
  }
  hour_minus() {
    this.hour--;
  }
  min_add() {
    this.min += 10;
  }
  min_minus() {
    this.min -= 10;
  }
  sec_add() {
    this.sec += 10;
  }
  sec_minus() {
    this.sec -= 10;
  }
}

let clocks = [];

function hour_plus() {
  let divClocks = document.getElementsByClassName("clock");
  for (let i = 0; i < divClocks.length; i++) {
    clocks[i].hour_plus();
    divClocks[
      i
    ].innerHTML = `<p> 시계  [${clocks[i].name}] : ${clocks[i].hour}시 ${clocks[i].min}분 ${clocks[i].sec}초 </p>`;
  }
}
function hour_minus() {
  let divClocks = document.getElementsByClassName("clock");
  for (let i = 0; i < divClocks.length; i++) {
    clocks[i].hour_minus();
    divClocks[
      i
    ].innerHTML = `<p> 시계  [${clocks[i].name}] : ${clocks[i].hour}시 ${clocks[i].min}분 ${clocks[i].sec}초 </p>`;
  }
}
function min_add() {
  let divClocks = document.getElementsByClassName("clock");
  for (let i = 0; i < divClocks.length; i++) {
    clocks[i].min_add();
    divClocks[
      i
    ].innerHTML = `<p> 시계  [${clocks[i].name}] : ${clocks[i].hour}시 ${clocks[i].min}분 ${clocks[i].sec}초 </p>`;
  }
}
function min_minus() {
  let divClocks = document.getElementsByClassName("clock");
  for (let i = 0; i < divClocks.length; i++) {
    clocks[i].min_minus();
    divClocks[
      i
    ].innerHTML = `<p> 시계  [${clocks[i].name}] : ${clocks[i].hour}시 ${clocks[i].min}분 ${clocks[i].sec}초 </p>`;
  }
}
function sec_add() {
  let divClocks = document.getElementsByClassName("clock");
  for (let i = 0; i < divClocks.length; i++) {
    clocks[i].sec_add();
    divClocks[
      i
    ].innerHTML = `<p> 시계  [${clocks[i].name}] : ${clocks[i].hour}시 ${clocks[i].min}분 ${clocks[i].sec}초 </p>`;
  }
}
function sec_minus() {
  let divClocks = document.getElementsByClassName("clock");
  for (let i = 0; i < divClocks.length; i++) {
    clocks[i].sec_minus();
    divClocks[
      i
    ].innerHTML = `<p> 시계  [${clocks[i].name}] : ${clocks[i].hour}시 ${clocks[i].min}분 ${clocks[i].sec}초 </p>`;
  }
}

function addClock() {
  let newDiv = document.createElement("div");
  newDiv.className = "clock";
  let sectionNode = document.getElementById("clocks");

  let name = prompt("시계의 이름을 입력하세요");
  let hour = prompt("시계의 시를 입력하세요");
  let min = prompt("시계의 분을 입력하세요");
  let sec = prompt("시계의 초를 입력하세요");

  let clock = new Clock(name, parseInt(hour), parseInt(min), parseInt(sec));

  newDiv.innerHTML = `<p> 시계  [${clock.name}] : ${clock.hour}시 ${clock.min}분 ${clock.sec}초 </p>`;

  sectionNode.appendChild(newDiv);
  clocks.push(clock);
}
let clock_add_on = document.getElementById("clock_add");
let hour_plus_on = document.getElementById("hour_plus");
let hour_minus_on = document.getElementById("hour_minus");
let min_add_on = document.getElementById("10min_add");
let min_minus_on = document.getElementById("10min_minus");
let sec_add_on = document.getElementById("10sec_add");
let sec_minus_on = document.getElementById("10sec_minus");

clock_add_on.addEventListener("click", addClock);
hour_plus_on.addEventListener("click", hour_plus);
hour_minus_on.addEventListener("click", hour_minus);
min_add_on.addEventListener("click", min_add);
min_minus_on.addEventListener("click", min_minus);
sec_add_on.addEventListener("click", sec_add);
sec_minus_on.addEventListener("click", sec_minus);
