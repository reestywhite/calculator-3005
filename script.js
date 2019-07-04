const display = document.querySelector('.display');
const wholeCalculator = document.querySelector('.calculator');
var runningCalculation = "";
var decimalPushed = false;
var operatorPushed = false;

function add(x, y) {
    return x + y;
};

function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    return x / y;
};

function operate(x, y, operator) {
    switch (operator) {
        case "+":
            return add(parseFloat(x), parseFloat(y));
        case "-":
            return subtract(parseFloat(x), parseFloat(y));
        case "×":
            return multiply(parseFloat(x), parseFloat(y));
        case "÷":
            return divide(parseFloat(x), parseFloat(y));
    }
}

function equalCalculation(calculation) {
    if (calculation.length > 1) {
        calculation = calculation.split(" ");
    } else {
        return;
    }

    if (calculation[0] == "")
        calculation.splice(0, 1, 0);

    calcLength = calculation.length;
    for (var i = 0; i < calcLength; i++) {
        if (calculation[i] == '×' || calculation[i] == '÷') {
            if (parseFloat(calculation[i + 1]) == 0) {
                window.alert("Bro.. You can't divide by zero...");
                clear();
                return;
            } else {
                calculation.splice(i - 1, 3, operate(calculation[i - 1], calculation[i + 1], calculation[i]));
                i -= 1; //Makes sure that once the calculation is spliced, the for loop doesnt skip over the next operator
            }
        }
    }

    calcLength = calculation.length;
    for (var i = 0; i < calcLength; i++) {
        if (calculation[i] == '+' || calculation[i] == '-') {
            calculation.splice(i - 1, 3, operate(calculation[i - 1], calculation[i + 1], calculation[i]));
            i -= 1;
        }
    }

    if (Number.isInteger(calculation[0])) {
        decimalPushed = false;
    } else {
        decimalPushed = true;
    }

    operatorPushed = false;

    fillDisplay(calculation, true);
}

function clear() {
    runningCalculation = "";
    fillDisplay("", true);
    decimalPushed = false;
    operatorPushed = false;
    return;
}

function backspace() {
    splitCalc = runningCalculation.split("");

    if (splitCalc[splitCalc.length - 1] == " ") {
        splitCalc.pop();
        splitCalc.pop();
        operatorPushed = false;
    } else {
        if (splitCalc[splitCalc.length - 1] == ".") {
            decimalPushed = false;
        }
        splitCalc.pop();
    }

    runningCalculation = splitCalc.join("");

    fillDisplay(runningCalculation, true);
    return;
}

function fillDisplay(text, displayJustText) {
    if (isNaN(text) && text !== "." && displayJustText == false) {
        if (operatorPushed == true) {
            return;
        } else {
            runningCalculation = runningCalculation + " " + text + " ";
            decimalPushed = false;
            operatorPushed = true;
        }
    } else if (displayJustText == true) {
        runningCalculation = text;
    } else if (text == ".") {
        if (decimalPushed == false) {
            runningCalculation += text;
        }
        decimalPushed = true;
    } else {
        runningCalculation += text;
        operatorPushed = false;
    }

    if (text == ".") {
        decimalPushed = true;
    }

    display.textContent = runningCalculation;
}

function buttonCheck(e) {
    if (e.target.className !== 'btn') {
        return;
    } else if (e.target.id == 'equals') {
        equalCalculation(runningCalculation);
        return;
    } else if (e.target.id == 'clear') {
        clear();
        return;
    } else if (e.target.id == 'backspace') {
        backspace();
        return;
    } else {
        fillDisplay(e.target.textContent, false);
        return;
    }
}

wholeCalculator.addEventListener('click', buttonCheck);