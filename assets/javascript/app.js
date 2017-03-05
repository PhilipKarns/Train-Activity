// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKXvjeQlMk80YNAlRAbA_R7HbXSJC5Y7o",
    authDomain: "train-activity-homework.firebaseapp.com",
    databaseURL: "https://train-activity-homework.firebaseio.com",
    storageBucket: "train-activity-homework.appspot.com",
    messagingSenderId: "657871196914"
  };
  firebase.initializeApp(config);

//create a reference to the database
var database = firebase.database();

// Button for adding new trains
$("#add-train-btn").on("click", function () {
	event.preventDefault();

//storing the values entered in text boxes to variables
	var leavingFrom = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
	var frequency = moment($("#frequency-input").val().trim(), "mm").format("X");

//creating local object to store values in
	var newTrain = {
		leaving: leavingFrom,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	};

//upload the train data to firebase
	database.ref().push(newTrain);

//log data to console
	console.log(newTrain.leaving);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);

//Clear all of the text boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

// Prevent moving to new page
  return false;
});

//Create Firebase event for adding train to the dtabase and a row in the HTML
database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val());

	var leavingFrom = childSnapshot.val().leaving;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;

	console.log(leavingFrom);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);
});