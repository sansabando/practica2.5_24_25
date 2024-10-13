let currentValue = 0;
let firstValue = null; 
let operator = ''; 
let csvValues = []; 
let errorLog = []; 
let operationLog = []; 

//Actualize the value and dinamic title
function updateDisplay() {
    const display = document.getElementById("display");
    display.value = currentValue;

    
    const progressBar = document.getElementById("progress-bar");
    progressBar.classList.add('active');
    setTimeout(() => {
        progressBar.classList.remove('active');
    }, 2000);
    updateDynamicTitle(currentValue);
}



function updateDynamicTitle(value) {
    const titleElement = document.getElementById("info");
    
    if (value === '') {
        titleElement.innerHTML = 'Information about the Number'; 
    } else {
        let operationText = `Operation: ${operator}`; 

        let resultText;

        
        if (value < 100) {
            resultText = 'Result: The result is less than 100';
        } else if (value >= 100 && value <= 200) {
            resultText = 'Result: The result is between 100 and 200';
        } else {
            resultText = 'Result: The result is greater than 200';
        }

        titleElement.innerHTML = `${operationText}<br>${resultText}`; 
    }
}


function setOperation(op) {
    const displayValue = document.getElementById("display").value.trim();
    
    if (!validate(displayValue)) {
        showError("Error: Invalid input. Please enter a valid number or CSV format. ");
        return;
    }

    if (firstValue === null) {
        firstValue = parseFloat(displayValue);
    } else {
        firstValue = currentValue;
    }
    
    operator = op;
    document.getElementById("display").value = ''; 
}


function calculate() {
    const secondValue = parseFloat(document.getElementById("display").value);

    if (isNaN(firstValue) || isNaN(secondValue)) {
        showError("Error: Invalid numbers entered.");
        return;
    }

    let operation = ''; 

    switch (operator) {
        case 'add':
            currentValue = firstValue + secondValue;
            operation = `${firstValue} + ${secondValue} = ${currentValue}`;
            break;
        case 'subtract':
            currentValue = firstValue - secondValue;
            operation = `${firstValue} - ${secondValue} = ${currentValue}`;
            break;
        case 'multiply':
            currentValue = firstValue * secondValue;
            operation = `${firstValue} * ${secondValue} = ${currentValue}`;
            break;
        case 'division':
            if (secondValue === 0) {
                showError("Error: Division by 0");
                return;
            }
            currentValue = firstValue / secondValue;
            operation = `${firstValue} / ${secondValue} = ${currentValue}`;
            break;
        default:
            showError("Error: No operation selected.");
            return;
    }

    logOperation(operation); 
    firstValue = currentValue;
    updateDisplay();
    document.getElementById("display").value = currentValue;
    
    updateDynamicTitle(currentValue);
}

//Validate function

function validate(input) {
    const invalidChars = /[!"#$%&)'?¡¿]/; 

    if (input.includes(',') || input.includes('-')) {
        return true; 
    }

    for (let i = 0; i < input.length; i++) {
        if (invalidChars.test(input[i])) {
            showError("Error: Invalid characters detected! You cannot use: !\"#$%&)'?¡¿");
            return false;
        }
    }

    const validNumberFormat = /^-?\d+(\.\d+)?(,-?\d+(\.\d+)?)*$/;

    return validNumberFormat.test(input);
}


//Error function
function showError(message) {
    alert(message); 

    
    const timestamp = new Date().toLocaleString(); 
    errorLog.push(`${timestamp}: ${message}`);
}


document.getElementById("display").addEventListener("input", function() {
    const inputValue = document.getElementById("display").value.trim();
    if (!validate(inputValue)) {
        showError("Error: Invalid input. Only numbers, commas, negatives and decimals are allowed. ");
    }
});


//Functions
function squareRoot() {
    const displayValue = parseFloat(document.getElementById("display").value);

    if (isNaN(displayValue)) {
        showError("Error: Invalid input. Please enter a valid number.");
        return;
    }

    if (displayValue < 0) {
        showError("Error: Cannot calculate the square root of a negative number.");
        return;
    }

    currentValue = Math.sqrt(displayValue);
    logOperation(`Square root of ${displayValue} = ${currentValue}`);
    updateDisplay();
}


function mod() {
    let number = parseFloat(document.getElementById("display").value);
    if (isNaN(number)) {
        showError("Error: Invalid input");
        return;
    }
    currentValue = Math.abs(number);
    logOperation(`Mod of ${number} = ${currentValue}`);

    updateDisplay();
}


function fact() {
    let number = parseInt(document.getElementById("display").value);

    if (isNaN(number) || number < 0) {
        showError("Error: Invalid input");
        return;
    }
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    currentValue = result;
    logOperation(`Factorial of ${number} = ${currentValue}`);

    updateDisplay();
}
