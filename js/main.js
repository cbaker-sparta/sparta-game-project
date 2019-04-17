$(function () {

// EASY API
//https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple

// MEDIUM API
//https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple

// HARD API
//https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple


// Global variables

var $buttons = $(".button");
var $buttonPressed = "";

var $randomNumber = "";

var $question = "";
var $correctAnswer = "";
var $correctButton = "";
var $answers = [];

var $prizeValue = $(".progress-row");
var $progressLevel = 14;
var $prizeString = "A packet of Worcester Sauce crisps!";
var $grandPrize = "";

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

rollNumber();

function assignData() {
  $.get("https://opentdb.com/api.php?amount=1&difficulty=&type=multiple", function(data) {
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
    $correctButton = "A";
  }
  else if ($randomNumber == 1) {
    $("#B").html("B. " + $correctAnswer);
    $correctAnswer = "B. " + $correctAnswer;
    $correctButton = "B";
  }
  else if ($randomNumber == 2) {
    $("#C").html("C. " + $correctAnswer);
    $correctAnswer = "C. " + $correctAnswer;
    $correctButton = "C";
  }
  else if ($randomNumber == 3) {
    $("#D").html("D. " + $correctAnswer);
    $correctAnswer = "D. " + $correctAnswer;
    $correctButton = "D";
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

$($buttons).on("click", function () {
  if ($buttonPressed == "") {
    $(this).addClass("selected-answer");
    $buttonPressed = $(this);
  }
  console.log($buttonPressed.html().substring(0,1));
  setTimeout(function() {
    if ($correctButton == $buttonPressed.html().substring(0,1)) {
      $buttonPressed.addClass(" correct-answer").html("Correct Answer!");
    }
    else {
      for (var i = 0; i < $buttons.length; i++) {
        if ($($buttons[i]).html().substring(0,1) == $correctButton) {
          $($buttons[i]).addClass(" correct-answer").html("Correct Answer!");
        }
      }
    }
  }, 1000);
  if ($correctButton == $buttonPressed.html().substring(0,1)) {
    setTimeout(function() {
      $(".speech-bubble").html('"Congratulations! You\'ve won ' + $prizeString).addClass(" message correct-answer");
      addProgress();
    }, 2000);
    setTimeout(function() {
      clearDataAndRun();
    }, 3000);
  }
  else if ($correctButton != $buttonPressed.html().substring(0,1)) {
    setTimeout(function() {
      $buttonPressed.html("God, I'm sorry but you really are garbage! Better luck next time.");
      $(".speech-bubble").html('"Awwww, poor you. Today you leave with nothing!"').addClass(" message wrong");
    }, 3000);
  }
})

function addProgress() {
  $($prizeValue[$progressLevel]).addClass("current-progress");
  $progressLevel--;
  switch ($progressLevel) {
    case 13:
      $prizeString = "£200,000!";
      break;
    case 12:
      $prizeString = "£300,000!";
      break;
    case 11:
      $prizeString = "£500,000!";
      break;
    case 10:
      $prizeString = "A trip to Algeria with Paddy McGuiness!";
      break;
    case 9:
      $prizeString = "£2,000,000!";
      break;
    case 8:
      $prizeString = "One bottle of Fiji OR Dasani water!";
      break;
    case 7:
      $prizeString = "£8,000,000!";
      break;
    case 6:
      $prizeString = "£16,000,000!";
      break;
    case 5:
      $prizeString = "An invitation to a live Antique's Roadshow recording OF YOUR CHOICE!";
      break;
    case 4:
      $prizeString = "£64,000,000!";
      break;
    case 3:
      $prizeString = "£125,000,000!";
      break;
    case 2:
      $prizeString = "A spa day with the actor who played Babe!";
      break;
    case 1:
      $prizeString = "£500,000,000!";
      break;
    case 0:
      $prizeString = "£1 Billion!";
      break;
    default:
      $prizeString = "NOTHING!";
  }

  if ($progressLevel >= 10) {
    $grandPrize = "Nothing!";
  }
  else if ($progressLevel < 10 && $progressLevel >= 5) {
    $grandPrize = "A trip to Algeria with Paddy McGuiness!";
  }
  else if ($progressLevel < 5 && $progressLevel >= 1) {
    $grandPrize = "An invitation to a live Antique's Roadshow recording OF YOUR CHOICE!";
  }
  else if ($progressLevel == 0) {
    $grandPrize = "£1 Billion!";
  }
  console.log($progressLevel);
  // console.log($prizeValue);
  //   console.log($prizeString);
  console.log($grandPrize);
}


function clearDataAndRun() {
  $(".button").html("").removeClass("selected-answer message correct-answer");
  $(".speech-bubble").html("Your next question is...").removeClass("wrong correct-answer");
  $buttonPressed = "";
  $randomNumber = "";
  $question = "";
  $correctAnswer = "";
  $correctButton = "";
  $answers = [];

  assignData();
  rollNumber();
}


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


});
