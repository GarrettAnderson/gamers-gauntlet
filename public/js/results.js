const scoreDisplay = document.querySelector('#finalScore');
const restart = document.querySelector('#restart');
const exitQuiz = document.querySelector('#quit');

const displayScore = () => {
    let previousScore = JSON.parse(localStorage.getItem("testTime"))
    scoreDisplay.textContent = previousScore
}

restart.addEventListener('click', () => {
    location.replace('/quiz')
})

exitQuiz.addEventListener('click', () => {
    location.replace('/homepage')
})

displayScore();