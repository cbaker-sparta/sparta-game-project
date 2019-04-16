$(function () {


//https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple

//https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple

//https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple

// remember to comment out each section with its feature and console log as I go.

// Global variables

var $buttons = $(".button");
var $buttonPressed = "";

var $randomNumber = "";

var $question = "";
var $correctAnswer = "";
var $answers = [];

var $prizeValue = $(".progress-row");
var $progressLevel = 14;


// Functions

assignData();
// selectAndOutput();

// As a new player
// I need to be able to enter my name
// and instructions regarding the game
// and to be able to start the game
// So I can play the game
    // text field to enter the players name and button to confirm entry
    // next screen gives instructions with button to start game

function rollNumber() {
  var maxNum = 4;
  var randomAssigner =  Math.floor((Math.random() * (maxNum)));
  $randomNumber = randomAssigner;
}

function assignData() {

$.get("https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple", function(data) {
    $question = data.results[0].question;
    $("#question-box").html($question);
    $correctAnswer = data.results[0].correct_answer;
    assignCorrectAnswer();
    $answers = data.results[0].incorrect_answers;
    assignAnswers();
  });
}

function assignCorrectAnswer() {
  if ($randomNumber == 0) {
    $("#A").html("A. " + $correctAnswer);
    $correctAnswer = "A. " + $correctAnswer;
  }
  else if ($randomNumber == 1) {
    $("#B").html("B. " + $correctAnswer);
    $correctAnswer = "B. " + $correctAnswer;
  }
  else if ($randomNumber == 2) {
    $("#C").html("C. " + $correctAnswer);
    $correctAnswer = "C. " + $correctAnswer;
  }
  else if ($randomNumber == 3) {
    $("#D").html("D. " + $correctAnswer);
    $correctAnswer = "D. " + $correctAnswer;
  }
  console.log($correctAnswer);
}

function assignAnswers() {
  for (var i = 0; i < $buttons.length; i++) {
    if ($("#A").html() == "") {
      $("#A").html("A. " + $answers[i]);
      $answers[i]--;
    }
    else if ($("#B").html() == "") {
      $("#B").html("B. " + $answers[i]);
      $("#B").html("B. " + $answers[i]);
      $answers[i]--;
    }
    else if ($("#C").html() == "") {
      $("#C").html("C. " + $answers[i]);
      $("#C").html("C. " + $answers[i]);
      $("#C").html("C. " + $answers[i]);
      $answers[i]--;
    }
    else if ($("#D").html() == "") {
      $("#D").html("D. " + $answers[i]);
      $("#D").html("D. " + $answers[i]);
      $("#D").html("D. " + $answers[i]);
      $answers[i]--;
    }
  }
}

// function selectAndOutput() {
$($buttons).on("click", function () {
  if ($buttonPressed == "") {
    $(this).addClass("selected-answer");
    $buttonPressed = $(this);
  }
  setTimeout(function() {
    if ($correctAnswer == $buttonPressed.html()) {
      $buttonPressed.addClass(" correct-answer").html("Correct Answer!");
    }
    else {
      for (var i = 0; i < $buttons.length; i++) {
        if ($($buttons[i]).html() == $correctAnswer) {
          $($buttons[i]).addClass(" correct-answer").html("Correct Answer!");
        }
      }
    }
  }, 2000);
  if ($correctAnswer == $buttonPressed.html()) {
    setTimeout(function() {
      $(".speech-bubble").html('"Congratulations! You\'ve won!"').addClass(" message correct-answer");
      addProgress();
    }, 3000);
    setTimeout(function() {
      clearDataAndRun();
    }, 4000);
  }
  else if ($correctAnswer != $buttonPressed.html()) {
    setTimeout(function() {
      $buttonPressed.css("background-color", "gray").html("God, I'm sorry but you really are garbage! TRY AGAIN?");
      $(".speech-bubble").html('"Awwww, poor you. You leave today with nothing!"').addClass(" message wrong");
    }, 3000);
  }
})
// }

function addProgress() {
  $($prizeValue[$progressLevel]).addClass("current-progress");
  $progressLevel--;
}

function clearDataAndRun() {
  $(".button").html("").removeClass("selected-answer message correct-answer");
  $buttonPressed = "";
  $randomNumber = "";
  $question = "";
  $correctAnswer = "";
  $answers = [];
  $(".speech-bubble").html("Your next question is...");


  assignData();
  rollNumber();
  // selectAndOutput();
}
// As a new player
// I need to see the question clearly
// and see my options clearly
// So I can correctly attempt to answer the question and proceed with the game.
    // onlick "next question"?
    // change inner html/html of question box
    // change inner html/html of all answer boxes

// As a player
// I need to see my answer has been accepted/where my cursos is
// So I can be sure what my cursor is selecting/has selected
    // hover effect over buttons and color change onclick

// As a player
// I need to know if my answer was correct or incorrect
// So I can continue with the game
    // setTimeout once answer selected, correct answer shown after 2, flashing effect on correct answer
      // css change for correct answer - make each element/answer box an ID?
    // game over screen with money they have won - animations + message from lorraine kelly
      // css/js animation plus inner html/html change to text boxes and a large message from lorraine
    // continue to next question screen - animations + message from lorraine kelly
      // css/js animation plus inner html/html change to text boxes and a large message from lorraine

// As a player
// I need my progress recorded in the bar
// So I can know how I am doing in the game
    // progress bar that changes colour for each question.
      // on question change add css change to progress ID

// As a player
// I need to know when I have reached the threshold checkpoint
// and
// So I can

// As a designer
// I need to give the user some light feedback
// and make the game feel more interactive by making the game host output some messages
// So I can make it more exciting
    // image of lorraine kelly in top right
    // random text output random math - on whatever number output the text from that numbered response
    // set invterval to output display box from hidden to visible + change inner html to random message every x amount of seconds

// As a designer
// I need to make the questions both answerable but relatively difficult for each question tier
// So I can make the game engaging but also challenging
    // -> can I link varying API's for each question tier?

// As a
// I need
// and
// So I can

// As a
// I need
// and
// So I can

});
