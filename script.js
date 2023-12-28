const allButtons = document.querySelectorAll('.button');
const numberButtons = Array.from(document.querySelectorAll('.number'));
const display = document.querySelector('.display-box')
const clearButton = document.querySelector('.C')
const operatorButtons = Array.from(document.querySelectorAll('.operator'))
const equalsButton = document.querySelector('.equals');
const posNegButton = document.querySelector('.pos-neg');
let values = [];

let currentTotal = 0;
let lastNum;
let currentOperator = '';
let nextInputResets = false;
let currentInput;
display.textContent=0;


function pressNumber(number) {
    currentInput = true;
    if(display.textContent.length <= 9) {

        if(nextInputResets) {
            updateDisplay(number)
            nextInputResets = false;
        }

        else{
            updateDisplay(display.textContent+number);
        }
    }


}

function updateDisplay(number) {
    display.textContent = +number;
}

function clearDisplay(){
    values = [];
    display.textContent = 0;
    nextInputResets = false;
    currentInput = false;
    currentOperator = '';
    lastNum = null;
}

function storeValue() {
    values.push(+display.textContent);
}

function setOperator(operator){
    currentOperator = operator.trim();
}

function operatorButton(operator) {

    if(currentInput) {
        storeValue();
        if(values.length == 2){
            evaluate();
        }
        nextInputResets = true;
    }
    setOperator(operator);
    currentInput = false;

}

function evaluate() {
    let num1 = values[0];
    let num2 = values[1];
    let total = 0;

    switch(currentOperator) {
        case '+':
            total = num1 + num2;
            break;
        
        case '-':
            total = num1 - num2;
            break;

        case '*':
            total = num1 * num2;
            break;

        case '/':
            total = num1/num2;
            break;
    }

    updateDisplay(total);
    lastNum = num2;
    values = [total];
}

function equals() {
    if (currentInput) {
        storeValue();
        evaluate();
        nextInputResets = true;
        currentInput = false;
    }

    else{
        values.push(lastNum)
        evaluate();
    }
}

function posNeg() {
    if (display.textContent.startsWith('-')){
        updateDisplay(Math.abs(display.textContent));
    }

    else{
        updateDisplay(`-${display.textContent}`);
    }
}


numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        pressNumber(+e.target.textContent)
    });
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        operatorButton(e.target.textContent)
    });
})

clearButton.addEventListener('click', clearDisplay)

equalsButton.addEventListener('click', equals);

posNegButton.addEventListener('click', posNeg);