// API
const API_ENDPOINT = 'https://yesno.wtf/api';

// SELECTORS
const ballSelector = document.querySelector('#ball');
const btnSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');

let isRequestInProgress = false;

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */

// this function use in cleanResponse and fetchAnswer function
const setIsRequestInProgress = value => {
    isRequestInProgress = value;
};

// this function use in cleanResponse function
const setDisableButtonState = isDisabling => {
    // if isDisabling is 'ture' add 'disable' attribute to button
    if (isDisabling) {
        btnSelector.setAttribute('disable', 'disable');
    } else {
        btnSelector.removeAttribute('disable');
    }
};

// this method use in showAnswer and fetchAnswer function
const cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setIsRequestInProgress(false);
        setDisableButtonState(false);
    }, 3000);
}

// this function use in fetchAnswer and handleKeyEnter function
const showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<p> ${answer} </p>`;
        ballSelector.classList.remove('shake__ball');
        cleanupResponse();
    }, 1000);
};

// this function use in getAnswer function
const fetchAnswer = () => {
    setIsRequestInProgress(true);
    setDisableButtonState(true);

    ballSelector.classList.add('shake__ball');

    fetch(API_ENDPOINT)
        .then(data => data.json())
        .then(data => showAnswer(data.answer));
};

// this function use in getAnswer function
const showError = () => {
    errorSelector.innerHTML = `You need to type your question.`;

    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 3000);
};

// this function use in addEventListener of Button
const getAnswer = () => {
    // if isRequestInProgress is 'true' state
    if (isRequestInProgress) {
        return;
    }
    // if there is no value in input
    if (!inputSelector.value) {
        return showError();
    }
    fetchAnswer();
}

// if user pressed the enter key, invoke getAnswer function
const handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};


btnSelector.addEventListener('click', getAnswer);
