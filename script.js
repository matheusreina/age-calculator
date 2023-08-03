const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const inputs = document.querySelectorAll("input");
const formBtn = document.getElementById("btn");
const yearsDisplayText = document.getElementById("yDisplay");
const monthsDisplayText = document.getElementById("mDisplay");
const daysDisplayText = document.getElementById("dDisplay");
const calculationForm = document.querySelector("form");
const errorText = document.querySelectorAll(".error-text");
const label = document.querySelectorAll(".error-label");

// ANCHOR Start Calculation:

const onSubmit = (e) => {
  e.preventDefault();
  resetDOM();

  if (inputValidation()) {
    calculateTheDate();
  }

  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
};

// ANCHOR User Validation:
const inputValidation = () => {
  const date = getDateFromUser();
  const today = getTodaysDate();

  const day = date[0] < 0 || date[0] > 31;
  const month = date[1] < 0 || date[1] > 12;
  const year = date[2] < 0 || date[2] > today[2];

  if (day) {
    errorText[0].classList.remove("hidden");
    label[0].classList.add("!text-red-500");
    dayInput.classList.add("border-red-500");

    return false;
  } else if (month) {
    errorText[1].classList.remove("hidden");
    label[1].classList.add("!text-red-500");
    monthInput.classList.add("border-red-500");

    return false;
  } else if (year) {
    errorText[2].classList.remove("hidden");
    label[2].classList.add("!text-red-500");
    yearInput.classList.add("border-red-500");

    return false;
  } else {
    return true;
  }
};

// ANCHOR Reset DOM:
const resetDOM = () => {
  inputs.forEach((item) => {
    if (item.classList.contains("border-red-500")) {
      item.classList.remove("border-red-500");
    }
  });
  errorText.forEach((item) => {
    if (!item.classList.contains("hidden")) {
      item.classList.add("hidden");
    }
  });
  label.forEach((item) => {
    if (item.classList.contains("!text-red-500")) {
      item.classList.remove("!text-red-500");
    }
  });
};

// ANCHOR Calculator
const calculateTheDate = () => {
  const date = getDateFromUser();
  const today = getTodaysDate();
  const result = [];

  result.push(Math.abs(date[0] - today[0]));
  result.push(Math.abs(date[1] - today[1]));
  result.push(Math.abs(date[2] - today[2]));

  DOMManipulation(result);
};

// ANCHOR DOM Manipulation:
const DOMManipulation = (date) => {
  daysDisplayText.textContent = date[0];
  monthsDisplayText.textContent = date[1];
  yearsDisplayText.textContent = date[2];
};

// ANCHOR Function to get the current date:
const getTodaysDate = () => {
  const date = [];

  const today = new Date();
  date.push(today.getDate()); // Day
  date.push(today.getMonth() + 1); // Month
  date.push(today.getFullYear()); // Year

  return date;
};

// ANCHOR Function to get what the user typed:
const getDateFromUser = () => {
  const date = [];

  date.push(Number(dayInput.value)); // Day
  date.push(Number(monthInput.value)); // Month
  date.push(Number(yearInput.value)); // Yea

  return date;
};

// ANCHOR Init Function and Event Listeners:

function init() {
  calculationForm.addEventListener("submit", onSubmit);
}

init();
