// EVENT LISTENERS ****************************************************************************************************************

// NUMBERS

for (let i = 0; i < document.querySelectorAll(".numeral").length; i++) {
  document
    .querySelectorAll(".numeral")
    [i].addEventListener("click", function () {
      const buttonInnerHTML = this.innerHTML;
      inputCollect(buttonInnerHTML);
    });
}

// DISABLE ENTER

document.onkeydown = function (e) {
  return false;
};

// SYMBOLS

// CALCULATION
document.getElementById("equals").addEventListener("click", equals);
document.getElementById("add").addEventListener("click", add);
document.getElementById("subtract").addEventListener("click", subtract);
document.getElementById("multiply").addEventListener("click", multiply);
document.getElementById("divide").addEventListener("click", divide);
document.getElementById("raise").addEventListener("click", raise);
document.getElementById("root").addEventListener("click", root);

// DOCUMENT

document.addEventListener("keydown", easterEgg);

// AUXILIARY
document.getElementById("comma").addEventListener("click", addComma);
document.getElementById("delete").addEventListener("click", deleteMe);
document.getElementById("reload").addEventListener("click", reloadMe);

// GLOBAL VARIABLES ****************************************************************************************************************

const mainDisplay = document.getElementById("main_display_output");

let inputDisplay = [];
let firstNumber = [];
let operator = "";
let secondNumber = [];
let result;

let switchButtons = true;
let switchNumberals = true; // also (. = ⌫) After the first result is given

// FUNCTIONS NUMBERS

// PUSHING NUMBERS

function inputCollect(buttonInnerHTML) {
  if (switchNumberals === true) {
    if (switchButtons === true) {
      firstNumber.push(buttonInnerHTML);
    } else if (switchButtons === false) {
      secondNumber.push(buttonInnerHTML);
    }
    inputDisplay.push(buttonInnerHTML);
    createOutput();
  }
}

// FUNCTIONS SYMBOLS ****************************************************************************************************************

// EQUALS =

function equals() {
  if (switchNumberals === true) {
    let resultString;
    let firstNumberCalc = parseFloat(firstNumber.join(""));
    let secondNumberCalc = parseFloat(secondNumber.join(""));

    if (firstNumber.length !== 0 && secondNumber.length !== 0) {
      if (operator === "+") {
        result = firstNumberCalc + secondNumberCalc;
        result = adjustFixed(result);
      } else if (operator === "-") {
        result = firstNumberCalc - secondNumberCalc;
        result = adjustFixed(result);
      } else if (operator === "×") {
        result = firstNumberCalc * secondNumberCalc;
        result = adjustFixed(result);
      } else if (operator === "÷") {
        result = firstNumberCalc / secondNumberCalc;
        result = adjustFixed(result);
      } else if (operator === "xⁿ") {
        result = Math.pow(firstNumberCalc, secondNumberCalc);
        result = adjustFixed(result);
      } else if (operator === "√") {
        result = Math.pow(firstNumberCalc, 1 / secondNumberCalc);
        result = adjustFixed(result);
      }
    }

    resultString = result.toString();
    firstNumber = [];
    secondNumber = [];
    inputDisplay = [];
    switchNumberals = false;
    switchButtons = true;

    for (let j = 0; j < resultString.length; j++) {
      firstNumber.push(resultString.charAt(j));
      inputDisplay.push(resultString.charAt(j));
    }

    createOutput();
  }
}

// ADD +

function add() {
  if (inputDisplay.length !== 0 && switchButtons === true) {
    inputDisplay.push("+");
    operator = "+";
    adjustButtons();
    createOutput();
  }
}

// SUBTRACT -

function subtract() {
  if (inputDisplay.length !== 0 && switchButtons === true) {
    inputDisplay.push("-");
    operator = "-";
    adjustButtons();
    createOutput();
  }
}

// MULTIPLY ×

function multiply() {
  if (inputDisplay.length !== 0 && switchButtons === true) {
    inputDisplay.push("×");
    operator = "×";
    adjustButtons();
    createOutput();
  }
}

// DIVIDE ÷

function divide() {
  if (inputDisplay.length !== 0 && switchButtons === true) {
    inputDisplay.push("÷");
    operator = "÷";
    adjustButtons();
    createOutput();
  }
}

function raise() {
  if (inputDisplay.length !== 0 && switchButtons === true) {
    inputDisplay.push("xⁿ");
    operator = "xⁿ";
    adjustButtons();
    createOutput();
  }
}

function root() {
  if (inputDisplay.length !== 0 && switchButtons === true) {
    inputDisplay.push("√");
    operator = "√";
    adjustButtons();
    createOutput();
  }
}

// AUXILIARY

// COMMA

function addComma() {
  if (switchNumberals === true) {
    // Local Variables
    let hasCommaFirst = firstNumber.some((e) => (e === "." ? true : false));
    let hasCommaSecond = secondNumber.some((e) => (e === "." ? true : false));

    if (switchButtons === true) {
      if (firstNumber.length !== 0 && hasCommaFirst === false) {
        firstNumber.push(".");
        inputDisplay.push(".");
        createOutput();
      }
    } else if (switchButtons === false) {
      if (secondNumber.length !== 0 && hasCommaSecond === false) {
        secondNumber.push(".");
        inputDisplay.push(".");
        createOutput();
      }
    }
  }
}

// DELETE

function deleteMe() {
  if (switchNumberals === true) {
    // Local Variables
    let operatorChecker = inputDisplay.length - 1;

    if (switchButtons === true) {
      firstNumber.pop();
      inputDisplay.pop();
      createOutput();
    } else if (switchButtons === false) {
      if (
        inputDisplay[operatorChecker] !== "+" &&
        inputDisplay[operatorChecker] !== "-" &&
        inputDisplay[operatorChecker] !== "×" &&
        inputDisplay[operatorChecker] !== "÷"
      ) {
        secondNumber.pop();
        inputDisplay.pop();
        createOutput();
      }
    }
  }
}

// RELOAD

function reloadMe() {
  window.location.reload();
}

// HELPER FUNCTIONS ****************************************************************************************************************

// CREATE OUTPUT

function createOutput() {
  var outputString = inputDisplay.join("");
  mainDisplay.innerHTML = outputString;
}

// ADJUST BUTTONS

function adjustButtons() {
  switchButtons = false;
  switchNumberals = true;
}

function adjustFixed(result) {
  if (result % 1 != 0) {
    // Local Variables
    let fixedResult = result.toFixed(5);

    return parseFloat(fixedResult);
  } else if (result % 1 == 0) {
    return result;
  }
}

// EASTER EGG FUNCTIONS ****************************************************************************************************************

function easterEgg(ev) {
  if (ev.key === "Enter") {
    if (
      (firstNumber.join("") === "6" &&
        operator === "+" &&
        secondNumber.join("") === "1") ||
      (firstNumber.join("") === "1" &&
        operator === "+" &&
        secondNumber.join("") === "6")
    ) {
      function playMe() {
        var x = new Audio("files/love.wav");
        x.play();
      }
      playMe();
    } else if (
      (firstNumber.join("") === "6" &&
        operator === "-" &&
        secondNumber.join("") === "1") ||
      (firstNumber.join("") === "1" &&
        operator === "-" &&
        secondNumber.join("") === "6")
    ) {
      function playMe() {
        var x = new Audio("files/fighting.wav");
        x.play();
      }
      playMe();
    } else if (
      (firstNumber.join("") === "6" &&
        operator === "√" &&
        secondNumber.join("") === "1") ||
      (firstNumber.join("") === "1" &&
        operator === "√" &&
        secondNumber.join("") === "6")
    ) {
      function playMe() {
        var x = new Audio("files/accept.wav");
        x.play();
      }
      playMe();
    } else if (
      (firstNumber.join("") === "6" &&
        operator === "xⁿ" &&
        secondNumber.join("") === "1") ||
      (firstNumber.join("") === "1" &&
        operator === "xⁿ" &&
        secondNumber.join("") === "6")
    ) {
      function playMe() {
        var x = new Audio("files/situation.wav");
        x.play();
      }
      playMe();
    } else if (mainDisplay.innerHTML === "Infinity") {
      function playMe() {
        var x = new Audio("files/city.wav");
        x.play();
      }
      playMe();
    } else if (result == "90") {
      function playMe() {
        var x = new Audio("files/trish.wav");
        x.play();
      }
      playMe();
    } else if (result == "-90") {
      function playMe() {
        var x = new Audio("files/maried.wav");
        x.play();
      }
      playMe();
    }
  }
}
