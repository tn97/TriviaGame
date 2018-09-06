// causes for the information to appear upon button click
$("#btn-instructions").on("click", function () {

  // causes the information to show
  $("#game-information").css("display", "block");
  // causes the list to show
  $("#ul-list").css("display", "block");
  // hides the instructions button
  $("#btn-instructions").css("display", "none");
  // debug purposes
  console.log("instructions button clicked");
});

// begins the game once game starts
$("#btn-start").on("click", function () {
  // hides the instructions button if they didn't press it
  $("#btn-instructions").css("display", "none");
  // hides the information panel
  $("#game-information").css("display", "none");
  $("#ul-list").css("display", "none");
  // hides the "start" button
  $("#btn-start").css("display", "none");
})

// var timerObject = {
//   // declaring variables needed for the time controls
//   number: 30,
//   intermission: 4,
//   intervalId,
//   waitPeriod: 5,

//   reset() {
//     number = 30;
//     clearInterval(this.intervalId);
//     this.intervalId = setInterval(decrement, 1000);
//   },

//   decrement() {
//     number--;
//     $("#timer").text("You have: " + number + " seconds remaining");

//     if (number === 0) {
//       this.intermission();
//     }
//   },

//   intermission() {
//     intermission--;
//     if (intermission === 0) {
//       this.nextQuestion();
//     }
//   }
// };

var triviaQuestions = [{
  question: "In Final Fantasy 6, what did Cid Del Norte Marquez invent?",
  answerList: ["Airshrips", "Magacite", "The Slace Crown", "Magitek"],
  answer: 3
}, {
  question: "How many playable characters are there in Final Fantasy 6?",
  answerList: [8, 10, 12, 14],
  answer: 3
}, {
  question: "In the game, it can be seen that Cloud carries around his sword on his back, without a sheath. How does he accomplish this?",
  answerList: ["Magnet on his back", "It magically sticks", "Voodoo magic", "Cloud is a magician"],
  answer: 0
}, {
  question: "Which game had the largest budget to date when it was released? Being an extremely massive production for it's time, the game costed about $45 million to make, translating to $65 million in 2015 dollars.",
  answerList: ["Final Fantasy 6", "Final Fantasy 7", "Final Fantasy 10", "Final Fantasy 15"],
  answer: 1
}, {
  question: "Which game disallowed the renaming of characters besides the main character?",
  answerList: ["Final Fantasy 6", "Final Fantasy 7", "Final Fantasy 10", "Final Fantasy 15"],
  answer: 2
}, {
  question: "How much did Final Fantasy 10 cost to make?",
  answerList: ["$4 Billion Japanese Yen", "$32 Million Japanese Yen", "$34 Million US Dollars", "$223 Million US Dollars"],
  answer: 0
}, {
  question: "This game features two main locations. One is a floating moon-like world, called Cocoon; which was made by the fal'Cie. Which game is this referring to?",
  answerList: ["Final Fantasy 6", "Final Fantasy 13", "Final Fantasy 10", "Final Fantasy 15"],
  answer: 1
}, {
  question: "In Final Fantasy 13, our heroine protagonist is referring to as 'Lightning', but what is her real name?",
  answerList: ["Clarizze Farron", "Eclaire Farron", "Clear Farron", "Claire Farron"],
  answer: 3
}, {
  question: "Which Final Fantasay game features 13 Kings and the son who becomes the predecessor to his father's thrown and saves the Kingdom?",
  answerList: ["Final Fantasy 6", "Final Fantasy 13", "Final Fantasy 10", "Final Fantasy 15"],
  answer: 3
}];
var gifArray = ["question1", "question2", "question 3", "question4", "question5", "question6", "question7", "question8", "question9"];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
  correct: "Yes, that's correct!",
  incorrect: "Well, you tried",
  endTime: "Aaaand you're outttaaa here!",
  finished: "Congratulations! Let's see how well you did."
};

$("#btn-start").on("click", function () {
  $(this).hide();
  newGame();
});

$("#startOverBtn").on("click", function () {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#finalMessage").empty();
  $("correctAnswers").empty();
  $("incorrectAnswers").empty();
  $("unanswered").empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();
  answered = true;

  // sets up new questions & answerList
  $(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
  for (var i = 0; i < 4; i++) {
    var choices = $("<div>");
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({ "data-index": i });
    choices.addClass("thisChoice");
    $(".answerList").append(choices);
  }
  countdown();
  // clicking an answer will pause the time and set up answerPage
  $(".thisChoice").on("click", function () {
    userSelect = $(this).data("index");
    clearInterval(time);
    answerPage();
  });
}

function countdown() {
  seconds = 15;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  answered = true;

  //sets the timer to depreciate
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage() {
  $(".thisChoice").empty();
  $(".question").empty();

  var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  $("#gif").html("<img src = 'assets/images/ff7Victory.gif' width= = '400px'>");
  //checks to see if correct, incorrect, or unanaswered
  if ((userSelect == rightAnswerIndex) && (answered == true)) {
    correctAnswer++;
    $("#message").html(messages.correct);
  } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
    incorrectAnswer++;
    $("#message").html("messages.incorrect");
    $("correctedAnswer").html("The correct answer was: " + rightAnswerText);
  } else {
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == (triviaQuestions.length - 1)) {
    setTimeout(scoreboard, 5000)
  } else {
    currentQuestion++;
    setTimeout(newQuestion, 5000);
  }
}

function scoreboard() {
  $("#timeLeft").empty();
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();

  $("finalMessage").html(messages.finished);
  $("#correctedAnswers").html("Correct Answeres: " + correctAnswer);
  $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
  $("#unanswered").html("Unanswered: " + unanswered);
  $("#startOverBtn").addClass("reset");
  $("#startOverBtn").show();
  $("#startOverBtn").html("Start Over?");
}