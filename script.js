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
        answers: ["booleans", "alerts", "numbers", "strings"],
        correctAnswer: "alerts"
    },
    {
        question: "Document.queryselector('#data') would find what element(s)?",
        answers: ["First element with id = 'data'", "all elements with class = 'data'", "Last element with class 'data'", "all elements with class= 'data'"],
        correctAnswer: "First element with id = 'data'",
    },
    {
        question: "To combine arrays we use which command?",
        answers: [".addtolist", ".concat", ".combine", ".uniteArray"],
        correctAnswer: ".concat",
    },
    {
        question: "Which of these dictates strict equality?",
        answers: ["===", "!==", "==", ">=="],
        correctAnswer: "==="
    },
    {
        question: "Which of these is not a way to interact with the user using Javascript?",
        answers: ["prompts", "alerts", "confirms", "console log"],
        correctAnswer: "console log"
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

        if (timeLeft < 1) {
            clearInterval(timerInterval);
            endGame();
        }

    }, 1000);
    askFirstQuestion()
};

function askFirstQuestion() {
    var questionIndex = 0;
    currentQuestionEl.textContent = questionActive[questionIndex].question;
    questionActive[questionIndex].answers.forEach(function (answers) {

        var answersBtns = document.createElement('button');
        answersBtns.setAttribute('class', 'answerBtn');
        answersBtns.setAttribute('value', answers);
        answersBtns.textContent = answers;

        answersBtns.onclick = answerClick;

        currentAnswersEl.append(answersBtns);

    })

    //for (i = 0, i < questionActive[0].Answers.length; i++;){

    // var answersBtns= document.createElement('button');
    // answersBtns.setAttribute('class', 'answerBtn');
    // answersBtns.setAttribute('value', questionActive[0].Answers[i]);

    // answersBtns.textContent = questionActive[0].Answers[i];

    // currentAnswersEl.append(answersBtns);
    //}
    function answerClick(event) {

        console.log(this.value)
        var userAwnser = event.target.value;

        if (userAwnser === questionActive[questionIndex].correctAnswer) {
            currentScore = currentScore + 2;
            currentScoreEl.textContent = "Current score: " + currentScore;
        }
        else {
            timeLeft = timeLeft - 2;
            timeEl.textContent = timeLeft + "s remaining";
        }
        console.log(userAwnser)
        console.log(questionActive[questionIndex].correctAnswer)
        console.log(currentScore)
        if (questionIndex > 4) {
            currentScore = currentScore + timeLeft;
            clearInterval(timerInterval);
            endGame();
        }
        else {
            askNextQuestion();
            function askNextQuestion() {

                function removeAnswers(currentAnswersEl) {
                    while (currentAnswersEl.firstChild) {
                        currentAnswersEl.removeChild(currentAnswersEl.firstChild);
                    }
                }
                const lastAnswers = document.querySelector("#answers");
                removeAnswers(lastAnswers)
                questionIndex++;
                // currentQuestionEl.textContent = questionActive[questionIndex].question;
                // for (i = 0, i < questionActive[questionIndex].answers.length; i++;) {
                //     var placeHolder = document.getElementById("answers").child[i];
                //     placeHolder.setAttribute('class', 'answerBtn');
                //     placeHolder.setAttribute('value', questionActive[questionIndex].answers[i]);
                //     placeHolder.textContent = questionActive[questionIndex].answers[i];
                // }
                currentQuestionEl.textContent = questionActive[questionIndex].question;
                questionActive[questionIndex].answers.forEach(function (answers) {

                    var nextAnswersBtns = document.createElement('button');
                    nextAnswersBtns.setAttribute('class', 'answerBtn');
                    nextAnswersBtns.setAttribute('value', answers);
                    nextAnswersBtns.textContent = answers;

                    nextAnswersBtns.onclick = answerClick;

                    currentAnswersEl.append(nextAnswersBtns);
                })
            }
        }

    }
}





function endGame() {
    alert("Game Over")
    
}


buttonEl.addEventListener("click", displayTime);