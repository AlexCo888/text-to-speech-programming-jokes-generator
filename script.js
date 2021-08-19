"use strict";
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Passing Bad Jokes to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "47068a07e7794ccbb0a3da2ceaaa9d0e",
    src: joke,
    hl: "en-us",
    v: "John",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Jokes from Joke API
const getJokes = async () => {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
  } catch (error) {
    console.error("Whoopsy!", error);
  }
};

// Generate a random joke when the button is clicked
const randomJoke = () => {
  button.disabled = true;
  getJokes();
};

// Disable button while audio is playing
audioElement.addEventListener("ended", () => {
  audioElement.currentTime = 0;
  button.disabled = false;
});

// Text-to-Speech
getJokes();
