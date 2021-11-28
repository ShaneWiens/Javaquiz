var buttonEl = document.querySelector("#start-btn");

var timeEl = document.querySelector("#playTimer");

var questionEl = document.querySelector("#question-content");

var scoreEl = document.querySelector("#hi-scores");

var startEl = document.querySelector("#start-screen");

var currentQuestionEl = document.querySelector("#question");

var currentAnswersEl = document.querySelector("#answers");

var currentScoreEl = document.querySelector("#playerScore")

var questionActive = [
    {
        question: "Which of these is not a valid data type?",
        answersBtns: ["booleans", "alerts", "numbers", "strings"],
        answer: "alerts"
    },
    {
        question: "Document.queryselector('#data') would wfind hat element(s)?",
        answersBtns: ["First element with id = 'data'", "all elements with class = 'data'", "Last element with class 'data'", "all elements with class= 'data'"],
        answer: "First element with id = 'data'",
    },
    {
        question: "To combine arrays we use which command?",
        answersBtns: [".addtolist", ".concat", ".combine", ".uniteArray"],
        answer: ".concat",
    },
    {
        question: "Which of these dictates strict equality?",
        answersBtns: ["===", "!==", "==", ">=="],
        answer: "==="
    },
    {
        question: "Which of these is not a way to interact with the user using Javascript?",
        answersBtns: ["prompts", "alerts", "confirms", "console log"],
        answer: "console log"
    },
];

var timeLeft = 25;
var currentScore = 0;
currentScoreEl.textContent = "Current score: " + currentScore;
function displayTime() {
    startEl.setAttribute("class", "hide");
    questionEl.classList.remove("hide");
    var timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = timeLeft + "s remaining";

        // if (timeLeft === 0) {
        //     clearInterval(timerInterval);
        //     alert("game over");
        // }

    }, 1000);
    askQuestions()
};

function askQuestions() {
    currentQuestionEl.textContent = questionActive[i].question;

    questionActive[i].answer.forEach(function(answer, i){
    
        var answersBtns= document.createElement('button');
        answersBtns.setAttribute('class', 'answerBtn');
        answersBtns.setAttribute('value', answer);
        answersBtns.textContent = answer;

        answersBtns.onclick = answerClick;

        currentAnswersEl.append(answersBtns);
    });

    //for (i = 0, i < questionActive[0].Answers.length; i++;){
        
        // var answersBtns= document.createElement('button');
        // answersBtns.setAttribute('class', 'answerBtn');
        // answersBtns.setAttribute('value', questionActive[0].Answers[i]);

        // answersBtns.textContent = questionActive[0].Answers[i];

        // currentAnswersEl.append(answersBtns);
    //}
    currentAnswersEl.textContent
}

function answerClick(){
    console.log(this.value)
}

buttonEl.addEventListener("click", displayTime);