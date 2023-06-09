// QUESTION DATA
var questions = [
    {
        question: "What is JavaScript?",
        options: [
            "A. A programming language used to make websites interactive",
            "B. A markup language for creating website structures",
            "C. A style sheet language used for website design",
            "D. A database management system",
        ],
        answer: "A",
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["A. let", "B. variable", "C. var", "D. const"],
        answer: "C",
    },
    {
        question: 'What is the result of 3 + "7" in JavaScript?',
        options: ["A. 10", "B. 37", "C. 21", "D. NaN"],
        answer: "B",
    },
    {
        question: "Which built-in method is used to convert a string to lowercase?",
        options: [
            "A. toLowerCase()",
            "B. toLower()",
            'C. changeCase("lower")',
            "D. lowerCase()",
        ],
        answer: "A",
    },
    {
        question: 'What is the purpose of the "document.getElementById()" method?',
        options: [
            "A. To retrieve an HTML element based on its class",
            "B. To retrieve an HTML element based on its ID",
            "C. To retrieve an HTML element based on its tag name",
            "D. To retrieve an HTML element based on its value",
        ],
        answer: "B",
    },
    {
        question: 'What does the "=== operator" do in JavaScript?',
        options: [
            "A. Checks for value equality without type conversion",
            "B. Assigns a value to a variable",
            "C. Performs arithmetic addition",
            "D. Compares two variables",
        ],
        answer: "A",
    },
    {
        question:
            "Which array method adds new elements to the end of an array and returns the new length?",
        options: ["A. push()", "B. concat()", "C. slice()", "D. pop()"],
        answer: "A",
    },
    {
        question:
            'What is the purpose of the "addEventListener()" method in JavaScript?',
        options: [
            "A. To add a new CSS class to an HTML element",
            "B. To remove an HTML element from the DOM",
            "C. To attach an event handler function to an HTML element",
            "D. To change the text content of an HTML element",
        ],
        answer: "C",
    },
    {
        question:
            "What is the correct way to write a single-line comment in JavaScript?",
        options: [
            "A. // This is a comment",
            "B. <!-- This is a comment -->",
            "C. * This is a comment *",
            "D. # This is a comment",
        ],
        answer: "A",
    },
    {
        question: 'What does the "typeof" operator return for an array?',
        options: ["A. object", "B. array", "C. string", "D. boolean"],
        answer: "A",
    },
];

// FETCH ELEMENTS WITH QUERYSELECTOR TO USE
var startBtn = document.getElementById("start");
var messageContainer = document.getElementById("message-container");
var quizContainer = document.getElementById("quiz-container");
var timerElement = document.getElementById("timer");
var countdown;

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
}

startBtn.addEventListener("click", startGame);

