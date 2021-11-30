// Gaze upon my variable, for they are many, one might even say varied...But in all seriousness, this is the list of variable I either forsaw using or had the sanity to place them at the top as I made them

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

// This is by far the largest variable I've ever done created for myself. An entire array of objects! have you ever seen anything like it?! Probably, this isn't your first rodeo

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

// This is my timer, it times you. It also ask you ask a question!
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
    askQuestion()
};

// clears and creates the question card element. 
function askQuestion() {

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

// when a user selects an answer the info is processed and if correct awarded points. If incorrect the lose time. This also increases the global question index and goes back into the question

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


//   if the last question was asked, the game ends, other wise ask another question
    if (questionIndex === questionActive.length) {
        currentScore = currentScore + timeLeft;

        endGame();
    }
    else {
        askQuestion()
    }

}


var finalScore = 0
// ends the game and changes from questions to score entry 
function endGame() {
    finalScore = currentScore + timeLeft;
    clearInterval(timerInterval)
    console.log(finalScore)
    finalUserScoreEl.innerHTML = finalScore;
    finalScoreEl.classList.remove("hide")
    questionEl.classList.add("hide")

}
// score is recorded with initials
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
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
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