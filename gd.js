let search = document.querySelector("#search");
let btn = document.querySelector(".find");

btn.onclick = async () => {
  console.log(search.value);
  await fetch("http://localhost:3000/user/" + search.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      let arr = data.data;
      if (arr.length === 0) {
        document.querySelector(".error1").textContent = "NO USERNAME FOUND";
      } else document.querySelector(".error1").textContent = "";
      let tests = new Set();
      arr.forEach((element) => {
        tests.add(element.testid);
      });
      tests = [...tests];
      test_ul = document.querySelector(".tests");
      tests.forEach((element) => {
        let v = element.split(" ");
        let test_li = document.createElement("li");
        test_li.classList.add("test_li");
        let t = document.createElement("pre");
        let scorecard = {};
        for (let ele of arr) {
          //   console.log(ele.testid + "  " + element);
          if (ele.testid == element) {
            scorecard["total_attempt"] = ele.total_attempt;
            scorecard["total_right"] = ele.total_right;
            scorecard["total_wrong"] = ele.total_wrong;
            scorecard["time"] = ele.time;
            scorecard["per"] = ele.per;
            console.log(scorecard);
            break;
          }
        }
        t.innerHTML = `TEST DATE: ${v[0]}\tTEST TIME: ${v[1]} \nTOTAL ATTEMPTED:${scorecard["total_attempt"]}\nTOTAL RIGHT:${scorecard["total_right"]}\nTOTAL WRONG:${scorecard["total_wrong"]}\nPERCENTAGE:${scorecard["per"]}%\nTIME TAKEN: ${scorecard["time"]} sec`;
        test_li.appendChild(t);
        test_ul.appendChild(test_li);
        let quest_ul = document.createElement("ul");
        test_li.appendChild(quest_ul);
        arr.forEach((ele) => {
          if (ele.testid === element) {
            let q_li = document.createElement("li");
            q_li.appendChild(document.createTextNode(ele.question));
            quest_ul.appendChild(q_li);
            let op_ul = document.createElement("ul");
            q_li.appendChild(op_ul);
            let op1_li = document.createElement("li");
            let op2_li = document.createElement("li");
            let op3_li = document.createElement("li");
            let op4_li = document.createElement("li");
            op1_li.appendChild(document.createTextNode(ele.option1));
            op2_li.appendChild(document.createTextNode(ele.option2));
            op3_li.appendChild(document.createTextNode(ele.option3));
            op4_li.appendChild(document.createTextNode(ele.option4));
            let op_li = [op1_li, op2_li, op3_li, op4_li];
            op_li.forEach((e) => {
              if (e.textContent === ele.correctOption)
                e.style.color = "greenyellow";
              if (e.textContent === ele.chosenOption) e.textContent += "*";
            });
            op_ul.appendChild(op1_li);
            op_ul.appendChild(op2_li);
            op_ul.appendChild(op3_li);
            op_ul.appendChild(op4_li);
          }
        });
      });

      console.log(tests);
    });
};
