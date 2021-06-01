const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const start = document.querySelector(".start");

let array = [...boxes];

//start

let seconds = 0;
let min = 0;
let timer;

function startGame() {
  setInterval(function incrementTimer() {
    seconds++;

    if (seconds == 60) {
      min++;
      seconds = 0;
    }

    timer = document.querySelector(".time").innerHTML =
      "Timer: " + min + "mins " + seconds + "s";
  }, 1000);
}

let hasFlippedBox = false;
let disableBoard = false;
let firstBox, secondBox;

function flipBox() {
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

  startGame();
  checkMatch();
  allMach();
}

function checkMatch() {
  let maching = firstBox.dataset.framework === secondBox.dataset.framework;
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

function allMach() {
  setTimeout(() => {
    let maching = array.every((i) => i.className === "box flip match");
    maching
      ? alert("Congratulations! You won in " + min + "min " + seconds + "s")
      : null;
  }, 300);
}

boxes.forEach((box) => {
  box.addEventListener("click", flipBox);
});

// reset button
reset.addEventListener("click", resetGame);

function resetGame() {
  clearInterval(incrementTimer);
  window.location.reload();
}
