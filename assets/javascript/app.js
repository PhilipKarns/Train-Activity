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
	var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
	var frequency = moment($("#frequency-input").val().trim(), "mm").format("mm");
	var currentTime = moment();
	var difference = moment.utc(moment(currentTime, "HH:mm").diff(moment(firstTrain, "HH:mm"))).format("HH:mm");
	var remainder = difference % frequency;
	console.log(remainder);
	
//creating local object to store values in
	var newTrain = {
		leaving: leavingFrom,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		difference: difference
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

	var currentTime = moment();
	var difference = moment.utc(moment(currentTime, "HH:mm").diff(moment(firstTrain, "HH:mm"))).format("HH:mm");
	console.log(difference);
	var difference = childSnapshot.val().difference;
	console.log(difference);
	var toMinutes = moment.duration(difference).asMinutes();
	console.log(toMinutes);
	var remainder = toMinutes % frequency;
	console.log(remainder);
	// var difference = moment.duration().minutes();
	// console.log(difference);
	// 
	// console.log(remainder);
	// var thisTime = moment.utc(currentTime, "HH:mm");
	// var beginTime = moment.utc(firstTrain, "HH:mm");

	// if (beginTime.isAfter(thisTime)) thisTime.add(1, "day");

	// var duration = moment.duration(beginTime.diff(thisTime));
	// var difference = moment.utc(+duration).format("HH:mm");
	// console.log(difference);

	// var currentTime = moment();
	// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
	// console.log(currentTime);

	// var betweenTime = (moment.(currentTime.format("HH:mm"))) - (moment.(firstTrain.format("HH:mm")));
	// console.log("Difference" + moment.(betweenTime).format("HH:mm"));

	//var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	

	// var nextArrival = 1645;
	// var minutesAway = 5;

	// //var nextArrival = first train time + frequency(min) + currentTime;
	// //var currentTime-lastArrival = minutesAway;

	// //add each train's data to the table
	// $("#train-table > tbody").append("<tr><td>" + leavingFrom + "</td><td>"	+ destination + "</td><td>"	
	// 	+ frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>"); 

});