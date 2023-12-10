const questions = [
  ["a", "a", "b", "b", "c", "c", "d", "d", "a", "d"],
  ["b", "b", "c", "a", "d", "a", "a", "b", "d", "c"],
  ["c", "c", "a", "b", "d", "c", "c", "a", "c", "a"],
  ["c", "a", "d", "b", "c", "a", "a", "d", "b", "b"],
];

class Game {
  constructor({
    questions,
    scoreDisplay,
    gameProgress,
    availableTentatives,
    gameButtons,
  }) {
    console.log(questions);
    //DOM elements
    this.questions = questions;
    this.finalScore = scoreDisplay;
    this.scoreDisplay = scoreDisplay.children[0];
    this.finalProgress = gameProgress;
    this.gameProgress = gameProgress.children[0];
    this.finalTentatives = availableTentatives;
    this.availableTentatives = availableTentatives.children[0];
    this.gameButtons = gameButtons;

    //Internal controls
    this.points = 100;
    this.tentatives = 3;
    this.currentQuestion = 0;
    this.gameOver = false;
    this.score = 0;
  }

  startGame() {
    this.scoreDisplay.innerHTML = this.score.toString().padStart(4, "0");
    this.gameProgress.innerHTML = `${this.currentQuestion + 1} de ${
      this.questions.length
    }`;
    this.availableTentatives.innerHTML = this.tentatives;
  }

  nextQuestion() {
    this.currentQuestion++;
    this.points = 100;
    this.gameProgress.innerHTML = `${this.currentQuestion + 1} de ${
      this.questions.length
    }`;
    this.tentatives = 3;
    this.availableTentatives.innerHTML = this.tentatives;
  }
  checkAnswer(answer) {
    if (this.gameOver) return;
    if (answer === this.questions[this.currentQuestion]) {
      this.score += this.points;
      this.scoreDisplay.innerHTML = this.score.toString().padStart(4, "0");
      this.nextQuestion();
    } else {
      this.tentatives--;
      this.availableTentatives.innerHTML = this.tentatives;
      this.points -= 25;

      if (this.tentatives === 0) {
        this.nextQuestion();
      }
    }
    if (this.currentQuestion === this.questions.length) {
      this.gameOver = true;
      this.finalScore.innerHTML = `Your final score is ${this.score}`;
      this.finalProgress.innerHTML = `Game Over`;
      this.finalTentatives.innerHTML = "";
      this.finalTentatives.classList.add("gameover");
    }
  }
}

//document ready
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer span");
  const gameButtons = document.querySelectorAll(".btn");
  const scoreDisplay = document.querySelector("#led strong");
  const gameProgress = document.querySelector(".pergunta");
  const availableTentatives = document.querySelector(".tentativas");

  gameButtons.forEach((button) => {
    button.addEventListener("click", function () {
      game.checkAnswer(button.getAttribute("data-answer"));
    });
  });

  const questionsSet = questions[Math.floor(Math.random() * questions.length)];
  footer.innerHTML = questionsSet
    .map((answer) => {
      return `<div class="answer answer-${answer}"></div>`;
    })
    .join("");

  const game = new Game({
    //return random question set
    questions: questionsSet,
    scoreDisplay,
    gameProgress,
    availableTentatives,
    gameButtons,
  });
  game.startGame();
});
