const scoreDisplay = document.querySelector('#finalScore');
const restart = document.querySelector('#restart');
const exitQuiz = document.querySelector('#quit');

const displayScore = async () => {
    let previousScore = JSON.parse(localStorage.getItem("testTime"))
    scoreDisplay.textContent = `YOUR SCORE: ${previousScore}/25`
    console.log(previousScore)


    const response = await fetch('/api/scores', {
        method: 'POST',
        body: JSON.stringify({score: previousScore}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // document.location.replace('/quiz');
        console.log('posted score')
      } else {
        console.log('posted score failed')
        alert(response.statusText)
      }
}

restart.addEventListener('click', () => {
    location.replace('/quiz')
})

exitQuiz.addEventListener('click', () => {
    location.replace('/homepage')
})

displayScore();