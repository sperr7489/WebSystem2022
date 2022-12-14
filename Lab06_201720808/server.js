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
    <h1>??????</h1>
    <h2 >?????????</h2>
    <div id = "submitter">
        ${nameListDiv}
    </div>
    <h2 >????????? ?????? ??????</h2>
    <div id = "avg_student_id">${avgId}</div>
    <h2 >????????? ?????? ??????</h2>
    <div id = "avg_age">${avgAge}</div>

    <h2 >?????? ??????</h2>
   
    <table >
        <tr>
            <th scope="col">??????</th>
            <th scope="col">??????</th>
        </tr>
        <tr>
            <td>?????????????????????</td>
            <td id="swCount">${department.sw}</td>
        </tr>
        <tr>
            <td>???????????????</td>
            <td id = "mediaCount">${department.media}</td>
        </tr>
        <tr>
            <td>?????????????????????</td>
            <td id = "securityCount">${department.security}</td>
        </tr>
        <tr>
            <td>???????????????</td>
            <td id = industryCount>${department.industry}</td>
        </tr>
    </table>
    <br>
    <h2 >?????? ??????</h2>
    <table>
        <tr>
            <th scope="col">??????</th>
            <th scope="col">??????</th>
        </tr>
        <tr>
            <td>??????????????????</td>
            <td id = "web">${subject.web}</td>
        </tr>
        <tr>
            <td>????????????</td>
            <td id = "os">${subject.os}</td>
        </tr>
        <tr>
            <td>????????????</td>
            <td id = "ai">${subject.ai}</td>
        </tr>
        <tr>
            <td>?????????????????????</td>
            <td id = "sw">${subject.sw}</td>
        </tr>
        <tr>
            <td>??????????????????</td>
            <td id = "db">${subject.db}</td>
        </tr>
    </table>

    <form style="display: inline;" action="/" method="post" >
        <input type="submit" value="????????? ????????? ??????" >
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

// ????????????
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

// ?????? ??????
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
// ????????????
function writeFilePromise(fileContent, i) {
  return new Promise((res, rej) => {
    fs.writeFile(
      path.join(__dirname, `/response/response_${i}.json`),
      fileContent,
      (err) => {
        if (err) console.error("????????? ??????????????? ?????? ???????????????. ");
        else {
          res(i);
        }
      }
    );
  });
}
