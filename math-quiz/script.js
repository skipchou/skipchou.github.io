function getRadioValue() {
    selectedLevel = document.querySelector('input[name="level"]:checked').value;
    selectedMode = document.querySelector('input[name="mode"]:checked').value;
    selectedQns = document.querySelector('input[name="noqns"]:checked').value;    
}

function applyChange() {

    getRadioValue()

    // show all selected preferences
    document.querySelector('.titles h1').innerHTML = selectedLevel + ' ' + selectedMode + ' ' + selectedQns

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
        timeLimit = selectedQns * 3
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
    } else if (['Hard', 'Crazy'].includes(selectedLevel)) {
        if (['Addition', 'Subtraction'].includes(selectedMode)) {
            rn1 = Math.floor(Math.random() * 99) + 2
            rn2 = Math.floor(Math.random() * 97) + 4
        } else {
            rn1 = Math.floor(Math.random() * 11) + 2
            rn2 = Math.floor(Math.random() * 11) + 2      
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

function checkIfContinue() {

    // make element visible
    document.getElementById('user-answer').style.visibility = "visible";
    document.getElementById('submitBtn').style.visibility = "visible";

    // placeholder feedback
    document.querySelector('.feedback p').innerHTML = '🌏'

    // recalculate score
    document.querySelector('.score p').innerHTML = 'Score: ' + noOfScore + ' / ' + noOfQuestions + " (" + String(Math.round(noOfScore/selectedQns*100)) + "%)"

    // clear user answer
    document.getElementById('user-answer').value = ''

    if (noOfQuestions < selectedQns && timedOut == false) {
        generateQ()

        // show question number
        document.querySelector('.titles h2').innerHTML = 'Question ' + String(noOfQuestions + 1)
    } else {

        // stop checking timer
        clearInterval(timerInterval)

        // disable answer box and button
        document.getElementById('user-answer').style.visibility = "hidden";
        document.getElementById('submitBtn').style.visibility = "hidden";

        if (noOfScore == selectedQns) {
            medal = "🥇 Perfect!"
        } else if (noOfScore / selectedQns >= 0.9) {
            medal = "🥈 Excellent!"
        } else if (noOfScore / selectedQns >= 0.85) {
            medal = "🥉 Great job!"
        } else {
            medal = "🤦🏻‍♂️ You can do better!"
        }

        document.querySelector('.question p').innerHTML = medal + "<br />" + ' Your score is ' + String(noOfScore) + " (" + String(Math.round(noOfScore/selectedQns*100)) + "%)"

        document.querySelector('.titles h2').innerHTML = '❤️  ❤️  ❤️'
    }

}

function evaluateAns() {
    if (noOfQuestions < selectedQns) {
        
        const userAnswer = document.getElementById('user-answer')

        if (answer == userAnswer.value) {
            document.querySelector('.feedback p').innerHTML = '✅'
            noOfScore++
            setTimeout("checkIfContinue()", 400)
        } else {
            document.querySelector('.feedback p').innerHTML = '❌ Answer: ' + answer
            setTimeout("checkIfContinue()", 1200)
        }

        noOfQuestions++ //increment by 1

    }
}

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
      if (this.isRunning) {
        return console.error('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    stop () {
      if (!this.isRunning) {
        return console.error('Timer is already stopped');
      }
  
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

// timer

timeLimit = 0;
timedOut = false;
const timer = new Timer();

noOfScore = 0
noOfQuestions = 0
getRadioValue()

document.querySelector('.question p').innerHTML = ""

// make element hidden
document.getElementById('user-answer').style.visibility = "hidden";
document.getElementById('submitBtn').style.visibility = "hidden";

// applyChange()
// checkIfContinue()

// Get the input field
var userInput = document.getElementById('user-answer');

// Execute a function when the user releases a key on the keyboard
userInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submitBtn").click();
    }
  });
