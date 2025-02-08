// NBA Quiz Game Javascript
// Select elements from the HTML
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");
const restartButton= document.getElementById("restart-btn");
const scoreDisplay= document.getElementById("score");

// Quiz Data (NBA Questions)
const nbaQuestions = [
    {
        question: "Who holds the record for most points in a single NBA game?",
        answers: [
            {text: "Michael Jordan", correct: false},
            {text: "Wilt Chamberlain", correct: true},
            {text: "Lebron James", correct: false},
            {text: "Kobe Bryant", correct: false}
        ]
    },
    {
        question:"Which team has won the most NBA championships?",
        answers: [
            {text: "Los Angeles Lakers", correct: false},
            {text: "Chicago Bulls", correct: false},
            {text: "Boston Celtics", correct: true},
            {text: "Golden State Warriors", correct: false}
        ]
    },
    {
        question: "Who is the youngest player to score 60 points in a game?"
        answers: [
            {text: "Lebron James", correct: false},
            {text: "Luka Doncic", correct: false},
            {text: "Devin Booker", correct: true},
            {text: "Kevin Durant", correct: false},
        ]
    }

];

let currentQuestionIndex= 0;
let score= 0;

//function to start the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText= score;
    nextButton.style.display= "none";
    showQuestion();
}

//

