// DOM Selection
const main = document.getElementsByTagName("main")[0];
const questionCardElement = main.querySelector("#question-card");
const questionElement = main.querySelector("p > strong");
const formElement = main.querySelector("form");
const inputElement = main.querySelector("form input");
const hintElement = main.querySelector("#hint > .logo-hint");
const chanceHint = main.querySelector("#hint > small");
const lookHint = main.querySelector("#look-hint");
const chancePlay = main.querySelector("#heart > #try > small > span");
const heart = main.querySelectorAll("#heart > #logo-live > i");

// const showPlayerName = document.getElementById("player-name");
// console.log(heart)

// Variabel and Object
const dataProblem = {
  problemText: [
    "What goes up but never comes down",
    "What is always in front of you but can't be seen",
    "The more you take, the more you leave behind",
    "What goes away as soon as you talk about it",
    "What can you break, even if you never pick it up",
    "I'm an adjective but have a hand in me",
    "What kind of room hasn't doors or window",
    "You'll find me in Mercury, Earth and Mars. But not in Venus or Neptune",
    "If i have it, i don't share. If i share it, i don't have it",
    "I make a loud sound when i'm changing. I get bigger but my weight less",
  ],
  answerText: [
    "Age",
    "Future",
    "Footstep",
    "Silence",
    "Promise",
    "Handsome",
    "Mushroom",
    "R",
    "Secret",
    "Popcorn",
  ],
  hint: [
    "A** - nomina",
    "****re - nomina",
    "Foo****p - nomina",
    "****nce - nomina",
    "Pro**** - nomina",
    "Ha****** - adjective",
    "****room - nomina",
    "* - alphabet",
    "Se**** - adjective",
    "*****rn nomina",
  ],
};

let state = {
  correct: 0,
  wrong: 0,
  try: 0,
  hint: 3,
  // currentProblem: problem, answer, index, hint
  // status
};

let count = 0;

// Function
// function giveName() {
//   const playerName = prompt("enter your nickname");
//   showPlayerName.innerHTML =
//     playerName[0].toUpperCase() + playerName.substring(1);
//   return;
// }

// giveName();

function createNumber(max) {
  return Math.floor(Math.random() * max);
}

function createProblem() {
  let index = createNumber(dataProblem.problemText.length);
  return {
    problem: dataProblem.problemText[index],
    answer: dataProblem.answerText[index],
    lookHint: dataProblem.hint[index],
    index: index,
  };
}

function updateProblem() {
  state.currentProblem = createProblem();
  if (state.correct >= 0 && state.correct < 3) {
    state.status = "Amateur";
  } else if (state.correct >= 3 && state.correct < 5) {
    state.status = "Hustler";
  } else if (state.correct >= 5 && state.correct < 8) {
    state.status = "Semi-Pro";
  } else if (state.correct >= 8 && state.correct < 10) {
    state.status = "Professional";
  } else if (state.correct == 10) {
    state.status = "Master";
  }
  resetInput();
  lookHint.innerHTML = "";
  count++;
}

function resetInput() {
  inputElement.value = "";
  inputElement.focus();
}

function resetGame() {
  state.try = 0;
  state.correct = 0;
  state.wrong = 0;
  state.hint = 3;
  chancePlay.innerHTML = `0`;
  lookHint.innerHTML = ``;
  chanceHint.innerHTML = `3x hint`;
  questionElement.style.color = "black";
}

function pick() {
  const roll = setInterval(() => {
    updateProblem();
    questionElement.innerHTML = `${state.currentProblem.problem}`;
    if (count === 50) {
      clearInterval(roll);
      count = 0;
    }

    // console.log(updateProblem);
  }, 20);
}

// updateProblem();

// EventHandler
formElement.addEventListener("submit", () => {
  const inputForString =
    inputElement.value[0].toUpperCase() +
    inputElement.value.substring(1).toLowerCase();
  const answerForString =
    state.currentProblem.answer[0].toUpperCase() +
    state.currentProblem.answer.substring(1).toLowerCase();

  if (inputForString === answerForString) {
    state.correct++;
    questionElement.style.color = "#3CCF4E";
    questionCardElement.style.boxShadow = "-10px -10px 0 0 #3CCF4E";
    questionCardElement.style.borderColor = "#3CCF4E";
    questionCardElement.style.animation = "pulseGreen 1750ms infinite";

    setTimeout(() => {
      questionElement.style.color = "black";
      questionCardElement.style.boxShadow = "-10px -10px 0 0 black";
      questionCardElement.style.borderColor = "black";
      questionCardElement.style.animation = "none";
    }, 2000);

    updateProblem();
    pick();
  } else {
    state.wrong++;
    questionElement.style.color = "#eb1d36";
    questionCardElement.style.boxShadow = "-10px -10px 0 0 #eb1d36";
    questionCardElement.style.borderColor = "#eb1d36";
    questionCardElement.style.animation = "pulse 250ms infinite";

    setTimeout(() => {
      questionElement.style.color = "black";
      questionCardElement.style.boxShadow = "-10px -10px 0 0 black";
      questionCardElement.style.borderColor = "black";
      questionCardElement.style.animation = "none";
    }, 1500);

    resetInput();
    alert("sorry");
  }

  state.try = state.correct + state.wrong;
  chancePlay.innerHTML = `${state.try}`;

  if (state.wrong === 1) {
    for (let i = 0; i < state.wrong; i++) {
      heart[i].style.color = "black";
    }
  } else if (state.wrong === 2) {
    for (let i = 0; i < state.wrong; i++) {
      heart[i].style.color = "black";
    }
    heart[2].style.animation = "pulse 500ms infinite";
    heart[2].style.borderRadius = "50%";
    heart[2].style.padding = "0.4rem";
  } else if (state.wrong === 3) {
    for (let i = 0; i < state.wrong; i++) {
      heart[i].style.color = "black";
    }
    heart[2].style.animation = "none";
    heart[2].style.borderRadius = "none";
    heart[2].style.padding = "0";
    setTimeout(() => {
      const playAgain = prompt(
        `playerName you're a/an ${state.status} with a score ${state.correct}/10. Play again? y/n : `
      );
      if (playAgain == "y") {
        resetGame();
        setTimeout(() => {
          document.body.style.backgroundColor = "white";
          questionElement.innerHTML = `Get Started!`;
          for (let i = 0; i < 3; i++) {
            heart[i].style.color = "#eb1d36";
          }
          questionCardElement.style.boxShadow = "-10px -10px 0 0 black";
          questionCardElement.style.borderColor = "black";
          questionCardElement.style.animation = "none";
        }, 3000);
      } else {
        document.body.style.backgroundColor = "#eb1d36";
        setTimeout(() => {
          resetGame();
          document.body.style.backgroundColor = "white";
          questionElement.innerHTML = `Get Started!`;

          for (let i = 0; i < 3; i++) {
            heart[i].style.color = "#eb1d36";
          }
          questionCardElement.style.boxShadow = "-10px -10px 0 0 black";
          questionCardElement.style.borderColor = "black";
          questionCardElement.style.animation = "none";
        }, 10000);
      }
    }, 2000);
  }

  if (state.correct > 7 && state.try == 10) {
    const playAgain = prompt(
      `Congratulations! playerName you're a/an ${state.status} with a High-Level score : ${state.correct}/10. Play again? y/n`
    );
    if (playAgain == "y") {
      resetGame();
    } else {
      document.body.style.backgroundColor = "#3CCF4E";
      setTimeout(() => {
        resetGame();
        document.body.style.backgroundColor = "white";
        questionElement.innerHTML = `Get Started!`;
        for (let i = 0; i < 3; i++) {
          heart[i].style.color = "#eb1d36";
        }
        questionCardElement.style.boxShadow = "-10px -10px 0 0 black";
        questionCardElement.style.borderColor = "black";
        questionCardElement.style.animation = "none";
      }, 10000);
    }
  }
});

hintElement.addEventListener("click", () => {
  let numHint = state.hint;
  chanceHint.innerHTML = `${numHint - 1}x left`;

  if (numHint > 0) {
    numHint = state.hint--;

    lookHint.innerHTML = `: ${state.currentProblem.lookHint}`;

    // console.log('bisa')
    if (numHint == 1) {
      setTimeout(() => {
        hintElement.style.background = "black";
        hintElement.style.animation = "none";
        chanceHint.innerHTML = "No Hint";
      }, 0);
    }
  } else if (numHint == 0) {
    hintElement.style.background = "black";
    hintElement.style.animation = "none";
    chanceHint.innerHTML = "No Hint";
    alert("Hint doesn't exist");
  }
  // console.log(numHint);
});

questionCardElement.addEventListener("click", () => {
  pick();
});
