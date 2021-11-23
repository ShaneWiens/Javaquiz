var buttonEl = document.querySelector("#start-btn");


var timeEl = document.querySelector("#playTimer");
var questionEl = document.querySelector("#question-content");
var scoreEl = document.querySelector("#hi-scores");
var startEl = document.querySelector("#start-screen");
var currentQuestionEl = document.querySelector("#question");
var currentAnswersEl = document.querySelector("#answers");
var currentScore = document.querySelector("#playerScore")
var questionActive = [
    {
        Question: "test",
        Answers: ['a', 'b','c'],
        correctAnswer: "b",
    },
];
var timeLeft = 25;
currentScore = 0;
currentScore.textContent = currentScore;
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
    currentQuestionEl.textContent = questionActive[0].Question;

    questionActive[0].Answers.forEach(function(answer, i){
    
        var answersBtns= document.createElement('button');
        answersBtns.setAttribute('class', 'answerBtn');
        answersBtns.setAttribute('value', answer);
        answersBtns.textContent = answer;

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
    currentAnswersEl.textContent
}

function answerClick(){
    console.log(this.value)
}

buttonEl.addEventListener("click", displayTime);