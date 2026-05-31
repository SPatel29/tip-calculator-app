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



const customTipTextInput = document.getElementById('custom-tip');

customTipTextInput.addEventListener('focus', () => {
    const checkedRadio = document.querySelector('input[name="tip-percentage"]:checked');
    if (checkedRadio) {
        checkedRadio.checked = false;
    }
});

const numberOfPeopleInput = document.getElementById('num-of-people');
const numPeopleErrMsg = document.getElementById('num-people-error-msg');
const numOfPeopleInput = document.getElementById('num-of-people');
numberOfPeopleInput.addEventListener('input', () => {
    const numberOfPeople = event.target.value;
    console.log("value of input is: " + Number(numberOfPeople));
    if (Number(numberOfPeople) < 1) {
        numPeopleErrMsg.textContent = "Can't be less than 1";
        numPeopleErrMsg.style.display = "block";
        numOfPeopleInput.style.border = "2px solid red";
    } else if (Number(numberOfPeople) >= 1) {
        numPeopleErrMsg.style.display = "none";
        numOfPeopleInput.style.border = "2px solid #3498db";
    } else {
        numPeopleErrMsg.textContent = "Must be a number";
        numPeopleErrMsg.style.display = "block";
        numOfPeopleInput.style.border = "2px solid red";
    }
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
    // click should set all inputs to 0, and
    // unclick radio buttons if clicked 
});