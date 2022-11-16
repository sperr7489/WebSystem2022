/* <img src="./public/dog.png" style="display:block; width:50px; height:50px;"  alt="강아지">
<img src="./public/cat.png" style="display:block; width:50px; height:50px;" alt="고양이">
<img src="./public/fox.png" style="display:block; width:50px; height:50px;" alt="여우"> */
let stopImg = "⛔️";
let flag = true; // 아이콘을 출력할 시에 반복문을 돌리기 위해서 전역 변수 설정
let timeOutId;
let i = 0; // 아이콘과 interval에 대해서 index로 조회하기 위한 변수

let heartPool = document.getElementById("heartPool");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let addBtn = document.getElementById("add");

let icons = ["🧡", "💛", "💚"]; // 500ms, 1000ms,1500ms
let iconsInterval = [500, 1000, 1500];
// 하트 출력하기 함수.
async function printHeart(idx) {
  // 하트를 순서대로 대기하며 출력시키기 위해 프로미스와 await함수를 사용
  let iconIdx = idx % icons.length;

  const promise = new Promise((resolve, reject) => {
    timeOutId = setTimeout(() => {
      //timeOutId를 통해서 정지 시킬 때 해당 setTimeOut을 멈추기
      resolve(icons[iconIdx]);
    }, iconsInterval[iconIdx]);
  });
  const result = await promise;
  return result;
}
// printHeart(0);

async function load() {
  // printHeart는 async 함수이기 때문에 아래에서 await 을 이용하여 printHeart(i)가 로드될때까지 기다리기 위해 async 함수로 선언.
  // 시작 할 시에 하트 아이콘을 html로 출력하는 함수
  flag = true;
  addBtn.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  while (flag) {
    const heart = await printHeart(i);
    // const heartTest = document.createElement("p");
    // heartTest.setAttribute("style", "display:block; margin:5px");
    // heartTest.innerHTML = `${heart} ${new Date().toString()}`;
    const heartHtml = `<p style="display:block; margin:5px"> ${heart} ${new Date().toString()} </p>`;
    heartPool.insertAdjacentHTML("afterbegin", heartHtml);
    // console.log(new Date());
    i++;
  }
}

function stop() {
  clearTimeout(timeOutId);
  flag = false;
  addBtn.disabled = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  const stopHtml = `<p style="display:block; margin:5px"> ${stopImg} ${new Date().toString()} </p>`;
  heartPool.insertAdjacentHTML("afterbegin", stopHtml);
}

function add() {
  let addIconIdx = i % icons.length; // 추가 해야할 아이콘의 위치인덱스
  let icon = prompt("enter new Icon");
  let interval = Number(prompt("enter interval"));
  icons.splice(addIconIdx, 0, icon);
  iconsInterval.splice(addIconIdx, 0, interval);
}

startBtn.addEventListener("click", load);
stopBtn.addEventListener("click", stop);
addBtn.addEventListener("click", add);
