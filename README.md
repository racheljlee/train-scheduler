# train-scheduler

For this project, we had to make a `Train Scheduler` which utilized Google's `Firebase` database platform and a javascript library called `Moment JS`, which allowed us to format time in different  ways and to be able to perform some basic algorithms, which was going to be needed to be able to calculate train arrival times.

**HTML**

For the Html/Css, I had to determine what parts of the site was going to be `static` vs `dynamic`. The jumbotron containing the heading, the main card body that was going to hold the information for train scheduling data and the input form were all going to be static elements. The only thing I really needed to worry about generating dynamically through jQuery were the table rows of newly inputted data from the form.

**JAVASCRIPT**

Since I was required to use `Firebase` to store data from the input fields so that it would update in real time accordingly, I had to connect my website to the special `Firebase API` that I had generated for this specific project by using `var database = firebase.database()`. Generating the API info, Firebase gave me a unique apiKey that is unique only to my own use. I then had to create an empty array (`var arr = []`) to store future input data that could be pushed and displayed in my HTML accordingly.

One of the first functions I had to write was for my Firebase database to track any changes that are made to the root of the database. However, since I only want to keep track of newly created table data entries, I had to use `database.ref().on("child_added", function(snapshot)`. The "child_added" event listener basically tells Firebase to only pay attention to changes when a new child element is added, which are the new entries that will be created from the user filling out and submitting the form. I also had to set a `var data = snapshot.val()` to pull the value of the  created inputs of the new added child elements.

Within that function, I then had to dynamically create the new elements that I wanted to populate for my page. These were the table rows (`<tr>`) for each new line of data, and the 5 table data (`<td>`) entries that pertained to the table header information. Using jQuery, I created variables that were set equal to the html elements. 

I also had to create an `object` outside of the `.on("child_added")` function but inside of an `.on("click")` function for when the user clicked the 'submit' button after filling out the input fields. In order for the object to have the necessary `keys and values`, I first had to create variables that would pull the values of the form inputs by targeting them through their id's with `.val()`. This would store whatever text was typed into the input fields and into the variables after the submit button is clicked. I also added a `.trim()` function to get rid of any unnecessary spaces that the user might have accidentally inputted.

Now, using those variables with values as values, I was able to put them in an object that was set equal to a variable called `dataInputs`. Then I had to `push` the data in the objects to my Firebase so that it could store the data pulled from any newly submitted form inputs, by using `database.ref().push(dataInputs)`.

Now that I was able to store newly inputted information in my Firebase server, all I need to do was to show that newly inputted data in my html document for the user to see. So I used `.text()` to replace the relevant information taken from the `dataInputs` object and targeted each newly created html element with the specific data I needed from the object. This was achieved by using `data.(key)` so that the relevant data from the object would be replacing the contents of the appropriate html elements. 

Then I had to append each new `td` element to the table row (`tr`) and then append the table row to the table body (`tbody`). By doing this, all the new data would now display on the html document.

Meanwhile, I also had to utilize `Moment JS` to calculate the minutes left before the next train and next arrival time based on the first train time of the day and the frequency. These numbers were simply calculated through algorithms, utilizing the Moment JS library. I also had to make sure to append the relevant table data cells containing these calculated numbers to the table row and then to the table body.

Last but not least, I wanted to add buttons for each entry that would allow the user to be able to remove the entry after clicking the button. This is so that if the user makes a mistake when entering fresh data or simply doesn't need a row of data to be displayed anymore to be able to delete it. This was achieved through creating a button, and adding a class of `delete-train` and then giving it an attirbute of `data-entry-id` which had the value of `snapshot.key`. This would allow Firebase to delete the relevant data from the database and update the html document accordingly, but only when the delete button is clicked. Thus, another `.on("click")` function is necessary here to trigger the deletion of the entry from both the html document and Firebase.

**CSS/Design**

I also thought it would be fun to call the Train Scheduler something else other than "Train Scheduler," so I found an icon and had it rotated to make an 'x' shape so that I could use it to call my Train Scheduler "Train Trax." It's a pun on words because "trax" comes from the word "tracks," which can be a double entendre to include the imagery of "train tracks" but also to incorporate the action of "to track" which is the basic function of the website I just coded: to keep track of train schedules. It can also further fit the function of Firebase in that it also keeps tracks of any changes of newly added child elements, and updates accordingly.

I also chose this nice, young, healthy green color because green is my favorite color and easy on the eyes.

