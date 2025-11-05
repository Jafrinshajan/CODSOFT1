const display = document.getElementById("display");
const buttonsGrid = document.querySelector(".buttons-grid");

let firstOperand = null;
let currentOperation = null;
let needsReset = false;
let calculationDisplay = "";

display.textContent = "0";

function resetScreen() {
  if (needsReset) {
    if (currentOperation) {
      display.textContent = calculationDisplay;
    } else {
      display.textContent = "0";
    }
    needsReset = false;
  }
}

/**
 * @param {string} number - The digit or decimal point pressed.
 */
function inputNumber(number) {
  if (display.textContent === calculationDisplay && currentOperation) {
    display.textContent = "";
  }

  resetScreen();

  if (number === "." && display.textContent.includes(".")) return;

  if (display.textContent === "0" && number !== ".") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

/**
 * @param {string} operator - The selected operator.
 */
function setOperation(operator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(display.textContent);
  } else if (currentOperation) {
    calculate();
    firstOperand = parseFloat(display.textContent);
  }

  currentOperation = operator;
  needsReset = true;

  calculationDisplay = firstOperand + " " + operator + " ";
  display.textContent = calculationDisplay;
}

function calculate() {
  if (display.textContent === calculationDisplay || currentOperation === null)
    return;

  const secondOperand = parseFloat(display.textContent);
  let result = 0;

  switch (currentOperation) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      if (secondOperand === 0) {
        display.textContent = "Error: Div by 0";
        firstOperand = null;
        currentOperation = null;
        needsReset = true;
        calculationDisplay = "";
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  display.textContent = parseFloat(result.toFixed(8));

  firstOperand = parseFloat(display.textContent);
  currentOperation = null;
  needsReset = true;
  calculationDisplay = "";
}

function clearAll() {
  display.textContent = "0";
  firstOperand = null;
  currentOperation = null;
  needsReset = false;
  calculationDisplay = "";
}

buttonsGrid.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.classList.contains("btn")) return;

  const action = target.dataset.action;
  const operator = target.dataset.operator;
  const number = target.dataset.number;

  if (number) {
    inputNumber(number);
  } else if (operator) {
    setOperation(operator);
  } else if (action === "calculate") {
    calculate();
  } else if (action === "clear") {
    clearAll();
  }
});
