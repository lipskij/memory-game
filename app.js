const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const timer = document.querySelector(".time");
const start = document.querySelector(".start");

// start timer button
start.addEventListener("click", startTimer);

let array = [...boxes];

// timer
let seconds = 0;
let min = 0;

let showingModal = false;
let hasFlippedBox = false;
let disableBoard = false;
let firstBox, secondBox;
let count = 0;

function flipBox(event) {
  if (seconds == 0) {
    return;
  }

  if (disableBoard) {
    return;
  }

  if (this === firstBox) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedBox) {
    hasFlippedBox = true;
    firstBox = this;
    return;
  }

  secondBox = this;
  disableBoard = true;

  counter(event);
  checkMatch();
  allMach();
}

function startTimer() {
  setInterval(function () {
    seconds++;

    if (seconds > 0) {
      start.disabled = true;
      start.disabled ? (start.style.background = "lightgrey") : "";
    }

    if (seconds == 60) {
      min++;
      seconds = 0;
    }

    timer.innerHTML = "Timer: " + min + "mins " + seconds + "s";

    if (showingModal) {
      timer.innerHTML = "Timer: 0mins 0s";
    }
  }, 1000);
}

// count tries
function counter(event) {
  if (event.type == "click") count++, console.log(count);
}

function checkMatch() {
  const maching = firstBox.dataset.framework === secondBox.dataset.framework;
  maching ? disableBox() : unflipBox();
}

function disableBox() {
  firstBox.removeEventListener("click", flipBox);
  secondBox.removeEventListener("click", flipBox);

  firstBox.classList.add("match");
  secondBox.classList.add("match");

  resetBoard();
}

function unflipBox() {
  disableBoard = true;

  setTimeout(() => {
    firstBox.classList.remove("flip");
    secondBox.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedBox, disableBoard] = [false, false];
  [firstBox, secondBox] = [null, null];
}

// shuffle cards
(function shuffle() {
  boxes.forEach((box) => {
    let randomPos = Math.floor(Math.random() * 8);
    box.style.order = randomPos;
  });
})();

// show modal
function showModal() {
  showingModal = true;
  document.querySelector(".reset2").addEventListener("click", resetGame);

  clearInterval();
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";

  let totTime = document.querySelector(".timer");
  let tries = document.querySelector(".count");
  let score = document.querySelector(".score");

  totTime.innerHTML = "Your time: " + min + "mins " + seconds + "s";
  tries.innerHTML = "Tries: " + count;

  if (count > 20) {
    score.innerHTML = "Score: ⭐️";
  }
  if (count > 10) {
    score.innerHTML = "Score: ⭐️⭐️";
  }
  if (count < 10) {
    score.innerHTML = "Score: ⭐️⭐️⭐️";
  }

  document.querySelector(".openModal").append(totTime);
  document.querySelector(".openModal").append(tries);
  document.querySelector(".openModal").append(score);

  document.body.append(modal);
}

// check matched
function allMach() {
  setTimeout(() => {
    let maching = array.every((i) => i.className === "box flip match");
    maching ? showModal() : null;
  }, 300);
}

// reset button
reset.addEventListener("click", resetGame);

function resetGame() {
  window.location.reload();
}

boxes.forEach((box) => {
  box.addEventListener("click", flipBox);
});
