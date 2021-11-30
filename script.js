var buttonEl = document.querySelector("#start-btn");

var timeEl = document.querySelector("#playTimer");

var questionEl = document.querySelector("#question-content");

var scoreEl = document.querySelector("#hi-scores");

var startEl = document.querySelector("#start-screen");

var currentQuestionEl = document.querySelector("#question");

var currentAnswersEl = document.querySelector("#answers");

var currentScoreEl = document.querySelector("#playerScore")

var finalScoreEl = document.querySelector("#finalUserScores")
var finalUserScoreEl = document.querySelector("#finalScore")
var submitScore = document.querySelector("#submit")
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
var questionIndex = 0;
var timerInterval;
currentScoreEl.textContent = "Current score: " + currentScore;

function displayTime() {
    startEl.setAttribute("class", "hide");
    questionEl.classList.remove("hide");
    timerInterval = setInterval(function () {
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

    currentQuestionEl.textContent = questionActive[questionIndex].question;
    currentAnswersEl.innerHTML = '';

    questionActive[questionIndex].answers.forEach(function (answers) {

        var answersBtns = document.createElement('button');
        answersBtns.setAttribute('class', 'answerBtn');
        answersBtns.setAttribute('value', answers);
        answersBtns.textContent = answers;

        answersBtns.onclick = answerClick;

        currentAnswersEl.append(answersBtns);

    })
}

function answerClick() {
    console.log(this.value)

    if (this.value === questionActive[questionIndex].correctAnswer) {
        currentScore = currentScore + 2;
        currentScoreEl.textContent = "Current score: " + currentScore;
    }
    else {
        timeLeft -= 5;
        timeEl.textContent = timeLeft + "s remaining";
    }

    questionIndex++;


    // console.log(questionActive[questionIndex].correctAnswer)
    // console.log(currentScore)
    if (questionIndex === questionActive.length) {
        currentScore = currentScore + timeLeft;

        endGame();
    }
    else {
        askFirstQuestion()
    }

}


var finalScore = 0

function endGame() {
    finalScore = currentScore + timeLeft;
    clearInterval(timerInterval)
    console.log(finalScore)
    finalUserScoreEl.innerHTML = finalScore;
    finalScoreEl.classList.remove("hide")
    questionEl.classList.add("hide")

}

function recordScore() {
    var initialsEl = document.querySelector("#initials").value;
    var highScores = JSON.parse(localStorage.getItem('localScores')) || [];

    var newScore = {
        initials: initialsEl,
        score: finalScore
    }

    highScores.push(newScore);
    localStorage.setItem('localScores', JSON.stringify(highScores))
    topScores()
}
var olEl = document.querySelector("#scoresList")
var scoreListEl = document.querySelector("#hi-scores")
// grab and sort local storage, create elements to house scores
function topScores() {
    finalScoreEl.classList.add("hide")
    scoreListEl.classList.remove("hide")
    var highScores = JSON.parse(localStorage.getItem('localScores')) || [];
    console.log(highScores)
    // highScores.sort(function (a, b) {
    //     return b.score - a.score;
    // });
    highScores.forEach(function (score) {
console.log(score.initials)
        //create our element
        var liEl = document.createElement('li');

        //add the text content to the element 
        liEl.setAttribute('value',score);
        liEl.textContent = score.initials + ' - ' + score.score;

        //append the element to the ol
        
         olEl.append(liEl);
    })
}


submitScore.addEventListener("click", recordScore);
buttonEl.addEventListener("click", displayTime);
document.querySelector('#restart').addEventListener('click', function(){
    window.location.reload()
})