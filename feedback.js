let btn = document.querySelector(".submit-btn");
btn.onclick = () => {
  let user = localStorage.getItem("textvalue");
  let message = document.querySelector(".message").value;
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var timetoday =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let fid = date + " " + timetoday;
  console.log(fid + "\n" + user + "\n" + message);
  fetch("http://localhost:3000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fid: fid,
      username: user,
      message: message,
    }),
  });
};
