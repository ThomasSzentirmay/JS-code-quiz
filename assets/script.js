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
        question: 'What is the purpose of the "document.getElementById()" method?',
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

// FETCH ELEMENTS WITH QUERYSELECTOR TO USE
var startBtn = document.getElementById("start");
var messageContainer = document.getElementById("message-container");
var quizContainer = document.getElementById("quiz-container");
var timerElement = document.getElementById("timer");
var countdown;
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var resultElement = document.getElementById("result");
var currentQuestionIndex = 0;

// START GAME WITH START BUTTON

function startGame() {
    // HIDE MESSAGE SECTION
    messageContainer.style.display = "none";

    // SHOW QUIZ SECTION
    document.querySelector("main").style.display = "flex";

    var timeRemaining = 60; // INITIAL TIME IN SECONDS

    timerElement.textContent = timeRemaining;

    // START COUNTDOWN TIMER
    countdown = setInterval(function () {
        timeRemaining--;

        if (timeRemaining >= 0) {
            timerElement.textContent = timeRemaining;
        } else {
            clearInterval(countdown);
            console.log("Time's up!");
        }
    }, 1000);

    displayQuestion(); // Display the first question immediately
}

startBtn.addEventListener("click", startGame);


function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    questionElement.textContent = currentQuestion.question; // Display the question

    // Clear the choices element
    choicesElement.innerHTML = "";

    // Create and append choice buttons
    for (var i = 0; i < currentQuestion.options.length; i++) {
        var choice = currentQuestion.options[i];
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.classList.add("choice");
        button.textContent = choice;
        li.appendChild(button);
        choicesElement.appendChild(li);
    }

    // Attach event listener to the choices element using event delegation
    choicesElement.addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
    var selectedChoice = event.target.textContent; // Get the text content of the clicked button
    var currentQuestion = questions[currentQuestionIndex]; // Get the current question object

    if (selectedChoice === currentQuestion.answer) {
        resultElement.textContent = "Correct!"; // Display correct message
    } else {
        resultElement.textContent = "Wrong!"; // Display wrong message
        // Decrease the timer by 5 seconds only if the answer is incorrect
        if (timer > 5) {
            timer -= 5;
        } else {
            timer = 0; // Set the timer to 0 if it goes below 5 seconds
        }
    }

    // Update the timer element with the new value
    timerElement.textContent = timer;

    // Clear the result after 2 seconds
    setTimeout(function () {
        resultElement.textContent = "";
    }, 2000);

    // Move to the next question after 2 seconds
    setTimeout(function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            // Handle quiz completion here (e.g., show final score, submit form, etc.)
            console.log("Quiz completed!");
        }
    }, 2000);
}