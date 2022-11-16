const fs = require("fs");
const path = require("path");
const { resolve } = require("path/posix");
const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readFilePromise = function (path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

//폴더 읽기
const readDirPromise = function (path) {
  const arr = [];
  return new Promise((resolve, reject) => {
    fs.readdir(path, async function (err, files) {
      if (err) {
        reject(err);
        return;
      }
      for (let fileName of files) {
        const info = await matrixInfo(fileName.replace(".csv", ""));
        arr.push(fileName.replace(".csv", "") + " - " + info);
        // console.log(fileName.replace(".csv", " "));
        // console.log(fileName);
      }
      resolve(arr);
    });
  });
};

// 행렬의 A*B 정보를 출력하는 함수
async function matrixInfo(input) {
  let row = 0,
    col = 0;
  const matrix = await readFilePromise(
    path.join(__dirname, `/in/${input}.csv`),
    "utf-8"
  );
  const matList = matrix.trim().split(/\r?\n/);
  row = matList.length;
  col = matList[0].split(",").length;

  return `( ${row} * ${col} )`;
}
// matrixInfo("ex1Right").then((val) => {
//   console.log(val);
// });
// 행렬의 행,열의 곱을 계산하는 함수. maxrixA는 행으로 maxtixB는 열로 곱하여 계산
async function matrixCal(matrixA, matrixB) {
  try {
    const matA = await readFilePromise(
      path.join(__dirname, `/in/${matrixA}.csv`),
      "utf-8"
    );
    const matB = await readFilePromise(
      path.join(__dirname, `/in/${matrixB}.csv`),
      "utf-8"
    );
    const matAList = matA.trim().split("\r\n");
    const matBList = matB.trim().split("\r\n");

    console.log(`Matrix Production : ${matrixA} * ${matrixB}`);

    // Left 행렬의 열의 갯수와 Right행렬의 행의 갯수가 동일해야만 행렬곱을 할 수가 있다.
    if (matAList[0].split(",").length != matBList.length) {
      throw new Error("행렬의 곱을 진행할 수 없다.");
    }

    // const columnACount = matAList[0].split(",").length;
    const columnBCount = matBList[0].split(",").length;

    // console.log(columnBCount);

    let result = new Array(matAList.length);

    for (var i = 0; i < result.length; i++) {
      result[i] = new Array(columnBCount).fill(0);
    }

    for (let i = 0; i < matAList.length; i++) {
      // i는 행 넘버
      for (let j = 0; j < columnBCount; j++) {
        // j는 열 넘버
        result[i][j]; // i,j element
        matAList[i].split(",").map((val, idx) => {
          result[i][j] += parseInt(val) * parseInt(matBList[idx].split(",")[j]);
        });
      }
    }

    // console.log(matA.trim().split("\r\n"), " :이것이 A행렬"); //  ["2,5,7,2", "4,6,6,8", "1,3,2,1", "4,1,2,6"];
    // console.log(matB.trim().split("\r\n")); //
    console.log(
      `calculation done. The size is (${result.length} * ${columnBCount})`
    );

    reader.question(
      "The matrix name for save (without csv extenstion)... : ",
      (name) => {
        writeFilePromise(name, result);
        reader.close();
      }
    );
  } catch (err) {
    console.log(err, " 이와 같은 에러가 발생하였습니다. ");
  }
}

// 어떤 행렬을 쓸 것인지 물어보고 이에 대해 판단하는 함수
async function printQuestion(matrixA, matrixB, matrixNames) {
  try {
    return new Promise(async (resolve, reject) => {
      reader.question(
        "Now, input the left matrix for product ... : ",
        (choice1) => {
          if (!matrixNames.includes(choice1)) {
            throw new Error("없는 행렬입니다. 다시 입력해주세요");
          }
          matrixA = choice1;
          resolve("Now, input the right matrix for product ... : ");
        }
      );
    }).then((val) => {
      reader.question(`${val}`, async (choice2) => {
        matrixB = choice2;
        await matrixCal(matrixA, matrixB);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

function writeFilePromise(name, result) {
  let filecontent = "";
  result.map((x) => {
    filecontent += x.join(",");
    filecontent += "\r\n";
  });
  fs.writeFile(path.join(__dirname, `/out/${name}.csv`), filecontent, (err) => {
    if (err) console.error("파일을 정상적으로 쓰지 못했습니다. ");
  });
}

async function main() {
  let matrixA, matrixB;

  console.log(
    "Welcome to the matrix product calculator \nThe following matrices are founded.\n"
  );
  let matrixList = await readDirPromise(path.join(__dirname, "/in"));
  let matrixNames = [];
  matrixList.map((x) => {
    matrixNames.push(x.split(" -")[0]);
    console.log(x);
  });
  await printQuestion(matrixA, matrixB, matrixNames);
}
main();
