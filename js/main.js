$(function () {

console.log("hello world");
//https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple

//https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple

//https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple

// remember to comment out each section with its feature and console log as I go.

// As a new player
// I need to be able to enter my name
// and instructions regarding the game
// and to be able to start the game
// So I can play the game
    // text field to enter the players name and button to confirm entry
    // next screen gives instructions with button to start game

// BUTTON INPUTS
var buttonInput = $("button");
var correctAnswer = true;
var buttonPressed = "";
// var correctAnswer = api.index[] -> find the correct answer within api array

$("button").on("click", function () {
  if (buttonPressed == "") {
    $(this).addClass("selected-answer");
    buttonPressed = "answered";
    console.log(this.value + " was clicked");
  }
  setTimeout(function() {
    $("#B").addClass("correct-answer").html("Correct answer");
  }, 2000);
  if (correctAnswer = true) {
    setTimeout(function() {
      $("#B").css("background-color", "gray").html("Click again for your next question!");
      $(".speech-bubble").html("Congratulations! You've won £2,000,000!");
    }, 4000);
  }

  console.log("start next questions");
  // setTimeout(function() {
  //   $("#question-box").html("").append($("<button.next-question>Click here for your next question</button>"));
  // }, 3000);
  // $("button").on("click", function () {
  //   console.log("start next questions");
  // })
})


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
