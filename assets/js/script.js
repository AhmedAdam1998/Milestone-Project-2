/**
 * NBA Quiz Game Javascript
 *
 * This script controls the functionality of the NBA Quiz Game.
 */
/**
 * Select DOM elements.
 */
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const landingOverlay = document.getElementById("landing-overlay");
const playNowBtn = document.getElementById("play-now-btn");
const quitModal = document.getElementById("quit-modal");
const confirmQuit = document.getElementById("confirm-quit");
const cancelQuit = document.getElementById("cancel-quit");

/**
 * Quiz Data (NBA Questions)
 */
const nbaQuestions = [
  {
    question: "Who holds the record for most points in a single NBA game?",
    answers: [
      { text: "Michael Jordan", correct: false },
      { text: "Wilt Chamberlain", correct: true },
      { text: "Lebron James", correct: false },
      { text: "Kobe Bryant", correct: false },
    ],
  },
  {
    question: "Which team has won the most NBA championships?",
    answers: [
      { text: "Los Angeles Lakers", correct: false },
      { text: "Chicago Bulls", correct: false },
      { text: "Boston Celtics", correct: true },
      { text: "Golden State Warriors", correct: false },
    ],
  },
  {
    question: "Who is the youngest player to score 60 points in a game?",
    answers: [
      { text: "Lebron James", correct: false },
      { text: "Luka Doncic", correct: false },
      { text: "Devin Booker", correct: true },
      { text: "Kevin Durant", correct: false },
    ],
  },
  {
    question: "Which player is known as 'The King'?",
    answers: [
      { text: "Michael Jordan", correct: false },
      { text: "Lebron James", correct: true },
      { text: "Kobe Bryant", correct: false },
      { text: "Shaquille O'Neal", correct: false },
    ],
  },
  {
    question: "Which team is based in Chicago?",
    answers: [
      { text: "Chicago Bulls", correct: true },
      { text: "Detroit Pistons", correct: false },
      { text: "New York Knicks", correct: false },
      { text: "Boston Celtics", correct: false },
    ],
  },
  {
    question: "Who was known as 'His Airness'?",
    answers: [
      { text: "Kobe Bryant", correct: false },
      { text: "Michael Jordan", correct: true },
      { text: "LeBron James", correct: false },
      { text: "Kevin Durant", correct: false },
    ],
  },
  {
    question: "Which player is famous for his skyhook?",
    answers: [
      { text: "Magic Johnson", correct: false },
      { text: "Kareem Abdul-Jabbar", correct: true },
      { text: "Larry Bird", correct: false },
      { text: "Bill Russell", correct: false },
    ],
  },
  {
    question: "Which team drafted Kobe Bryant?",
    answers: [
      { text: "Los Angeles Lakers", correct: false },
      { text: "Charlotte Hornets", correct: true },
      { text: "Boston Celtics", correct: false },
      { text: "New York Knicks", correct: false },
    ],
  },
  {
    question: "Who is the NBA's all-time leading scorer?",
    answers: [
      { text: "Kareem Abdul-Jabbar", correct: true },
      { text: "Michael Jordan", correct: false },
      { text: "LeBron James", correct: false },
      { text: "Karl Malone", correct: false },
    ],
  },
  {
    question: "Who is the NBA's all-time leader in assists?",
    answers: [
      { text: "John Stockton", correct: true },
      { text: "Magic Johnson", correct: false },
      { text: "Steve Nash", correct: false },
      { text: "Jason Kidd", correct: false },
    ],
  },
];

/**
 * Update the total question count in the landing overlay.
 */

document.getElementById("total-questions").innerText = nbaQuestions.length;

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

/**
 * Starts the quiz by resetting variables and displaying the first question.
 */
function startQuiz() {
  clearInterval(timerInterval);
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;
  scoreDisplay.innerText = score;

  nextButton.innerText = "Next Question";
  nextButton.style.display = "none";
  restartButton.style.display = "block";

  nextButton.onclick = nextQuestion;

  resetState();
  showQuestion();
}

/**
 * Displays the current question along with its answer choices.
 */

function showQuestion() {
  resetState();
  clearInterval(timerInterval);

  timeLeft = 30;
  document.getElementById("timer").innerText = timeLeft;

  document.getElementById("question-counter").innerText = `Question ${
    currentQuestionIndex + 1
  } of ${nbaQuestions.length}`;

  let currentQuestion = nbaQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}
/**
 * Resets the state by removing all answer buttons and hiding the Next button.
 */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/**
 * Handles the user's answer selection, updates the score, and disables all buttons.
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  clearInterval(timerInterval);

  if (correct) {
    selectedButton.style.backgroundColor = "green";
    score++;
    scoreDisplay.innerText = score;
  } else {
    selectedButton.style.backgroundColor = "red";
  }

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/**
 * Moves to the next question or shows the final score if there are no more questions.
 */
function nextQuestion() {
  clearInterval(timerInterval);
  currentQuestionIndex++;

  if (currentQuestionIndex < nbaQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

/**
 * Displays the final score and shows the "Play Again" button.
 */
function showScore() {
  clearInterval(timerInterval);
  resetState();

  questionElement.innerHTML = `Game Over!<br>Your Final score was: ${score}`;
  nextButton.innerText = "Play Again!";
  nextButton.style.display = "block";
  restartButton.style.display = "block";

  nextButton.onclick = function () {
    showLandingPage();
  };
}

/**
 * Displays the landing overlay and hides the quiz content.
 */
function showLandingPage() {
  questionElement.style.display = "none";
  answerButtons.style.display = "none";
  nextButton.style.display = "none";
  document.getElementById("quiz-info").style.display = "none";

  landingOverlay.style.display = "flex";
}

/**
 * Resumes the game timer from the current timeLeft value.
 */
function resumeTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

/**
 * Event Listeners for restart, quit modal, and play now button.
 */
restartButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearInterval(timerInterval);
  quitModal.showModal();
});

cancelQuit.addEventListener("click", () => {
  quitModal.close();
  resumeTimer();
});

confirmQuit.addEventListener("click", () => {
  quitModal.close();
  showLandingPage();
});

playNowBtn.addEventListener("click", () => {
  landingOverlay.style.display = "none";
  questionElement.style.display = "block";
  answerButtons.style.display = "flex";
  document.getElementById("quiz-info").style.display = "block";

  startQuiz();
});
