// set of questions array
var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
}, 
{
    title: "The condition in an if/else statement is enclosed within __________.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
}, 
{
    title: "Arrays in JavaScript can be used to store __________.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
}, 
{   title: "String values must be enclosed within __________ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
}, 
{  title: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
}, 
]

//global variables
var questionsIndex = -1;
var timeLeft = 0;
var timer;
var score = 0;


//Start button
var startBtn = document.querySelector('#startQuiz')
startBtn.addEventListener("click", start)

//Initiates the timer and quiz
function start() {
    //When user clicks on the start button the container specific for quiz content will display and will hide the instructions and start button 
    document.querySelector(".quizContainer").style.display = "block";
    document.querySelector(".cardHeader").style.display = "none";
    document.querySelector(".cardFooter").style.display = "none";
    document.querySelector(".btn").style.display = "none";

    //time start
    timeLeft = 75;
    document.querySelector("#timer").innerHTML = timeLeft;

    //time subtracting and ends quiz when time is up
    timer = setInterval(function() {
        timeLeft--;
        document.querySelector("#timer").innerHTML = timeLeft;
    
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(); 
        }
    }, 1000);
    //function to loop through questions
    next();
}

//Global variable for div specific to hold quiz content 
var questionContainer = document.querySelector("#quizContent")

//Function that will notify user the end of quiz and can input score
function endQuiz() {
    clearInterval(timer);

    questionContainer.innerHTML =  `
    <center><h1>You have been QUIZZED! 
    <hr><h2>How did you do?</h2>
    <h3>You got a score of ` + score +  ` out of 100.</h3>
    <input class='input' type="text" id="name" placeholder="Type Your Initials Here"> 
    <button class='btn' onclick="setScore()">Set score!</button></center>`;
}


// Functions to store, retrieve, and clear user's score
function setScore() {
    localStorage.setItem("highscore", score) + localStorage.setItem("highscoreName",  document.querySelector('#name').value);
    getScore();
}


function getScore() {
    questionContainer.innerHTML ="<h2> <center>" +
    localStorage.getItem("highscoreName") + ` 's highscore is: ` + 
    localStorage.getItem('highscore') + 
    `<br /> <button class='btn' onclick="clearScore()">Clear score!</button><button class='btn' onclick="resetGame()">Redo!</button>`
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//Function that will reset the game for user and starts the quiz over
function resetGame() {
    clearInterval(timer);
    score = 0;
    questionsIndex = -1;
    timeLeft = 0;
    timer;

    start();
}

//Function that will subtract time from timer if user answers incorrectly
function incorrect() {
    timeLeft -= 10; 
    next();
}

//Function that will add points to user's score when questions is answered correctly
function correct() {
    score += 20;
    next();
}

// Function that will loop through the questions
function next() {
    questionsIndex++;

    if (questionsIndex > questions.length - 1) {
        endQuiz();
        return;
    }

    //displays questions in div specified
    var questionText = "<h3>" + questions[questionsIndex].title + "</h3>"
    
    //choice buttons loop
    for (var i = 0; i < questions[questionsIndex].choices.length; i++) {
        
        //creating choices button
        var buttonCode = "<button class='choiceBtn' onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[questionsIndex].choices[i]);
        
        //how answer choices will be evaluated
        if (questions[questionsIndex].choices[i] == questions[questionsIndex].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        questionText += buttonCode
    }

    
    questionContainer.innerHTML = questionText;
}