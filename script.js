"use strict" // force browser to run code under strict rules, catching silent bugs

/*

Example structure of JS file:

     // 1. Imports
    import { formatCurrency } from './utils/format.js';

    // 2. Constants
    const TAX_RATE = 0.08;

    // 3. State
    let totalCartPrice = 0;

    // 4. DOM Selectors
    const checkoutButton = document.getElementById('checkout-btn');

    // 5. Functions
    function calculateTotal(price) {
    return price + (price * TAX_RATE);
    }

    // 6. Event Listeners
    checkoutButton.addEventListener('click', () => {
    totalCartPrice = calculateTotal(100);
    console.log(formatCurrency(totalCartPrice));
    });

    For the query selectors in JS you can put anything like how you would 
    target them in css:

     // 1. Tag + Attribute + Pseudo-class
    document.querySelector('input[type="radio"]:checked');

    // 2. Parent Class + Child Tag + Attribute
    document.querySelector('.tip-container input[name="tip-percentage"]');

    // 3. Class + Pseudo-class
    document.querySelector('.tip-value:first-of-type');



*/

// parseFloat(input.value) || 0 if nonNumber then it defaults to 0


/* 

    How do I make it so tip and stuff is calculated
    only when I have the values present and making sure
    they are acceptable values
    can I just save them as booleans? then just have them as flag?

*/


/*

    1. Make an event listener on the main container
       this event listener should listen on all inputs
       making sure they are all filled out,
       if all inputs are filled out then it should calculate
       the tipAmonut and the total per person
    
    2. Make an event listener on each element
       based on that do the appopriate logic 



*/


// main container listener
// only see if all inputs are filled, then calculate

// Add a dot (.) before the class name for querySelector


const mainContainer = document.querySelector('.main-container');

mainContainer.addEventListener('change', (event) => {
    // var valid = validateTip(); // && validateTip() && validateNumberOfPeople();
    // if (valid) {
    //     console.log('Everything is valid! We can set text')
    //     // set tip amount here
    // }
});


const numOfPeopleInput = document.getElementById('num-of-people');
numOfPeopleInput.addEventListener('input', function (event) {
    const numOfPeopleValue = numOfPeopleInput.value.trim();
    const numericValue = parseFloat(numOfPeopleValue);
    const numPeopleErrorMsg = document.getElementById('num-people-error-msg')
    if (numOfPeopleValue === "") {
        numOfPeopleInput.style.borderColor = "#FF0000";
        console.log('can\'t have empty string. Try again. IN NUM OF PEOPLE');
        numPeopleErrorMsg.textContent = "Can't have Empty String";
        numPeopleErrorMsg.style.display = 'block';
    }
    else if ((!Number.isFinite(numericValue) || numericValue <= 0)) {
        numOfPeopleInput.style.borderColor = "#FF0000";
        numPeopleErrorMsg.style.display = 'block';
        numPeopleErrorMsg.textContent = "Value Must Be Positive Numeric";
        console.log('value must be a positive numeric. IN. NUM OF PEOPLE');
    } else {
        numOfPeopleInput.style.borderColor = "";
        numPeopleErrorMsg.textContent = "";
        numPeopleErrorMsg.style.display = 'none';
    }
});


const billInput = document.getElementById('bill');
const billErrorMsg = document.getElementById('bill-error-msg');
billInput.addEventListener('input', function (event) {
    const billValue = billInput.value.trim();
    const numericValue = parseFloat(billValue);
    if (billValue === "") {
        billInput.style.borderColor = "#FF0000";
        billErrorMsg.textContent = "Bill can't be an empty string"
        billErrorMsg.style.display = "block";
        console.log('can\'t have empty string. Try again');
    }
    else if ((!Number.isFinite(numericValue) || numericValue < 0)) {
        billInput.style.borderColor = "#FF0000";
        billErrorMsg.textContent = "Bill must be a positive numeric"
        console.log('value must be a positive numeric');
        billErrorMsg.style.display = "block";
    } else {
        billInput.style.borderColor = "";
        billErrorMsg.textContent = "";
        billErrorMsg.style.display = "none";
    }
});

function validateNumOfPeople() {
    const numOfPeopleElement = document.getElementById('num-of-people');
    const elementValue = numOfPeopleElement.value.trim();
    const numOfPeopleErrorMsg = document.getElementById('num-of-people-error-msg')
    if (elementValue === "") {
        console.log('can\'t have empty string. Try again')
        numOfPeopleErrorMsg.style.display = "block";
        return false
    }
    if (typeof elementValue === 'string' && (!Number.isFinite(elementValue) || elementValue <= 0)) {
        console.log('value must be a greater than 0')
        numOfPeopleErrorMsg.style.display = "block";
        return false
    }
    return true
}

const tipContainer = document.querySelector('.tip-container');
const tipErrorMsg = document.getElementById('tip-selection-error-msg');
tipContainer.addEventListener('input', function (event) {
    const target = event.target;
    const customTip = document.getElementById('custom-tip');
    const radioButtons = document.getElementsByName('tip-percentage');
    const customTipParent = customTip.parentElement;
    const numericTipValue = parseFloat(customTip.value);
    console.log('custom tip is: ', customTip)
    console.log('numeric value of custom tip is: ', numericTipValue);
    if (target.tagName !== 'INPUT') return;
    if (target.type === 'radio' && event.target.checked) {
        customTip.value = '';
        tipErrorMsg.textContent = ""
        tipErrorMsg.style.display = "none"
        customTipParent.style.borderColor = "";
        console.log('radio button was clicked')
    }
    if (target.type === 'text') {
        console.log('text input was clicked');
        radioButtons.forEach(radio => {
            if (radio.type === 'radio') {
                radio.checked = false;
            }
        });
        if (customTip.value == "") {
            tipErrorMsg.textContent = "Tip must be numeric";
            tipErrorMsg.style.display = "block";
            customTipParent.style.borderColor = "#FF0000";
        } else if ((!Number.isFinite(numericTipValue) || numericTipValue < 0)) {
            tipErrorMsg.textContent = "Tip must be positive";
            tipErrorMsg.style.display = "block";
            customTipParent.style.borderColor = "#FF0000";
        } else {
            tipErrorMsg.textContent = ""
            tipErrorMsg.style.display = "none"
            customTipParent.style.borderColor = "";
        }
    }
});

function isNumeric(value) {
    if (value.trim() === '') {
        return false;
    }
    const numeric = Number(value);
    return !isNaN(numeric) && isFinite(numeric)
}