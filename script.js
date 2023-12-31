const allButtons = document.querySelectorAll('.button');
const numberButtons = Array.from(document.querySelectorAll('.number'));
const display = document.querySelector('.display-box')
const clearButton = document.querySelector('.C')
const operatorButtons = Array.from(document.querySelectorAll('.operator'))
const equalsButton = document.querySelector('.equals');
const posNegButton = document.querySelector('.pos-neg');
const decimalButton = document.querySelector('.decimal');
const percentButton = document.querySelector('.percent');
let values = [];

let currentTotal = 0;
let lastNum;
let equalsJustPressed;
let currentOperator = '';
let nextInputResets = false;
let currentInput = false;
display.textContent=0;


function pressNumber(number) {
    currentInput = true;

    if (equalsJustPressed) {
        values = [];
        setOperator('');
        equalsJustPressed = false;
    }

    if(display.textContent.length <= 10) {

        if(nextInputResets || (display.textContent === '0' && number != '.')) {
            updateDisplay(number)
            nextInputResets = false;
        }

        else{
            updateDisplay(display.textContent+number);
        }
    }


}

function updateDisplay(number) {
    if (number > Math.pow(10, 99)){
        number = '∞';
    }

    if (number < Math.pow(-10, 99)){
        number = '-∞';
    }

    if (number < Math.pow(10, -99) && number > 0 && number != 0){
        number = 0;
    }

    else{
        let length = number.toString().length;
        if (length > 9 && number > 0) {
            number = +number;
            number = number.toExponential(4);
        }
        else if(length > 8 && number < 0){
            number = +number;
            number = number.toExponential(3);
        }
    }
    display.textContent = number;
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

    equalsJustPressed = false;
    if(display.textContent == 0){
        currentInput = true;
    }

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
            if (num2 === 0) {
                total = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAA WHY WOULD YOU DO THIS AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
                break;
            }
            total = num1/num2;
            break;

        default:
            total = num1;
    }

    updateDisplay(total);
    lastNum = num2;
    values = [total];
}

function equals() {
    if (currentInput) {
        storeValue();
        evaluate();
        currentInput = false;
        nextInputResets = true;
        equalsJustPressed = true;
    }

    else{
        values.push(lastNum);
        evaluate();
    }
    
}

function posNeg() {
    if (display.textContent != 0){
        if (display.textContent.startsWith('-')){
            updateDisplay(Math.abs(display.textContent));
        }

        else{
            updateDisplay(`-${display.textContent}`);
        }
    }
}

function decimal() {
    if (!display.textContent.includes('.')){
        pressNumber('.');
    }
}

function percent() {
    if(values[0]){
        storeValue();
        if (currentOperator === '/' || currentOperator === '*'){
            values[1] = (values[1]/100);
        }
        else {
            values[1] = values[0] * (values[1]/100);
        }
        evaluate();
        values[1] = lastNum;
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

decimalButton.addEventListener('click', decimal);

percentButton.addEventListener('click', percent);

document.addEventListener('keypress', (e) => {
    console.log(e.key);
    switch(e.key){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            pressNumber(e.key);
            break;
            
        case '+':
        case '-':
        case '/':
        case '*':
            operatorButton(e.key);
            break;

        case 'Enter':
            equals();
            break;

        default:
            break;
    }
})