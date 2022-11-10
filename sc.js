let submitBtn = document.querySelector("#submit");
let usrname = document.querySelector("#inp-name");
let age = document.querySelector("#inp-age");
let gender = document.querySelector("#inp-gen");
let time = document.querySelector("#inp-time");
let t;
let g;
let a;
let usr;

// let playgame = document.querySelector(".play");
submitBtn.onclick = async () => {
  let userExist = false;
  usr = usrname.value;
  localStorage.setItem("textvalue", usr);
  await fetch("http://localhost:3000/check", {
    method: "POST",
    body: JSON.stringify({ usr }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data.length);
      if (data.data.length === 1) userExist = true;
    });
  t = time.value;
  g = gender.value;
  a = age.value;
  if (
    Number.isInteger(Number(t)) &&
    Number(t) > 0 &&
    Number.isInteger(Number(a)) &&
    Number(a) > 0 &&
    usr.length > 0
  ) {
    localStorage.setItem("timer", t);
    console.log(t);
    const fetch_opt = {
      method: "POST",
      body: JSON.stringify({ username: usr, gender: g, age: a }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (userExist === false) {
      document.querySelector(".playGame1").classList.add("playGame");
      document.querySelector(".playGame").textContent = "PLAY GAME";
      await fetch("http://localhost:3000/", fetch_opt);
    } else {
      document.querySelector(".errorr").textContent = "USERNAME ALREADY EXISTS";
    }

    console.log({ username: usr, gender: g, age: a });
  } else {
    document.querySelector(".err2").textContent = "ENTER CORRECT VALUES";
  }
};

// timebtn.onclick = () => {};
