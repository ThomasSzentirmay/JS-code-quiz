// QUESTION DATA
var questions = [
    {
        question: "What is JavaScript?",
        options: [
            "A programming language used to make websites interactive",
            "A markup language for creating website structures",
            "A style sheet language used for website design",
            "A database management system",
        ],
        answer: "A programming language used to make websites interactive",
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["let", "variable", "var", "const"],
        answer: "var",
    },
    {
        question: 'What is the result of 3 + "7" in JavaScript?',
        options: ["10", "37", "21", "NaN"],
        answer: "37",
    },
    {
        question: "Which built-in method is used to convert a string to lowercase?",
        options: [
            "toLowerCase()",
            "toLower()",
            'changeCase("lower")',
            "lowerCase()",
        ],
        answer: "toLowerCase()",
    },
    {
        question:
            'What is the purpose of the "document.getElementById()" method?',
        options: [
            "To retrieve an HTML element based on its class",
            "To retrieve an HTML element based on its ID",
            "To retrieve an HTML element based on its tag name",
            "To retrieve an HTML element based on its value",
        ],
        answer: "To retrieve an HTML element based on its ID",
    },
    {
        question: 'What does the "=== operator" do in JavaScript?',
        options: [
            "Checks for value equality without type conversion",
            "Assigns a value to a variable",
            "Performs arithmetic addition",
            "Compares two variables",
        ],
        answer: "Checks for value equality without type conversion",
    },
    {
        question:
            "Which array method adds new elements to the end of an array and returns the new length?",
        options: ["push()", "concat()", "slice()", "pop()"],
        answer: "push()",
    },
    {
        question:
            'What is the purpose of the "addEventListener()" method in JavaScript?',
        options: [
            "To add a new CSS class to an HTML element",
            "To remove an HTML element from the DOM",
            "To attach an event handler function to an HTML element",
            "To change the text content of an HTML element",
        ],
        answer: "To attach an event handler function to an HTML element",
    },
    {
        question:
            "What is the correct way to write a single-line comment in JavaScript?",
        options: [
            "// This is a comment",
            "<!-- This is a comment -->",
            "* This is a comment *",
            "# This is a comment",
        ],
        answer: "// This is a comment",
    },
    {
        question: 'What does the "typeof" operator return for an array?',
        options: ["object", "array", "string", "boolean"],
        answer: "object",
    },
];

var startBtn = document.querySelector("#start");
var messageContainer = document.querySelector("#message-container");
var quizContainer = document.querySelector("#quiz-container");
var timerElement = document.querySelector("#timer");
var timeSection = document.querySelector('#time-container');
var countdown;
var questionElement = document.querySelector("#question");
var choicesElement = document.querySelector("#choices");
var resultElement = document.querySelector("#result");
var currentQuestionIndex = 0;
var timer = 90;

timeSection.style.display = "none";

function startGame() {
    messageContainer.style.display = "none";
    document.querySelector("main").style.display = "flex";
    timeSection.style.display = "block";
    timerElement.textContent = timer;
    countdown = setInterval(function () {
        timer--;
        if (timer >= 0) {
            timerElement.textContent = timer;
        } else {
            clearInterval(countdown);
            console.log("Time's up!");
            endGame();
        }
    }, 1000);
    displayQuestion();
}

startBtn.addEventListener("click", startGame);

function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    for (var i = 0; i < currentQuestion.options.length; i++) {
        var choice = currentQuestion.options[i];
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.classList.add("choice");
        button.textContent = choice;
        li.appendChild(button);
        choicesElement.appendChild(li);
    }
    choicesElement.addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
    var selectedChoice = event.target.textContent;
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedChoice === currentQuestion.answer) {
        resultElement.textContent = "Correct!";
        setTimeout(function () {
            resultElement.textContent = "";
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                console.log("Quiz completed!");
                endGame();
            }
        }, 1000);
    } else {
        resultElement.textContent = "Wrong!";
        if (timer > 5) {
            timer -= 5;
        } else {
            timer = 0;
        }
        timerElement.textContent = timer;
    }
}

function endGame() {
    if (timer <= 0) {
        quizContainer.style.display = 'none';
        timeSection.style.display = 'none';
    }

    var initialInput = document.querySelector('input');
    initialInput.style.display = 'block';

    var submitBtn = document.querySelector('#submit');
    submitBtn.style.display = 'block';

    var answerResultEl = document.getElementById('result');
    answerResultEl.style.display = 'none';

    if (currentQuestionIndex === questions.length) {
        questionElement.textContent = '';
        choicesElement.innerHTML = '';
    }

    if (currentQuestionIndex === questions.length && timer > 0) {
        timerElement.style.display = 'none';
        displayEndGameMessage('You Win!', 'Congratulations! We have a programmer on our hands :)');
    } else if (timer <= 0) {
        displayEndGameMessage('Unlucky!', 'Oh well... can always try again :)');
    }
}

function displayEndGameMessage(title, message) {
    var endGameSection = document.querySelector('#end-game-message');
    var titleElement = endGameSection.querySelector('h1');
    var messageElement = endGameSection.querySelector('p');

    titleElement.textContent = title;
    messageElement.textContent = message;

    endGameSection.style.display = 'block';
}

function logScores() {
    var initialsInput = document.getElementById('initials').value.trim();
    var correctAnswers = currentQuestionIndex;

    if (initialsInput !== '') {
        var score = {
            initials: initialsInput,
            correctAnswers: correctAnswers
        };

        var scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(score);
        localStorage.setItem('scores', JSON.stringify(scores));

        document.getElementById('initials').value = '';

        console.log('Score logged successfully!');
    } else {
        console.log('Please enter your initials!');
    }
}

window.addEventListener('DOMContentLoaded', function () {
    var highscoresList = document.getElementById('highscores-list');

    var scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.sort(function (a, b) {
        return b.correctAnswers - a.correctAnswers;
    });

    scores.forEach(function (score) {
        var listItem = document.createElement('li');
        listItem.textContent = score.initials + ' - ' + score.correctAnswers + ' correct answers';
        highscoresList.appendChild(listItem);
    });
});

var submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', logScores);  