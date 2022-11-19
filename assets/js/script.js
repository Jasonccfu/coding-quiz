var timerEl = document.getElementById("timer");
var introSection = document.getElementById("intro");
var startButton = document.getElementById("start");
var quiz = document.getElementById("quiz");
var results = document.getElementById("results");
var scores = document.getElementById("scores");
var correctButton = document.getElementById("correct");
var feedback = document.getElementById("feedback");
var highScore = document.getElementById("highscores");
var record = document.getElementById("record");
var localStorage = [];
var output = "";

//intro section
timerEl.innerHTML = "Time: " + 60;
timeRun = true;
timeStop = false;
var counter = 60;

//viewScore
highScore.addEventListener("click", function () {
  introSection.style.display = "none";
  viewHighScores();
});

// quiz
var score = 0;
results.innerHTML = score;
results.style.display = "none";
feedback.style.display = "block";
highScore.style.display = "block";

//questions
var questions = [
  {
    title:
      "Question(1): Which of the following are capabilities of functions in JavaScript?",
    answers: [
      {
        label: "A) Return a value",
        isCorrect: false,
      },
      {
        label: "B) Accept parameters",
        isCorrect: true,
      },
      {
        label: "C) Accept parameters and Return a value",
        isCorrect: false,
      },
      {
        label: "D) All of the above",
        isCorrect: false,
      },
    ],
  },
  {
    title: "Question(2): What are variables used for in JavaScript Programs?",
    answers: [
      {
        label: "A) Storing numbers, dates, or other values",
        isCorrect: true,
      },
      {
        label: "B) Varying randomly",
        isCorrect: false,
      },
      {
        label: "C) Causing high-school algebra flashbacks",
        isCorrect: false,
      },
      {
        label: "D) None of the above",
        isCorrect: false,
      },
    ],
  },
  {
    title:
      "Question(3): Which method adds a new item to the end of an array and returns the new length?",
    answers: [
      {
        label: "A) shift()",
        isCorrect: false,
      },
      {
        label: "B) return()",
        isCorrect: false,
      },
      {
        label: "C) push()",
        isCorrect: true,
      },
      {
        label: "D) pop()",
        isCorrect: false,
      },
    ],
  },
  {
    title:
      "Question(4): Which of the following can't be done with client-side JavaScript?",
    answers: [
      {
        label: "A) Sending a form's contents by email",
        isCorrect: false,
      },
      {
        label: "B) Validating a form",
        isCorrect: false,
      },
      {
        label:
          "C) Storing the form's contents to a database file on the server",
        isCorrect: true,
      },
      {
        label: "D) None of the above",
        isCorrect: false,
      },
    ],
  },
];

quiz.style.display = "none";

//create quiz
function renderNewQuestion(index) {
  if (index === 4) {
    stopTimer();
    results.style.display = "block";
    results.innerHTML = " Well done! your score is: " + score;
    var getName = document.createElement("input");
    getName.placeholder = "Enter your initial";
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    results.appendChild(getName);
    results.appendChild(submitButton);
    results.style.display = "block";
    submitButton.addEventListener("click", function () {
      localStorage.setItem(getName.value, score);
      viewHighScores();
    });
  } else {
    introSection.style.display = "none";
    var title = document.createElement("h1");
    title.innerHTML = questions[index].title;
    var listOfAnswers = document.createElement("ol");

    for (var i = 0; i < 4; i++) {
      var singleAnswer = document.createElement("button");
      singleAnswer.innerHTML = questions[index].answers[i].label;
      if (questions[index].answers[i].isCorrect) {
        singleAnswer.addEventListener("click", function () {
          feedback.innerHTML = "Correct!";
          showFeedBack(true);
          score += 25;
          title.style.display = "none";
          listOfAnswers.style.display = "none";
          renderNewQuestion(index + 1);
        });
      } else {
        singleAnswer.addEventListener("click", function () {
          feedback.innerHTML = "Wrong!";
          showFeedBack(false);
          counter -= 15;
          title.style.display = "none";
          listOfAnswers.style.display = "none";
          renderNewQuestion(index + 1);
        });
      }
      listOfAnswers.appendChild(singleAnswer);
    }
    quiz.appendChild(title);
    quiz.appendChild(listOfAnswers);
    quiz.style.display = "block";
  }
}

//start
startButton.addEventListener("click", function () {
  startTimer();
  renderNewQuestion(0);
});

//score
function viewHighScores() {
  timerEl.style.display = "none";
  results.style.display = " none";
  record.style.display = "block";
  var highScore = document.createElement("h1");
  highScore.innerHTML = "High Scores:";
  record.appendChild(highScore);
  for (var i = 0; i < localStorage.length; i++) {
    var tempKey = localStorage.key(i);
    console.log(tempKey);

    var tempVal = localStorage.getItem(tempKey);
    console.log(tempVal);

    var createLi = document.createElement("li");
    createLi.innerHTML = tempKey + " - Score: " + tempVal;
    record.appendChild(createLi);
  }

  var homePage = document.createElement("button");
  var clearnAll = document.createElement("button");

  clearnAll.addEventListener("click", function () {
    localStorage.clear();
  });
  homePage.addEventListener("click", function () {
    location.replace("./index.html");
  });
  homePage.innerHTML = "Go Back";
  clearnAll.innerHTML = "Clear All";
  record.appendChild(homePage);
  record.appendChild(clearnAll);
}

//feedback
var feedbackCount = 0;
function showFeedBack(isCorrect) {
  if (isCorrect === true) {
    myInterval = setInterval(function () {
      feedbackCount++;
      if (feedbackCount >= 1) {
        clearInterval(myInterval);
        feedback.innerHTML = "";
        feedbackCount = 0;
      }
    }, 1000);
  } else if (isCorrect === false) {
    myInterval = setInterval(function () {
      feedbackCount++;
      if (feedbackCount >= 1) {
        clearInterval(myInterval);
        feedback.innerHTML = "";
        feedbackCount = 0;
      }
    }, 1000);
  } else {
    feedback.innerHTML = "";
  }
}

//time function
var timedOut;
function startTimer() {
  timerEl.innerHTML = "Time: " + 60;
  timedOut = setInterval(function () {
    timerEl.innerHTML = "Time: " + counter;
    counter--;
    if (counter <= 0) {
      clearInterval(timedOut);
      quiz.style.display = "none";
      introSection.style.display = "block";
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timedOut);
  timerEl.innerHTML = "Time: " + counter;
}
