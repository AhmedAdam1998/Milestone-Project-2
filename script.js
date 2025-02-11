// NBA Quiz Game Javascript
// Select elements from the HTML
const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");
const restartButton= document.getElementById("restart-btn");
const scoreDisplay= document.getElementById("score");
const LandingOverlay= document.getElementById("landing-overlay");
const playNowBtn = document.getElementById("play-now-btn");
const quitModal = document.getElementById("quit-modal");
const confirmQuit = document.getElementById("confirm-quit");
const cancelQuit= document.getElementById("cancel-quit");

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
        question: "Who is the youngest player to score 60 points in a game?",
        answers: [
            {text: "Lebron James", correct: false},
            {text: "Luka Doncic", correct: false},
            {text: "Devin Booker", correct: true},
            {text: "Kevin Durant", correct: false}
        ]
    },
    {
        question:"Which player is known as 'The King'?",
        answers: [
            {text: "Michael Jordan", correct: false},
            {text: "Lebron James", correct: true},
            {text: "Kobe Bryant", correct: false},
            {text: "Shaquille O'Neal", correct:false }
        ]
    },
    {
        question: "Which team is based in Chicago?",
        answers: [
            { text: "Chicago Bulls", correct: true },
            { text: "Detroit Pistons", correct: false },
            { text: "New York Knicks", correct: false },
            { text: "Boston Celtics", correct: false }
        ]
    },
    {
        question: "Who was known as 'His Airness'?",
        answers: [
            { text: "Kobe Bryant", correct: false },
            { text: "Michael Jordan", correct: true },
            { text: "LeBron James", correct: false },
            { text: "Kevin Durant", correct: false }
        ]
    },
    {
        question: "Which player is famous for his skyhook?",
        answers: [
            { text: "Magic Johnson", correct: false },
            { text: "Kareem Abdul-Jabbar", correct: true },
            { text: "Larry Bird", correct: false },
            { text: "Bill Russell", correct: false }
        ]
    },
    {
        question: "Which team drafted Kobe Bryant?",
        answers: [
            { text: "Los Angeles Lakers", correct: false },
            { text: "Charlotte Hornets", correct: true },
            { text: "Boston Celtics", correct: false },
            { text: "New York Knicks", correct: false }
        ]
    },
    {
        question: "Who is the NBA's all-time leading scorer?",
        answers: [
            { text: "Kareem Abdul-Jabbar", correct: true },
            { text: "Michael Jordan", correct: false },
            { text: "LeBron James", correct: false },
            { text: "Karl Malone", correct: false }
        ]
    },
    {
        question: "Who is the NBA's all-time leader in assists?",
        answers: [
            { text: "John Stockton", correct: true },
            { text: "Magic Johnson", correct: false },
            { text: "Steve Nash", correct: false },
            { text: "Jason Kidd", correct: false }
        ]
    }

];

let currentQuestionIndex= 0;
let score= 0;
let timeLeft = 30;
let timerInterval;

//function to start the quiz
function startQuiz(){
clearInterval(timerInterval)
currentQuestionIndex =0;
score=0;
timeLeft=30;
scoreDisplay.innerText=score;

nextButton.innerText="Next Question";
nextButton.style.display="none";
restartButton.style.display = "block";

nextButton.onclick= nextQuestion;

resetState();
showQuestion();
}

// function to display the current question

function showQuestion() {
    resetState();
    clearInterval(timerInterval);

    timeLeft=30;
    document.getElementById("timer").innerText=timeLeft;

    let currentQuestion = nbaQuestions[currentQuestionIndex];
    questionElement.innerText=currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        if (answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    timerInterval=setInterval(()=> {
        timeLeft--;
        document.getElementById("timer").innerText=timeLeft;

        if (timeLeft<=0){
            clearInterval(timerInterval);
            nextQuestion();

        }
    },1000);
}
// function to reset answer buttons before showing a new question
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// function to handle user's answer selection
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

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
        button.disabled = true;
    }
    );
    nextButton.style.display = "block";
}

// function to move to the next question
function nextQuestion() {
    clearInterval(timerInterval);
    currentQuestionIndex++;

    if (currentQuestionIndex < nbaQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Function to display final score
function showScore() {
    clearInterval(timerInterval);
    resetState();

    questionElement.innerText=`Game Over!`;
    nextButton.innerText= "Play Again!";
    nextButton.style.display="block";
    restartButton.style.display="block"

    nextButton.onclick=function(){
        showLandingPage();
    };
}

function showLandingPage(){

    questionElement.style.display="none";
    answerButtons.style.display="none";
    nextButton.style.display ="none";
    document.getElementById("quiz-info").style.display="none"

    LandingOverlay.style.display="flex";
}

function resumeTimer(){
    timerInterval=setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").innerText=timeLeft;
        if(timeLeft<=0){
            clearInterval(timerInterval);
            nextQuestion();
        }
    },1000);
}

// Event Listeners
restartButton.addEventListener("click", (e)=>{
    e.preventDefault();
    clearInterval(timerInterval);
    quitModal.showModal();
});

cancelQuit.addEventListener("click",()=>{
    quitModal.close();
    resumeTimer();
});

confirmQuit.addEventListener("click",()=>{
    quitModal.close();
    showLandingPage();
});

playNowBtn.addEventListener("click", ()=>{
    LandingOverlay.style.display="none";
    questionElement.style.display="block";
    answerButtons.style.display="flex";
    document.getElementById("quiz-info").style.display = "block";

    startQuiz();
});



