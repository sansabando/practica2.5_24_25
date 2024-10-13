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