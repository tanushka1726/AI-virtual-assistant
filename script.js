let btn = document.querySelector(".btn");
let content = document.querySelector(".content");
let voice = document.querySelector(".voice");
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.volume = 1;
  text_speak.pitch = 1;
  text_speak.rate = 1;
  text_speak.lang = "en-IN";
  window.speechSynthesis.speak(text_speak);
}
function wishme() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Madam");
  } else if (hours >= 12 && hours < 4) {
    speak("Good afternoon Madam");
  } else {
    speak("Good evening Madam");
  }
}
window.addEventListener("load", () => {
  wishme();
});
function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  if (message.includes("Hello") || message.includes("Hey")) {
    speak("Hello madam,what I can help you ?");
  } else if (message.includes("Who are you?")) {
    speak("I am a virtual assistant,created by Tanushka ma'am");
  } else if (message.includes("Siri open YouTube")) {
    speak("Opening youtube");
    window.open("https://www.youtube.com/", "blank");
  } else if (message.includes("Siri open Google")) {
    speak("Opening Google");
    window.open("https://www.google.com/", "blank");
  } else if (message.includes("Open calculator")) {
    speak("Opening calculator");
    window.open("claculator://");
  } else if (message.includes("What is current time?")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time.replace("Siri", ""));
  } else if (message.includes("What is today date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date.replace("Siri", ""));
  } else {
    speak(
      `This is what I found on internet regarding your ${message.replace(
        "Siri",
        ""
      )} `
    );
    window.open(
      `https://www.google.com/search?q=${message.replace("Siri", "")}`
    );
  }
}
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript);
  //console.log(event);
};
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});
