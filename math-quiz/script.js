// timer
class Timer {
    constructor () {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.startTime) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    start () {
    //   if (this.isRunning) {
    //     return console.error('Timer is already running');
    //   }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    stop () {
    //   if (!this.isRunning) {
    //     return console.error('Timer is already stopped');
    //   }
  
      this.isRunning = false;
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    reset () {

      this.isRunning = false;

      this.overallTime = 0;
  
      if (this.isRunning) {
        this.startTime = Date.now();
        return;
      }
  
      this.startTime = 0;
    }
  
    getTime () {
      if (!this.startTime) {
        return 0;
      }
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
  
      return this.overallTime;
    }
}

var timeLimit = 0;
var timedOut = false;
const timer = new Timer();

var noOfScore = 0
var noOfQuestions = 0
var gameMultiplier = 1

getRadioValue()

document.querySelector('.question p').innerHTML = ""

// make element hidden
document.getElementById('user-answer').style.visibility = "hidden";
document.getElementById('submitBtn').style.visibility = "hidden";
document.getElementById('user-name').style.visibility = "hidden";
document.getElementById('saveScoreBtn').style.visibility = "hidden";

// applyChange()
// checkIfContinue()

// Get the input field
var userInput = document.getElementById('user-answer');

// Execute a function when the user releases a key on the keyboard
userInput.addEventListener("keyup", function(event) {
    
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submitBtn").click();
    }
});


const userName = document.getElementById('user-name');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

saveScoreBtn.disabled = true;

userName.addEventListener("keyup", function(event) {
    saveScoreBtn.disabled = !userName.value
    
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("saveScoreBtn").click();
    }
})


function getRadioValue() {
    selectedLevel = document.querySelector('input[name="level"]:checked').value;
    selectedMode = document.querySelector('input[name="mode"]:checked').value;
    selectedQns = document.querySelector('input[name="noqns"]:checked').value;
}

function applyChange() {

    getRadioValue()

    // show all selected preferences
    if (selectedQns != 999) {
        document.querySelector('.titles h1').innerHTML = selectedLevel + ' ' + selectedMode + ' (' + selectedQns + ' Questions)'
    } else {
        document.querySelector('.titles h1').innerHTML = selectedLevel + ' ' + selectedMode + ' ' + '(1 Minute Challenge)'
    }
    
    // reset scores
    noOfScore = 0
    noOfQuestions = 0

    timedOut = false

    timerInterval = setInterval(() => {
        const timeInSeconds = Math.round(timer.getTime() / 1000);
        if (timeInSeconds <= timeLimit) {
            document.getElementById('time').innerText = timeLimit - timeInSeconds;
            // timedOut = false
        } else {
            timer.stop()
            clearInterval(timerInterval)
            document.getElementById('time').innerText = 0;
            timedOut = true
            checkIfContinue()
        }
    }, 100)

    timer.reset()
    timer.start()

    // make element visible
    document.getElementById('user-answer').style.visibility = "visible";
    document.getElementById('submitBtn').style.visibility = "visible";

    // hide save score elements
    document.getElementById('user-name').style.visibility = "hidden";
    document.getElementById('saveScoreBtn').style.visibility = "hidden";

    // move focus to answer box
    document.getElementById('user-answer').focus();
    document.getElementById('user-answer').select();

    console.log(timedOut)
    // re-generate question
    checkIfContinue()

    if (selectedLevel == "Easy") {
        timeLimit = selectedQns * 5
    } else if (selectedLevel == "Medium") {
        timeLimit = selectedQns * 5  
    } else if (selectedLevel == "Hard") {
        timeLimit = selectedQns * 5 
    } else if (selectedLevel == "Crazy") {
        timeLimit = selectedQns * 2
    }

    if (selectedQns == '999') {
        timeLimit = 60

        if (selectedLevel == "Easy") {
            gameMultiplier = 1
        } else if (selectedLevel == "Medium") {
            gameMultiplier = 1.2
        } else if (selectedLevel == "Hard") {
            gameMultiplier = 1.5
        } else if (selectedLevel == "Crazy") {
            gameMultiplier = 1.8
        }
    }

}

function generateQ() {


    // move focus to answer box
    document.getElementById('user-answer').focus();
    document.getElementById('user-answer').select();
    
    // console.log(selectedLevel)

    if (selectedLevel == "Easy") {
        if (['Addition', 'Subtraction'].includes(selectedMode)) {
            rn1 = Math.floor(Math.random() * 20) + 1
            rn2 = Math.floor(Math.random() * 20) + 1
        } else {
            rn1 = Math.floor(Math.random() * 5) + 1
            rn2 = Math.floor(Math.random() * 5) + 1     
        }
    } else if (selectedLevel == "Medium") {
        if (['Addition', 'Subtraction'].includes(selectedMode)) {
            rn1 = Math.floor(Math.random() * 49) + 2
            rn2 = Math.floor(Math.random() * 48) + 3
        } else {
            rn1 = Math.floor(Math.random() * 8) + 2
            rn2 = Math.floor(Math.random() * 8) + 2     
        }
    } else if (selectedLevel == "Hard") {
        if (['Addition', 'Subtraction'].includes(selectedMode)) {
            rn1 = Math.floor(Math.random() * 99) + 2
            rn2 = Math.floor(Math.random() * 97) + 4
        } else {
            rn1 = Math.floor(Math.random() * 11) + 2
            rn2 = Math.floor(Math.random() * 11) + 2      
        }

    } else if (selectedLevel == "Crazy") {
        if (['Addition', 'Subtraction'].includes(selectedMode)) {
            rn1 = Math.floor(Math.random() * 99) + 2
            rn2 = Math.floor(Math.random() * 97) + 4
        } else {
            rn1 = Math.floor(Math.random() * 6) + 9
            rn2 = Math.floor(Math.random() * 13) + 2      
        }     
    }

    if (selectedMode == 'Addition') {
        document.querySelector('.question p').innerHTML = String(rn1) + ' + ' + String(rn2) + ' ='
        answer = rn1 + rn2
    } else if (selectedMode == 'Subtraction') {
        document.querySelector('.question p').innerHTML = String(rn1 + rn2) + ' - ' + String(rn2) + ' ='
        answer = rn1
    } else if (selectedMode == 'Multiplication') {
        document.querySelector('.question p').innerHTML = String(rn1) + ' × ' + String(rn2) + ' ='
        answer = rn1 * rn2
    } else {
        document.querySelector('.question p').innerHTML = String(rn1 * rn2) + ' ÷ ' + String(rn2) + ' ='
        answer = rn1
    }

    
}

function calcAccuracy(noCorrect, noAnswered) {
    if (noAnswered == 0) {
        return '?';
    } else {
        return String(Math.round(noCorrect / noAnswered * 100)) + '%';
    }
}

function calcScore(noCorrect, noAnswered, multiplier) {
    if (noAnswered == 0) {
        return 0;
    } else {
        return Math.round(multiplier*noCorrect*noCorrect/noAnswered*100);
    }
}

function checkIfContinue() {

    // make element visible
    document.getElementById('user-answer').style.visibility = "visible";
    document.getElementById('submitBtn').style.visibility = "visible";

    // placeholder feedback
    document.querySelector('.feedback p').innerHTML = '🌏'

    // recalculate score
    if (selectedQns != 999) {
        document.querySelector('.score p').innerHTML = 'Progress: ' + noOfQuestions + ' / ' + selectedQns + " (Accuracy: " + calcAccuracy(noOfScore, noOfQuestions) + ")"
    } else {
        document.querySelector('.score p').innerHTML = 'Score: ' + String(calcScore(noOfScore,noOfQuestions,gameMultiplier)) + " (Accuracy: " + calcAccuracy(noOfScore, noOfQuestions) + ")"
    }
    

    // clear user answer
    document.getElementById('user-answer').value = ''

    if (noOfQuestions < selectedQns && timedOut == false) {
        // DURING GAME

        generateQ()

        // show question number
        document.querySelector('.titles h2').innerHTML = 'Question ' + String(noOfQuestions + 1)

    } else {
        // WHEN GAME FINISHES
        // stop checking timer
        clearInterval(timerInterval)

        // disable answer box and button
        document.getElementById('user-answer').style.visibility = "hidden";
        document.getElementById('submitBtn').style.visibility = "hidden";
        
        document.querySelector('.question p').innerHTML = 'Thank you for playing!'
        document.querySelector('.feedback p').innerHTML = ''
        document.querySelector('.score p').innerHTML = ''

        document.getElementById('user-answer').blur();

        if (selectedQns != 999) {
            if (noOfScore == selectedQns) {
                medal = "🥇 Perfect!"
            } else if (noOfScore / selectedQns >= 0.9) {
                medal = "🥈 Excellent!"
            } else if (noOfScore / selectedQns >= 0.8) {
                medal = "🥉 Great job!"
            } else {
                medal = "🤦🏻‍♂️ You can do better!"
            }
    
            document.querySelector('.titles h2').innerHTML = medal + "<br />" + "You answered " + calcAccuracy(noOfScore,selectedQns) + " of the questions correctly."
    
        } else {
            document.querySelector('.titles h2').innerHTML = 'Score: ' + calcScore(noOfScore,noOfQuestions,gameMultiplier) + "<br />" + "Answered: " + String(noOfQuestions) + "<br />" + "Accuracy: " + calcAccuracy(noOfScore, noOfQuestions)

            // show field and button to save score
            document.getElementById('user-name').style.visibility = "visible";
            document.getElementById('saveScoreBtn').style.visibility = "visible";

            // move focus to user name box
            // document.getElementById('user-name').focus();
            // document.getElementById('user-name').select();

        }
        
    }

}

function evaluateAns() {

    // move focus to answer box
    document.getElementById('user-answer').focus();
    // document.getElementById('user-answer').select();
    
    if (noOfQuestions < selectedQns) {
        
        const userAnswer = document.getElementById('user-answer')

        if (answer == userAnswer.value) {
            document.querySelector('.feedback p').innerHTML = '✅'
            noOfScore++
            setTimeout("checkIfContinue()", 200)
        } else {
            document.querySelector('.feedback p').innerHTML = '❌ Answer: ' + answer
            setTimeout("checkIfContinue()", 1000)
        }

        noOfQuestions++ //increment by 1

    }
}

function saveScore() {
    
    userNameValue = document.getElementById('user-name').value

    document.querySelector('.question p').innerHTML = 'Score saved!'
    // document.querySelector('.feedback p').innerHTML = 'Score saved!'
    document.querySelector('.score p').innerHTML = ''

    document.getElementById('user-name').style.visibility = "hidden";
    document.getElementById('saveScoreBtn').style.visibility = "hidden";

    saveScoreBtn.disabled = true

    const gameReport = {
        score: calcScore(noOfScore,noOfQuestions,gameMultiplier),
        name: userNameValue
    };

    highScores.push(gameReport) // append to high scores
    
    highScores.sort( (a,b) => b.score - a.score) // implicit return of a function - put b before a if b > a

    highScores.splice(5) // cut off at 5 records

    localStorage.setItem("highScores", JSON.stringify(highScores));

    // clear user name field
    document.getElementById('user-name').value = ''

}