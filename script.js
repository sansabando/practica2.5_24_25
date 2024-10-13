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
