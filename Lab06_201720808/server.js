const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
let i = 1;
const app = http.createServer(async (req, res) => {
  if (req.url == "/") {
    const html = await readFilePromise(__dirname + "/survey.html", "utf-8");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  }
  if (req.url == "/submit_success") {
    let body = "";
    const submit_success = await readFilePromise(
      __dirname + "/submit_success.html",
      "utf-8"
    );
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", async () => {
      let post = new URLSearchParams(body);
      let data = {};
      data.name = post.get("name");
      data.student_id = post.get("student_id");
      data.age = post.get("age");
      data.department = post.get("department");
      data.subject = post.getAll("subject");

      await writeFilePromise(JSON.stringify(data), i);
      i++;

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(submit_success);
    });
  }
  if (req.url == "/survey_statistics") {
    const dir = await readDirPromise("./response");
    let responseData = [];
    for (let i = 0; i < dir.length; i++) {
      const ele = await readFilePromise("./response/" + dir[i], "utf-8");
      responseData.push(JSON.parse(ele));
    }
    let nameList = [];

    let department = {
      sw: 0,
      media: 0,
      security: 0,
      industry: 0,
    };
    let subject = {
      web: 0,
      os: 0,
      ai: 0,
      sw: 0,
      db: 0,
    };

    if (responseData.length != 0) {
      let sumId = 0,
        sumAge = 0;
      responseData.forEach((ele) => {
        nameList.push(ele.name);
        sumId += parseInt(ele.student_id.slice(2, 4));
        sumAge += parseInt(ele.age);
        department[`${ele.department}`] += 1;
        ele.subject.forEach((sub) => {
          subject[`${sub}`] += 1;
        });
      });

      let avgId = Math.round(sumId / nameList.length);
      let avgAge = sumAge / nameList.length;

      let nameListDiv = "";
      nameList.forEach((element) => {
        nameListDiv += `<div>${element}</div>`;
      });
      let html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table,th,td{
            border: 1px solid black;
        }
    </style>
    <title>survey statistics</title>
</head>
<body>
    <h1>통계</h1>
    <h2 >제출자</h2>
    <div id = "submitter">
        ${nameListDiv}
    </div>
    <h2 >제출자 평균 학번</h2>
    <div id = "avg_student_id">${avgId}</div>
    <h2 >제출자 평균 나이</h2>
    <div id = "avg_age">${avgAge}</div>

    <h2 >학과 통계</h2>
   
    <table >
        <tr>
            <th scope="col">학과</th>
            <th scope="col">인원</th>
        </tr>
        <tr>
            <td>소프트웨어학과</td>
            <td id="swCount">${department.sw}</td>
        </tr>
        <tr>
            <td>미디어학과</td>
            <td id = "mediaCount">${department.media}</td>
        </tr>
        <tr>
            <td>사이버보안학과</td>
            <td id = "securityCount">${department.security}</td>
        </tr>
        <tr>
            <td>산업공학과</td>
            <td id = industryCount>${department.industry}</td>
        </tr>
    </table>
    <br>
    <h2 >과목 통계</h2>
    <table>
        <tr>
            <th scope="col">과목</th>
            <th scope="col">인원</th>
        </tr>
        <tr>
            <td>웹시스템설계</td>
            <td id = "web">${subject.web}</td>
        </tr>
        <tr>
            <td>운영체제</td>
            <td id = "os">${subject.os}</td>
        </tr>
        <tr>
            <td>인공지능</td>
            <td id = "ai">${subject.ai}</td>
        </tr>
        <tr>
            <td>소프트웨어공학</td>
            <td id = "sw">${subject.sw}</td>
        </tr>
        <tr>
            <td>데이터베이스</td>
            <td id = "db">${subject.db}</td>
        </tr>
    </table>

    <form style="display: inline;" action="/" method="post" >
        <input type="submit" value="새로운 설문지 응답" >
    </form>
</body>
</html>
      `;
      res.end(html);
    } else {
      let htmlStatistics = await readFilePromise(
        "./survey_statistics.html",
        "utf-8"
      );
      res.end(htmlStatistics);
    }
  }
});

app.listen(3000);

// 파일읽기
function readFilePromise(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

// 폴더 읽기
function readDirPromise(path) {
  const arr = [];
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, files) {
      if (err) {
        reject(err);
        return;
      }
      for (let fileName of files) {
        arr.push(fileName);
      }
      resolve(arr);
    });
  });
}
// 파일쓰기
function writeFilePromise(fileContent, i) {
  return new Promise((res, rej) => {
    fs.writeFile(
      path.join(__dirname, `/response/response_${i}.json`),
      fileContent,
      (err) => {
        if (err) console.error("파일을 정상적으로 쓰지 못했습니다. ");
        else {
          res(i);
        }
      }
    );
  });
}
