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
    }
]


