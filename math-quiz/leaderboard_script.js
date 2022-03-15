
displayLeaderboard();

function displayLeaderboard() {

    document.getElementById('validationQnSec').style.visibility = "hidden";

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    console.log(highScores);
    
    highScoresList = highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
    
    console.log(highScoresList);
    
    document.querySelector('.wrapper p').innerHTML = highScoresList;
}

function clearLocalStorage() {

    const userAns = document.getElementById('validationAns').value;
    
    if (userAns == ans) {
        localStorage.clear();
    }
    
    displayLeaderboard();
}

function validationQnGen() {

    document.getElementById('validationQnSec').style.visibility = "visible";

    const rn1 = Math.floor(Math.random() * 10) + 90
    const rn2 = Math.floor(Math.random() * 10) + 90

    ans = rn1 * rn2

    document.querySelector('.validationQn p').innerHTML = rn1 + ' × ' + rn2 + ' = ?';

}