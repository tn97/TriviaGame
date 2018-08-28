// causes for the information to appear upon button click
  $("#btn-instructions").on("click", function() {

  // causes the information to show
  $("#game-information").css("display", "block");
  // causes the list to show
  $("#ul-list").css("display", "block");
  // hides the instructions button
  $("#btn-instructions").css("display", "none");
  // fixes the "start" button placement once the instructions show
  $("#btn-start").css("margin-top", "131px");
  // debug purposes
  console.log("instructions button clicked");
});

// begins the game once game starts
$("#btn-start").on("click", function() {
  // hides the instructions button if they didn't press it
  $("#btn-instructions").css("display", "none");
  // hides the information panel
  $("#game-information").css("display", "none");
  $("#ul-list").css("display", "none");
  // hides the "start" button
  $("#btn-start").css("display", "none");
})

// var timerObject = {
//   number: 30,
//   intervalId,
//   waitPeriod: 5,


// }