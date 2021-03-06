var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
}]

var questionsIndex = -1;
var timeLeft = 0;
var timer;
var score = 0;



var startBtn = document.querySelector('#startQuiz')
startBtn.addEventListener("click", start)

function start() {
    document.querySelector(".quizContainer").style.display = "block";
    document.querySelector(".cardHeader").style.display = "none"
    document.querySelector(".btn").style.display = "none";

    timeLeft = 60;
    document.querySelector("#timer").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.querySelector("#timer").innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}


var questionContainer = document.querySelector("#quizContent")

function endGame() {
    clearInterval(timer);

    questionContainer.innerHTML =  `
    <center><h1>Game over!</h1>
    <h2>You got a score of ` + score +  ` out of 100.</h2>
    <input class='input' type="text" id="name" placeholder="Type Initials"> 
    <button class='btn' onclick="setScore()">Set score!</button></center>`;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.querySelector('#name').value);
    getScore();
}


function getScore() {
    questionContainer.innerHTML =
    localStorage.getItem("highscoreName") + ` 's highscore is: ` + 
    localStorage.getItem('highscore') + 
    `<br> <button class='btn' onclick="clearScore()">Clear score!</button><button class='btn' onclick="resetGame()">Play Again!</button>`
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    
    
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    questionsIndex = -1;
    timeLeft = 0;
    timer;

    start();
}

function incorrect() {
    timeLeft -= 10; 
    next();
}


function correct() {
    score += 20;
    next();
}


function next() {
    questionsIndex++;

    if (questionsIndex > questions.length - 1) {
        endGame();
        return;
    }

    var questionText = "<h2>" + questions[questionsIndex].title + "</h2>"
    

    for (var i = 0; i < questions[questionsIndex].choices.length; i++) {
        
        var buttonCode = "<button class='btn' onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[questionsIndex].choices[i]);
        
        if (questions[questionsIndex].choices[i] == questions[questionsIndex].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        questionText += buttonCode
    }

    questionContainer.innerHTML = questionText;
}
