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


const billInput = document.getElementById('bill');
    billInput.addEventListener('input', function(event){
    const billValue = billInput.value.trim();
    const billParentElement = billInput.parentElement;
    console.log('parent eelemnt of bill is: ', billParentElement);
    const numericValue = parseFloat(billValue);
    if (billValue === "") {
        billInput.style.borderColor = "#FF0000";
        console.log('can\'t have empty string. Try again');
    }
    else if ((!Number.isFinite(numericValue) || numericValue < 0)) {
        billInput.style.borderColor = "#FF0000";
        console.log('value must be a positive numeric');
    } else {
        billInput.style.borderColor = "";
    }
}); 

function validateNumOfPeople() {
    const numOfPeopleElement = document.getElementById('num-of-people');
    const elementValue = numOfPeopleElement.value.trim();
    if (elementValue === "") {
        console.log('can\'t have empty string. Try again')
        return false
    }
    if (typeof elementValue === 'string' && (!Number.isFinite(elementValue) || elementValue <= 0)) {
        console.log('value must be a greater than 0')
        return false
    }
    return true
}

const tipContainer = document.querySelector('.tip-container');

tipContainer.addEventListener('input', function (event) {
    const target = event.target;
    const customTip = document.getElementById('custom-tip');
    const radioButtons = document.getElementsByName('tip-percentage');
    const customTipParent = customTip.parentElement;
    if (target.tagName !== 'INPUT') return;
    if (target.type === 'radio' && event.target.checked) {
        customTip.value = '';
        console.log('radio button was clicked')
    }
    if (target.type === 'text') {
        console.log('text input was clicked');
        radioButtons.forEach(radio => {
            if (radio.type === 'radio') {
                radio.checked = false;
            }
        });
        if (!isNumeric(customTip.value)) {
            customTipParent.style.borderColor = "#FF0000";
        } else {
            customTipParent.style.borderColor = "";
        }
    }
});

function isNumeric(value) {
    if (value.trim() === '') {
        return false;
    }
    const numeric = Number(value);
    return !isNaN(numeric) && isFinite(numeric) && numeric >= 0
}