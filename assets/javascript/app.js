$(document).ready(function () {
    var database = firebase.database();
    var arr = [];

    database.ref().on("child_added", function (snapshot) {
        var data = snapshot.val();
        console.log(data);

        var tFrequency = data.frequency;

        // Time is 3:30 AM
        var firstTime = data.firstTrain;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

        var tr = $("<tr>");
        var trainNameTd = $("<td>");
        var destinationTd = $("<td>");
        var frequencyTd = $("<td>");
        var nextArrivalTd = $("<td>");
        var minutesAwayTd = $("<td>");

        trainNameTd.text(data.trainName);
        destinationTd.text(data.destination);
        frequencyTd.text(data.frequency);
        nextArrivalTd.text(nextTrain);
        minutesAwayTd.text(tMinutesTillTrain);

        tr.append(trainNameTd);
        tr.append(destinationTd);
        tr.append(frequencyTd);
        tr.append(nextArrivalTd);
        tr.append(minutesAwayTd);

        var divButton = $("<div class='col-md-1'>");
        var button = $("<button class='btn btn-danger'>");
        button.addClass("delete-train");
        button.attr("data-entry-id", snapshot.key);
        button.append(" X ");

        tr.attr("id", snapshot.key);

        tr.append(divButton);
        divButton.append(button);

        $("tbody").append(tr);


    });
    $(document).on("click", ".delete-train", function () {
        var trainEntryId = $(this).attr("data-entry-id");
        database.ref().child(trainEntryId).remove();
        $("#" + trainEntryId).remove();
    })

    $("#submitButton").on("click", function (event) {
        event.preventDefault(); // prevents page from reloading (default action from button)

        var trainNameInput = $("#trainNameInput").val().trim();
        var destinationInput = $("#destinationInput").val().trim();
        var firstTrainInput = $("#firstTrainInput").val().trim();
        var frequencyInput = $("#frequencyInput").val().trim();

        var dataInputs = {
            trainName: trainNameInput,
            destination: destinationInput,
            firstTrain: firstTrainInput,
            frequency: frequencyInput
        }
        database.ref().push(dataInputs);
    });

});