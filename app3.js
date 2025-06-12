let gameSeq = [];
let userSeq = [];
let level = 0;
let highest = 0;
let color = ["red", "yellow", "green", "aqua"];
let started = false;
let res = document.querySelector("span");

document.addEventListener("keypress", function () {
  if (started == false) {
    levelUp();
  }
  started = true;
});
function flash(event) {
  event.classList.add("flash");
  setTimeout(function () {
    event.classList.remove("flash");
  }, 100);
}
function levelUp() {
  level++;
  userSeq = [];
  res.innerText = `Level - ${level}`;
  let ranIdx = Math.floor(Math.random() * 3);
  let ranCol = color[ranIdx];
  let randBtn = document.querySelector(`.${ranCol}`);
  flash(randBtn);
  console.log("game started!");
  gameSeq.push(ranCol);
}

function condition(idx) {
  let ind = userSeq.length - 1;
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    res.innerHTML = `<h2>Game is over. Your score is Level -${level}<br> Press any key to restart</h2>`;
    if (highest < level) {
      highest = level;
    }

    let high = document.querySelector("p");
    high.innerText = `Your highest score is ${highest}`;
    let main = document.querySelector("body");
    main.classList.add("warning");

    setTimeout(function () {
      main.classList.remove("warning");
    }, 100);
    gameSeq = [];
    started = false;
    level = 0;
  }
}

function btnPress() {
  if (started == true) {
    let btn = this;
    flash(btn);
    userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    console.log("game Press : ", gameSeq);
    console.log("user press : ", userSeq);
    console.log("btn was pressed!");
    condition(userSeq.length - 1);
  }
}

let btnAll = document.querySelectorAll(".box");
for (btn of btnAll) {
  btn.addEventListener("click", btnPress);
}
