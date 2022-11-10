const mysql = require("mysql2");
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "newtest",
});
connection.query("DESC test", function (err, data) {
  console.log(data);
});
// connection.query(
//   "SELECT * FROM `person` WHERE `gender`=?;",
//   ["m"],
//   function (err, data) {
//     console.log(data);
//   }
// );
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
  })
);
app.get("/", (req, res) => {
  res.write("HELLLO");
  res.end();
});
app.post("/", (req, res) => {
  connection.query("INSERT INTO `person` VALUES( ? , ? , ? )", [
    req.body.username,
    req.body.age,
    req.body.gender,
  ]);
});
app.post("/check", (req, res) => {
  connection.query(
    "SELECT * FROM `person` WHERE `username`=?;",
    [req.body.usr],
    (err, data) => {
      console.log(data);
      res.json({ data });
    }
  );
});
app.post("/question", (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    connection.query("INSERT INTO `questions` VALUES(?,?,?,?,?,?,?,?,?)", [
      req.body[i].qid,
      req.body[i].testid,
      req.body[i].question,
      req.body[i].option1,
      req.body[i].option2,
      req.body[i].option3,
      req.body[i].option4,
      req.body[i].correctOption,
      req.body[i].chosenOption,
    ]);
  }
});
app.post("/test", (req, res) => {
  connection.query("INSERT INTO `test` VALUES(?,?,?,?)", [
    req.body.username,
    req.body.time,
    req.body.date,
    req.body.testid,
  ]);
});
app.post("/feedback", (req, res) => {
  let data = req.body;
  let d = `FEEDBACK ID:${data.fid}\nUSERNAME:${data.username}\nMESSAGE: ${data.message}\n\n\n\n\n`;
  fs.appendFile("Feedback.txt", d, (err) => {
    if (err) throw err;
  });
  connection.query("INSERT INTO `feedback` VALUES(?,?,?)", [
    data.fid,
    data.message,
    data.username,
  ]);
});
app.post("/scorecard", (req, res) => {
  connection.query(
    "INSERT INTO `scorecard`(testid,total_attempt,total_right,total_wrong,time) VALUES(?,?,?,?,?)",
    [
      req.body.testid,
      Number(req.body.total_attempt),
      Number(req.body.total_right),
      Number(req.body.total_wrong),
      Number(req.body.time),
    ]
  );
});
let name = "";
app.get(`/user/${"*"}`, (req, res) => {
  console.log(req.path.substring(6));
  name = req.path.substring(6);
  connection.query(
    "SELECT * FROM `test` as t , `questions`as q,`scorecard` as s WHERE t.username = '" +
      name +
      "' AND  q.testid = t.testid AND s.testid = t.testid ",
    (err, data) => {
      console.log(data);
      res.json({ data });
    }
  );
});
app.listen(3000, () => {
  console.log("im on 3000");
});
