"use strict" // force browser to run code under strict rules, catching silent bugs

const numOfPeopleInput = document.getElementById('num-of-people');
numOfPeopleInput.addEventListener('input', function (event) {
    const numOfPeopleValue = numOfPeopleInput.value.trim();
    const numOfPeopleNumericValue = parseFloat(numOfPeopleValue);
    const numPeopleErrorMsg = document.getElementById('num-people-error-msg');
    if (numOfPeopleValue === "") {
        numOfPeopleInput.style.borderColor = "#FF0000";
        console.log('can\'t have empty string. Try again. IN NUM OF PEOPLE');
        numPeopleErrorMsg.textContent = "Can't have Empty String";
        numPeopleErrorMsg.style.display = 'block';
    }
    else if ((!Number.isFinite(numOfPeopleNumericValue) || numOfPeopleNumericValue <= 0)) {
        numOfPeopleInput.style.borderColor = "#FF0000";
        numPeopleErrorMsg.style.display = 'block';
        numPeopleErrorMsg.textContent = "Value Must Be Positive Numeric";
        console.log('value must be a positive numeric. IN. NUM OF PEOPLE');
    } else {
        numOfPeopleInput.style.borderColor = "";
        numPeopleErrorMsg.textContent = "";
        numPeopleErrorMsg.style.display = 'none';
        calculateTotal();
    }
});

const billInput = document.getElementById('bill');
billInput.addEventListener('input', function (event) {
    const billErrorMsg = document.getElementById('bill-error-msg');
    const billValue = billInput.value.trim();
    const billValueNumericValue = parseFloat(billValue);
    if (billValue === "") {
        billInput.style.borderColor = "#FF0000";
        billErrorMsg.textContent = "Bill can't be an empty string"
        billErrorMsg.style.display = "block";
        console.log('can\'t have empty string. Try again');
    }
    else if ((!Number.isFinite(billValueNumericValue) || billValueNumericValue < 0)) {
        billInput.style.borderColor = "#FF0000";
        billErrorMsg.textContent = "Bill must be a positive numeric"
        console.log('value must be a positive numeric');
        billErrorMsg.style.display = "block";
    } else {
        billInput.style.borderColor = "";
        billErrorMsg.textContent = "";
        billErrorMsg.style.display = "none";
        calculateTotal()
    }
});

const tipContainer = document.querySelector('.tip-container');
const customTip = document.getElementById('custom-tip');
const radioButtons = document.getElementsByName('tip-percentage');
tipContainer.addEventListener('input', function (event) {
    const tipErrorMsg = document.getElementById('tip-selection-error-msg');
    const target = event.target;
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
        calculateTotal();
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
            calculateTotal();
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


function calculateTotal() {
    // 1. Properly pull numbers from the text input fields
    let billInputValue = parseFloat(billInput.value.trim());
    let numOfPeopleValue = parseFloat(numOfPeopleInput.value.trim());
    let customTipValue = parseFloat(customTip.value.trim());

    let finalTipPercent = 0.00;

    let tipPerPerson = 0.00;
    let totalPerPerson = 0.00;

    // 2. Isolate tip priorities
    if (!isNaN(customTipValue)) {
        finalTipPercent = customTipValue;
    } else {
        let radioButtonValue = checkIfRadioButtonsHaveValue();
        finalTipPercent = !isNaN(radioButtonValue) ? radioButtonValue : 0;
    }

    if (!isNaN(billInputValue) && !isNaN(numOfPeopleValue) && !isNaN(finalTipPercent)) {
        // 1. Calculate total tip pool (Bill * percentage decimal)
        const totalTipAmount = billInputValue * (finalTipPercent / 100);

        // 2. Divide pools by number of people
        tipPerPerson = totalTipAmount / numOfPeopleValue;
        totalPerPerson = (billInputValue + totalTipAmount) / numOfPeopleValue;

        // 3. Update UI elements (with periods added to the selectors)
        const totalText = document.querySelector('.total-counter');
        totalText.textContent = `$${totalPerPerson.toFixed(2)}`;

        const tipAmountPerPerson = document.querySelector('.tip-counter');
        tipAmountPerPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
    }
}

function checkIfRadioButtonsHaveValue() {
    const selectedRadio = document.querySelector('input[name="tip-percentage"]:checked');
    const value = selectedRadio ? parseFloat(selectedRadio.value) : NaN;

    return value;
}

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function(evenet) {
    
});