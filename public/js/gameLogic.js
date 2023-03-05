const currentQuestion = document.querySelector('#question')

const option1 = document.querySelector('#option1')
const option2 = document.querySelector('#option2')
const option3 = document.querySelector('#option3')
const option4 = document.querySelector('#option4')
const optBtn = document.querySelector('.option-btn')

const starter = document.querySelector('#start')
const rulesBox = document.querySelector('.info_box');
const testBox = document.querySelector('#quiz')

let question_number = -1

let question_set = []
let answerSet = []
let toSplice = []
let correctAnswers = []

let answeredRight = 0
let answeredWrong = 0

let [milliseconds, seconds, minutes] = [0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;


let testTime = 23

//event listeners for the buttons on the actual test taking page
option1.addEventListener('click', () => {
    // event.preventDefault();
    if (option1.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    } else {
        answeredWrong++
    }

    //running this set of logs shows it using the next questions answers
    console.log("Question Number: " + (question_number + 1))
    console.log("User Selected: " + option1.textContent)
    console.log("Correct Answer: " + decodeURIComponent(correctAnswers[question_number]))
    console.log("Answered Right: " + answeredRight)
    console.log("Answered Wrong: " + answeredWrong)
    console.log("-----------------------------------")

    isOver();
    nextQ();
});

option2.addEventListener('click', () => {
    // event.preventDefault();
    if (option2.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }

    console.log("Question Number: " + (question_number + 1))
    console.log("User Selected: " + option2.textContent)
    console.log("Correct Answer: " + decodeURIComponent(correctAnswers[question_number]))
    console.log("Answered Right: " + answeredRight)
    console.log("Answered Wrong: " + answeredWrong)
    console.log("-----------------------------------")

    isOver();
    nextQ();
});

option3.addEventListener('click', () => {
    // event.preventDefault();
    if (option3.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }

    console.log("Question Number: " + (question_number + 1))
    console.log("User Selected: " + option3.textContent)
    console.log("Correct Answer: " + decodeURIComponent(correctAnswers[question_number]))
    console.log("Answered Right: " + answeredRight)
    console.log("Answered Wrong: " + answeredWrong)
    console.log("-----------------------------------")

    isOver();
    nextQ();
});

option4.addEventListener('click', () => {
    // event.preventDefault();
    if (option4.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }

    console.log("Question Number: " + (question_number + 1))
    console.log("User Selected: " + option4.textContent)
    console.log("Correct Answer: " + decodeURIComponent(correctAnswers[question_number]))
    console.log("Answered Right: " + answeredRight)
    console.log("Answered Wrong: " + answeredWrong)
    console.log("-----------------------------------")

    isOver();
    nextQ();
});



// start button to allow the user to start teh timer and test when thye are fully ready
starter.addEventListener('click', () => {
    question_number = -1

    question_set = []
    answerSet = []
    toSplice = []
    correctAnswers = []

    answeredRight = 0
    answeredWrong = 0

    seperateData();
    [milliseconds, seconds, minutes,] = [0, 0, 0];

    displayTimer();
    int = setInterval(displayTimer, 10);

    rulesBox.classList.add('hidden');
    rulesBox.classList.remove('hidden');

})



//timer componenets
function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = ` ${m} : ${s} : ${ms}`;
}

const stopTimer = () => {
    clearInterval(int);
    // console.log([milliseconds, seconds, minutes][0])
};

const finalTime = () => {
    let penalty = answeredWrong * 2;
    seconds += penalty;

    if (seconds >= 60) {
        seconds = seconds - 60;
        minutes++;
    }

    console.log(seconds)
}



//checks to see if test is over and if so sends user to results page
const isOver = () => {
    if (question_number == question_set.length - 1) {
        stopTimer();
        finalTime()

        if (minutes > 1) {
            testTime = (minutes + ' Minutes ' + seconds + '.' + milliseconds + ' seconds')
            console.log(testTime)
        }

        if (minutes == 1) {
            testTime = (minutes + ' Minute ' + seconds + '.' + milliseconds + ' seconds')
            console.log(testTime)
        }

        if (minutes < 1) {
            testTime = (seconds + '.' + milliseconds + ' seconds')
            console.log(testTime)
        }

        // localStorage.setItem("testTime", JSON.stringify(testTime))
        localStorage.setItem("testTime", JSON.stringify(answeredRight))
        location.replace('/results')

    }
}



//once an answer choice is selected both functions will run to change the text for the current question and its related options.
const nextQ = () => {
    question_number++
    currentQuestion.textContent = decodeURIComponent(question_set[question_number])
    nextA();
}

const nextA = () => {
    const trueLength = toSplice[question_number].length;
    let optionSet = []
    for (let i = 0; i < trueLength; i++) {
        let returnedChoice = selectRandomChoice(toSplice[question_number]);
        // console.log(returnedChoice);
        optionSet.push(returnedChoice);

    }
    // console.log(optionSet)
    option1.textContent = decodeURIComponent(optionSet[0])
    option2.textContent = decodeURIComponent(optionSet[1])
    option3.textContent = decodeURIComponent(optionSet[2])
    option4.textContent = decodeURIComponent(optionSet[3])

}



// randomizes the choices from the answer array so that the correct answer is not always the first option
function selectRandomChoice(questionObject) {
    let arrayLength = questionObject.length;
    let randomIndex = Math.floor(Math.random() * (arrayLength));
    let choiceItem = questionObject.splice(randomIndex, 1)[0];
    return choiceItem;
}



// runs the api fetch and gets all of the current test data seperated properly i.e. questons, answers and correct answers
const seperateData = async () => {


    try {
        let data = await fetch('https://opentdb.com/api.php?amount=25&category=15&difficulty=medium&type=multiple&encode=url3986')

        let response = await data.json()
        console.log(response)

        for (i = 0; i < response.results.length; i++) {

            question_set.push(response.results[i].question);
            correctAnswers.push(response.results[i].correct_answer);
            let holdingOne = [response.results[i].correct_answer];
            let currentAnswers = holdingOne.concat(response.results[i].incorrect_answers);

            answerSet.push(currentAnswers);
            toSplice.push(currentAnswers);
            // console.log(answerSet)
        }
    } catch (err) {
        alert(err);
    }

    nextQ();
}