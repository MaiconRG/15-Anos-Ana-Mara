const targetDate = new Date("2025-07-19T19:30:00");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    clearInterval(interval);
    daysElement.textContent = 0;
    hoursElement.textContent = 0;
    minutesElement.textContent = 0;
    secondsElement.textContent = 0;
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();
