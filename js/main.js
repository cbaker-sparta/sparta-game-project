$(function () {

$(window).on('load',function(){
  $('#myModal').modal('show');
});

// Global variables

var $difficulty = "";

var $buttons = $(".button");
var $buttonPressed = "";

var $randomNumber = "";

var $question = "";
var $correctAnswer = "";
var $correctButton = "";
var $answers = [];

var $prizeValue = $(".progress-row");
var $progressLevel = 14;
var $prizeString = "a packet of Worcester Sauce crisps!";
var $grandPrize = "nothing!";

// Functions

assignData();

function rollNumber() {
  var maxNum = 4;
  var randomAssigner =  Math.floor((Math.random() * (maxNum)));
  $randomNumber = randomAssigner;
}

rollNumber();

$("#easy").on("click", function () {
  $difficulty = "easy";
  assignData();
})
$("#medium").on("click", function () {
  $difficulty = "medium";
  assignData();
})
$("#hard").on("click", function () {
  $difficulty = "hard";
  assignData();
})

function assignData() {
  $.get("https://opentdb.com/api.php?amount=1&difficulty=" + $difficulty + "&type=multiple", function(data) {
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
    $(this).addClass(" selected-answer");
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
      $(".speech-bubble").html('"Congratulations! You\'ve won ' + $prizeString).addClass(" message correct-styling");
      addProgress();
    }, 2000);
    setTimeout(function() {
      clearDataAndRun();
    }, 3000);
  }
  else if ($correctButton != $buttonPressed.html().substring(0,1)) {
    setTimeout(function() {
      $buttonPressed.html("God, I'm sorry but you really are garbage!");
      $(".speech-bubble").html('"Awwww, poor you. Today you leave with nothing!"').addClass(" message wrong");
      loss();
    }, 3000);
  }
})

function addProgress() {
  $($prizeValue[$progressLevel]).addClass(" current-progress");
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
      $prizeString = "a trip to Algeria with Paddy McGuiness!";
      break;
    case 9:
      $prizeString = "£2,000,000!";
      break;
    case 8:
      $prizeString = "one bottle of Fiji OR Dasani water!";
      break;
    case 7:
      $prizeString = "£8,000,000!";
      break;
    case 6:
      $prizeString = "£16,000,000!";
      break;
    case 5:
      $prizeString = "an invitation to a live Antique's Roadshow recording OF YOUR CHOICE!";
      break;
    case 4:
      $prizeString = "£64,000,000!";
      break;
    case 3:
      $prizeString = "£125,000,000!";
      break;
    case 2:
      $prizeString = "a spa day with the actor who played Babe!";
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
    $grandPrize = "nothing!";
  }
  else if ($progressLevel < 10 && $progressLevel >= 5) {
    $grandPrize = "a trip to Algeria with Paddy McGuiness!";
  }
  else if ($progressLevel < 5 && $progressLevel >= 1) {
    $grandPrize = "an invitation to a live Antique's Roadshow recording OF YOUR CHOICE!";
  }
  else if ($progressLevel === 0) {
    $grandPrize = "£1 Billion!";
    winner();
  }

  if ($progressLevel === 9) {
    checkpoint();
  }
  if ($progressLevel === 4) {
    checkpoint();
  }
}

function clearDataAndRun() {
  $(".button").html("").removeClass("selected-answer message correct-answer");
  $(".speech-bubble").html("Your next question is...").removeClass("wrong correct-styling");
  $buttonPressed = "";
  $randomNumber = "";
  $question = "";
  $correctAnswer = "";
  $correctButton = "";
  $answers = [];

  assignData();
  rollNumber();
}

function loss() {
    $(".modal-body").html("Unlucky! Next time try not to be so bad at the game. Regardless, today you go home with " + $grandPrize + " Better luck next time!").addClass(" modal-loss");
    $(".btn-stick").html("Try again").on("click", function () {
      reset();
    })
    $(".btn-rmv").remove(".btn-rmv");

    $('#myModal').modal('show');
}

function winner() {
    $(".modal-body").html("Congratulations! You are the greatest! You go home with our grand prize of " + $grandPrize + " ...But sorry, we've just had word... we have gone bankrupt due to over booking the actor who played Babe and won't be able to give you your prize. Please take a pack of a packet of Worcester Sauce crisps as a gesture of good will.").addClass(" modal-win");
    $(".btn-stick").html("Go again").on("click", function () {
      reset();
    })
    $(".btn-rmv").remove(".btn-rmv");

    $('#myModal').modal('show');
}

function checkpoint() {
    $(".modal-body").html("Congratulations! You are now guaranteed to go home with " + $grandPrize + " But you can still win more! Let's continue!").addClass(" modal-checkpoint");
    $(".btn-stick").html("Continue!")
    $(".btn-rmv").remove(".btn-rmv");
    $(".difficulty-header").remove("h3");

    $('#myModal').modal('show');
}

function reset() {
  location.reload();
}
});
