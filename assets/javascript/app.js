// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKXvjeQlMk80YNAlRAbA_R7HbXSJC5Y7o",
    authDomain: "train-activity-homework.firebaseapp.com",
    databaseURL: "https://train-activity-homework.firebaseio.com",
    storageBucket: "train-activity-homework.appspot.com",
    messagingSenderId: "657871196914"
  };
  firebase.initializeApp(config);

// Button for adding new trains
$("#add-train-btn").on("click", function () {
	event.preventDefault();

//createa  reference to the database
var database = firebase.database();

//storing the values entered in text boxes to variables
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#first-train-input").val().trim();
	var frequency = moment($("#frequency-input").val().trim(), "HH:mm").format("X");

//creating local object to store values in
	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	};

//upload the train data to firebase
	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);

});
