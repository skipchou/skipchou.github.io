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

    // re-generate question
    checkIfContinue()
}

function generateQ() {


    // move focus to answer box
    document.getElementById('user-answer').focus();
    document.getElementById('user-answer').select();
    
    console.log(selectedLevel)

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
            rn1 = Math.floor(Math.random() * 50) + 1
            rn2 = Math.floor(Math.random() * 50) + 1
        } else {
            rn1 = Math.floor(Math.random() * 9) + 1
            rn2 = Math.floor(Math.random() * 9) + 1     
        }
    } else {
        if (['Addition', 'Subtraction'].includes(selectedMode)) {
            rn1 = Math.floor(Math.random() * 100) + 1
            rn2 = Math.floor(Math.random() * 100) + 1
        } else {
            rn1 = Math.floor(Math.random() * 12) + 1
            rn2 = Math.floor(Math.random() * 12) + 1      
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

    if (noOfQuestions < selectedQns) {
        generateQ()

        // show question number
        document.querySelector('.titles h2').innerHTML = 'Question ' + String(noOfQuestions + 1)
    } else {

        // disable answer box and button
        document.getElementById('user-answer').style.visibility = "hidden";
        document.getElementById('submitBtn').style.visibility = "hidden";

        if (noOfScore == noOfQuestions) {
            medal = "🥇"
        } else if (noOfScore / noOfQuestions >= 0.9) {
            medal = "🥈"
        } else if (noOfScore / noOfQuestions >= 0.85) {
            medal = "🥉"
        } else {
            medal = "😭"
        }

        document.querySelector('.question p').innerHTML = medal + ' Your score is ' + String(noOfScore) + " (" + String(Math.round(noOfScore/selectedQns*100)) + "%)"

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

noOfScore = 0
noOfQuestions = 0
getRadioValue()

// make element visible
document.getElementById('user-answer').style.visibility = "visible";
document.getElementById('submitBtn').style.visibility = "visible";

// move focus to answer box
document.getElementById('user-answer').focus();
document.getElementById('user-answer').select();

applyChange()
checkIfContinue()

// Get the input field
var userInput = document.getElementById('user-answer');

// Execute a function when the user releases a key on the keyboard
userInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submitBtn").click();
    }
  });
