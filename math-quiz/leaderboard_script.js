
displayLeaderboard();

function displayLeaderboard() {

    document.getElementById('validationQnSec').style.visibility = "hidden";

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    console.log(highScores);

    leaderNameList = highScores.map(score => {
        return `<li class="high-score">${score.name}</li>`;
    }).join("")

    leaderScoreList = highScores.map(score => {
        return `<li class="high-score">${score.score}</li>`;
    }).join("")        
    
    if (leaderNameList=='') {
        document.querySelector('.wrapper h2').innerHTML = 'Nobody has completed a challenge on this device yet.';
    } else {
        document.querySelector('.wrapper h2').innerHTML = '';
    }

    document.querySelectorAll('.listArea ol')[0].innerHTML = leaderNameList;
    document.querySelectorAll('.listArea ol')[1].innerHTML = leaderScoreList;
    
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

    document.getElementById('validationAns').value = '';

    const rn1 = Math.floor(Math.random() * 99) + 391
    const rn2 = Math.floor(Math.random() * 99) + 591

    ans = rn1 * rn2

    document.querySelector('.validationQn p').innerHTML = rn1 + ' × ' + rn2 + ' = ?';

}