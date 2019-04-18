$(function () {

// Way to dispaly instruction and difficulty selection modal on load.

$(window).on('load',function(){
  $('#myModal').modal('show');
});

var $sounds = ["sounds/main_theme.mp3", "sounds/lets_play.mp3", "sounds/final_answer.mp3", "sounds/correct_answer.mp3", "sounds/wrong_answer.mp3", "sounds/game_over.mp3", "sounds/victory.mp3"]

// Global variables

var $difficulty = "";

var $buttons = $(".button");
var $buttonPressed = "";

var $randomNumber = "";

var $question = "";
var $correctAnswer = "";
var $correctButton = "";
var $wrongButtons = [];
var $answers = [];

var $prizeValue = $(".progress-row");
var $progressLevel = 14;
var $prizeString = "a packet of Worcester Sauce crisps!";
var $grandPrize = "nothing!";

// Functions

// Functions assigning difficulty of questions and then assigning the API drawn questions and answers to buttons.

function rollNumber() {
  var maxNum = 4;
  var randomAssigner =  Math.floor((Math.random() * (maxNum)));
  $randomNumber = randomAssigner;
}

rollNumber();

$("#easy").on("click", function () {
  $difficulty = "easy";
  assignData();
  var audio = new Audio($sounds[1]);
  audio.play();
  $("#easy").off("click");
})
$("#medium").on("click", function () {
  $difficulty = "medium";
  assignData();
  var audio = new Audio($sounds[1]);
  audio.play();
  $("#medium").off("click");
})
$("#hard").on("click", function () {
  $difficulty = "hard";
  assignData();
  var audio = new Audio($sounds[1]);
  audio.play();
  $("#hard").off("click");
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
    $wrongButtons = ["B", "C", "D"];
  }
  else if ($randomNumber == 1) {
    $("#B").html("B. " + $correctAnswer);
    $correctAnswer = "B. " + $correctAnswer;
    $correctButton = "B";
    $wrongButtons = ["A", "C", "D"];
  }
  else if ($randomNumber == 2) {
    $("#C").html("C. " + $correctAnswer);
    $correctAnswer = "C. " + $correctAnswer;
    $correctButton = "C";
    $wrongButtons = ["A", "B", "D"];
  }
  else if ($randomNumber == 3) {
    $("#D").html("D. " + $correctAnswer);
    $correctAnswer = "D. " + $correctAnswer;
    $correctButton = "D";
    $wrongButtons = ["A", "B", "C"];
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

// Logic and functions adding event listeners to the buttons and checking if the users input was correct, then the logic regarding what happens after their selection.

$($buttons).on("click", function () {
  if ($buttonPressed == "") {
    $(this).addClass(" selected-answer");
    $buttonPressed = $(this);
    var audio = new Audio($sounds[2]);
			audio.play();
      setTimeout(function(){
        audio.pause();
      }, 3300);
  }
  setTimeout(function() {
    if ($correctButton == $buttonPressed.html().substring(0,1)) {
      $buttonPressed.addClass(" correct-answer").html("Correct Answer!");
      var audio = new Audio($sounds[3]);
  			audio.play();
        setTimeout(function(){
          audio.pause();
        }, 3500);
    }
    else {
      for (var i = 0; i < $buttons.length; i++) {
        if ($($buttons[i]).html().substring(0,1) == $correctButton) {
          $($buttons[i]).addClass(" correct-answer").html("Correct Answer!");
          var audio = new Audio($sounds[4]);
            audio.play();
        }
      }
    }
  }, 2500);
  if ($correctButton == $buttonPressed.html().substring(0,1)) {
    setTimeout(function(){
      audio.pause();
    }, 2000);
    setTimeout(function() {
      $(".speech-bubble").html('"Congratulations! You\'ve won ' + $prizeString).addClass(" message correct-styling");
      addProgress();
    }, 3500);
    setTimeout(function() {
      clearDataAndRun();
    }, 6000);
  }
  else if ($correctButton != $buttonPressed.html().substring(0,1)) {
    setTimeout(function() {
      $buttonPressed.html("God, I'm sorry but you really are garbage!");
      $(".speech-bubble").html('"Awwww, poor you. Today you leave with nothing!"').addClass(" message wrong");
      loss();
      var audio = new Audio($sounds[5]);
      audio.play();
    }, 4500);
  }
})

// Condtional statments, cycling the prizes to be output in the speech bubble, checkpoint, win and game over modals.

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

// Function to reset all the variables used on each question cycle.

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

  var audio = new Audio($sounds[0]);
    audio.volume = 0.5;
    audio.play();

}

// Functions to set the content of the modal pop-up messages.

function loss() {
    $(".modal-body").html("Unlucky! Next time try not to be so bad at the game. Regardless, today you go home with " + $grandPrize + " Better luck next time!").addClass(" modal-loss");
    $(".btn-stick").html("Try again").on("click", function () {
      reset();
    })
    $(".btn-rmv").remove(".btn-rmv");
    $(".difficulty-header").remove("h3");

    $('#myModal').modal('show');
}

function winner() {
    $(".modal-body").html("Congratulations! You are the greatest! You go home with our grand prize of " + $grandPrize + " ...But sorry, we've just had word... we have gone bankrupt due to over booking the actor who played Babe and won't be able to give you your prize. Please take a pack of a packet of Worcester Sauce crisps as a gesture of good will.").addClass(" modal-win");
    $(".btn-stick").html("Go again").on("click", function () {
      reset();
    })
    $(".btn-rmv").remove(".btn-rmv");

    $('#myModal').modal('show');
    var audio = new Audio($sounds[6]);
      audio.play();
}

function checkpoint() {
    $(".modal-body").html("Congratulations! You are now guaranteed to go home with " + $grandPrize + " But you can still win more! Let's continue!").addClass(" modal-checkpoint");
    $(".btn-stick").html("Continue!")
    $(".btn-rmv").remove(".btn-rmv");
    $(".difficulty-header").remove("h3");

    $('#myModal').modal('show');
}

// Function to reload the page on win/loss.

function reset() {
  location.reload();
}


// Lifeline Functions

$(".lifeline").on("click", function () {
  $(this).addClass(" used").off("click");
  $wrongButtons = shuffle($wrongButtons);
  if ($wrongButtons[0] == $("#A").html().substring(0,1) || $wrongButtons[1] == $("#A").html().substring(0,1)) {
    $("#A").html("");
  }
  if ($wrongButtons[0] == $("#B").html().substring(0,1) || $wrongButtons[1] == $("#B").html().substring(0,1)) {
    $("#B").html("");
  }
  if ($wrongButtons[0] == $("#C").html().substring(0,1) || $wrongButtons[1] == $("#C").html().substring(0,1)) {
    $("#C").html("");
  }
  if ($wrongButtons[0] == $("#D").html().substring(0,1) || $wrongButtons[1] == $("#D").html().substring(0,1)) {
    $("#D").html("");
  }

})

// Fisher-Yates (aka Knuth) Shuffle.

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

});
