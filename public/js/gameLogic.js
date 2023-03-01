let currentQuestion = document.querySelector('#question')

let option1 = document.querySelector('#option1')
let option2 = document.querySelector('#option2')
let option3 = document.querySelector('#option3')
let option4 = document.querySelector('#option4')
let optBtn = document.querySelector('.option-btn')

let starter = document.querySelector('#start')

let question_number = 0

let question_set = []
let answerSet = []
let toSplice = []
let correctAnswers = []

let answeredRight = 0

let [milliseconds, seconds, minutes, hours] = [0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;


//event listeners for the buttons on the actual test taking page
option1.addEventListener('click', () => {
    // event.preventDefault();
    if (option1.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }


    //running this set of logs shows it using the next questions answers
    console.log(option1.textContent)
    console.log(decodeURIComponent(correctAnswers[question_number]))
    console.log(answeredRight)
    console.log(question_number)

    isOver();
    nextQ();
    nextA();
    question_number++
});

option2.addEventListener('click', () => {
    // event.preventDefault();
    if (option2.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }
    console.log(option2.textContent)
    console.log(decodeURIComponent(correctAnswers[question_number]))
    console.log(answeredRight)
    console.log(question_number)

    isOver();
    nextQ();
    nextA();
    question_number++
});

option3.addEventListener('click', () => {
    // event.preventDefault();
    if (option3.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }

    console.log(option3.textContent)
    console.log(decodeURIComponent(correctAnswers[question_number]))
    console.log(answeredRight)
    console.log(question_number)

    isOver();
    nextQ();
    nextA();
    question_number++
});

option4.addEventListener('click', () => {
    // event.preventDefault();
    if (option4.textContent == decodeURIComponent(correctAnswers[question_number])) {
        answeredRight++
    }
    console.log(option3.textContent)
    console.log(decodeURIComponent(correctAnswers[question_number]))
    console.log(answeredRight)
    console.log(question_number)

    isOver();
    nextQ();
    nextA();
    question_number++
});



// start button to allow the user to start teh timer and test when thye are fully ready
starter.addEventListener('click', () => {
    seperateData();
    [milliseconds, seconds, minutes, hours] = [0, 0, 0];

    displayTimer();
    int = setInterval(displayTimer, 10);
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



//checks to see if test is over and if so sends user to results page
const isOver = () => {
    if (question_number == question_set.length - 1) {
        location.replace('https://www.youtube.com/watch?v=ypRJ9ScLmco')
    }
}



//once an answer choice is selected both functions will run to change the text for the current question and its related options.
const nextQ = () => {
    currentQuestion.textContent = decodeURIComponent(question_set[question_number])
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

    // console.log(toSplice);
    // console.log(data.results[1].question);
    console.log(question_set)
    console.log(answerSet);
    console.log(toSplice);
  
    nextQ();
    nextA();
}