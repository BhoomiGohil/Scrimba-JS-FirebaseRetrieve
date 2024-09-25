// Import necessary functions from Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Firebase configuration settings
const appSettings = {
  databaseURL: "https://playground-514f2-default-rtdb.firebaseio.com/", // URL for the Firebase Realtime Database
};

// Initialize Firebase application with the provided settings
const app = initializeApp(appSettings);

// Get a reference to the database associated with the app
const database = getDatabase(app);

// Reference to the "newsStories" node in the database
const newsStoriesInDB = ref(database, "newsStories");

// Reference to the HTML element where the news stories will be displayed
const storiesEl = document.getElementById("stories");

// Listen for changes in the "newsStories" data in the database
onValue(newsStoriesInDB, function (snapshot) {
  // Convert the snapshot of news stories into an array of entries (key-value pairs)
  let newsStoriesArray = Object.entries(snapshot.val());

  // Clear the current list of stories in the HTML element
  storiesEl.innerHTML = "";

  // Loop through each story in the array and append it to the list
  for (let i = 0; i < newsStoriesArray.length; i++) {
    let currentStory = newsStoriesArray[i]; // Get the current story (key-value pair)

    appendStoryToStoriesEl(currentStory); // Append the current story to the displayed list
  }
});

// Function to append a story to the list in the HTML
function appendStoryToStoriesEl(story) {
  let storyID = story[0]; // Extract the story ID (key)
  let storyTitle = story[1]; // Extract the story title (value)

  // Create a new div element to hold the story
  let newEl = document.createElement("div");

  newEl.classList.add("story"); // Add a class to style the story

  newEl.textContent = storyTitle; // Set the text content of the new element to the story title

  // Add an event listener for double-clicks to remove the story from the database
  newEl.addEventListener("dblclick", function () {
    let exactLocationOfStoryInDB = ref(database, `newsStories/${storyID}`); // Reference to the specific story in the database

    remove(exactLocationOfStoryInDB); // Remove the story from the database
  });

  // Append the new story element to the stories element in the HTML
  storiesEl.append(newEl);
}
