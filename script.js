let timer = document.querySelector(".timer");
let time = Number(localStorage.getItem("timer"));
let u = document.querySelector("ul");
let countBtn = document.querySelector(".start");
let quest = document.querySelector(".question");
let opt1 = document.querySelector(".option1");
let opt2 = document.querySelector(".option2");
let opt3 = document.querySelector(".option3");
let opt4 = document.querySelector(".option4");
let qu = [];
let options = document.querySelectorAll(".choice");
let gameo = false;
let q = [];
let chosenOpt = [];
let correctAns = [];
let ans;
var today = new Date();
let qsrno = 0;
var date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
var timetoday =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let testid = date + " " + timetoday;
document.querySelector(".con").textContent = localStorage.getItem("textvalue");
console.log(localStorage.getItem("textvalue"));
timer.textContent = time;
countBtn.onclick = function () {
  countBtn.disabled = true;
  gameo = true;
  easyQuest();
  let countd = setInterval(() => {
    timer.textContent = time;
    if (time === 0) {
      clearInterval(countd);
      gameOver();
    }
    time--;
  }, 1000);
};
let op = ["+", "-", "*", "/", "+", "-", "+", "-", "*", "/"];

function easyQuest() {
  let question =
    getRandomInt(20) +
    " " +
    op[getRandomInt(9)] +
    " " +
    getRandomInt(20) +
    " " +
    op[getRandomInt(9)] +
    " " +
    getRandomInt(20);
  ans = solve(question).toFixed(2);
  correctAns.push(ans);
  optGen(20, getRandomInt(3) + 1, ans, question);
  quest.textContent = question;
  q.push(question);
  qsrno++;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function solve(str) {
  var expressionIndex = Math.max(str.lastIndexOf("-"), str.lastIndexOf("+"));
  if (expressionIndex === -1) {
    expressionIndex = Math.max(str.lastIndexOf("*"), str.lastIndexOf("/"));
  }
  if (expressionIndex === -1) {
    var num = Number.parseInt(str.trim());
    if (isNaN(num)) {
      throw Exception("not a valid number");
    } else {
      return num;
    }
  } else {
    var leftVal = solve(str.substring(0, expressionIndex).trim());
    var rightVal = solve(str.substring(expressionIndex + 1).trim());
    switch (str[expressionIndex]) {
      case "+":
        return leftVal + rightVal;
      case "-":
        return leftVal - rightVal;
      case "*":
        return leftVal * rightVal;
      case "/":
        return leftVal / rightVal;
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function optGen(diff, ansIndex, answer, question) {
  let opall = [
    getRandomInt(diff).toFixed(2),
    getRandomInt(diff).toFixed(2),
    getRandomInt(diff).toFixed(2),
  ];
  let j = 0;
  opt1.textContent = "ifjvb";
  for (let i = 1; i <= 4; i++) {
    if (i === ansIndex) {
      getOpt(i).textContent = answer;
    } else {
      getOpt(i).textContent = opall[j++];
    }
  }
  qu.push({
    qid: qsrno,
    testid: testid,
    question: question,
    option1: getOpt(1).textContent,
    option2: getOpt(2).textContent,
    option3: getOpt(3).textContent,
    option4: getOpt(4).textContent,
    correctOption: String(ans),
  });
}
function getOpt(index) {
  if (index === 1) return opt1;
  if (index === 2) return opt2;
  if (index === 3) return opt3;
  if (index === 4) return opt4;
}
function optClick(index) {
  if (gameo === true) {
    if (getOpt(index + 1).textContent == ans) {
      chosenOpt.push(true);
    } else chosenOpt.push(false);
    // console.log(chosenOpt);
    qu[qsrno - 1]["chosenOption"] = getOpt(index + 1).textContent;
    easyQuest();
  }
}
function gameOver() {
  timer.textContent = "SCORE";

  qu.pop();
  console.log(qu);
  const fetch_opt = {
    method: "POST",
    body: JSON.stringify(qu),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/question", fetch_opt);
  let corr = 0;
  for (let i = 0; i < chosenOpt.length; i++) if (chosenOpt[i]) corr++;
  opt1.textContent = "NUMBER OF QUESTIONS: " + chosenOpt.length;
  opt2.textContent = "CORRECT ANSWER: " + corr;
  opt3.textContent = "WRONG ANSWER: " + (chosenOpt.length - corr);
  const fetch_opt1 = {
    method: "POST",
    body: JSON.stringify({
      username: localStorage.getItem("textvalue"),
      time: timetoday,
      date: date,
      testid: testid,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/test", fetch_opt1);
  fetch("http://localhost:3000/scorecard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      testid: testid,
      total_attempt: String(chosenOpt.length),
      total_right: String(corr),
      total_wrong: String(chosenOpt.length - corr),
      time: localStorage.getItem("timer"),
    }),
  });
  document.querySelector(".pg").textContent = "PLAY AGAIN";
  document.querySelector(".pg1").textContent = "FEEDBACK";
  opt4.remove();
  countBtn.remove();
  quest.textContent = " ";
  gameo = false;
}
