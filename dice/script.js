document.querySelector('h1').innerHTML = "🎲"
document.querySelector('h2').innerHTML = "Let's begin!"

var firstRandomNumber = 0
var secondRandomNumber = 0

const allEmojis = ["🏆","🎉","🏅","🤹","💎","🦖","🥇","🥳","🐓","🥥","🥑","🥝","🍉","🥨","🍕","🧋","🏀","🏰"]

const player1Name = document.getElementById('diceuser1')
const player2Name = document.getElementById('diceuser2')

function rollFunc(){
    // Dice 1
    // Generate a random number from 1 to 6

    firstRandomNumber = Math.floor(Math.random() * 6) + 1

    // images/dice1.png to images/dice6.png
    const firstDiceImage = 'assets/dice' + firstRandomNumber + '.png';

    document.querySelectorAll('img')[0].setAttribute('src', firstDiceImage);
    setTimeout(3000);

    // Dice 2
    // Generate a random number from 1 to 6
    secondRandomNumber = Math.floor(Math.random() * 6) + 1

    // images/dice1.png to images/dice6.png
    const secondDiceImage = 'assets/dice' + secondRandomNumber + '.png';

    document.querySelectorAll('img')[1].setAttribute('src', secondDiceImage);

    prizeRandomNumber = Math.floor(Math.random() * allEmojis.length)

    //Display winner
    if (firstRandomNumber > secondRandomNumber) {
        document.querySelector('h1').innerHTML = allEmojis[prizeRandomNumber]
        document.querySelector('h2').innerHTML = player1NameValue + ' wins!!!'
    } else if (firstRandomNumber < secondRandomNumber) {
        document.querySelector('h1').innerHTML = allEmojis[prizeRandomNumber]
        document.querySelector('h2').innerHTML = player2NameValue + ' wins!!!'
    } else {
        document.querySelector('h1').innerHTML = allEmojis[prizeRandomNumber]
        document.querySelector('h2').innerHTML = "Nobody wins!!!"
    }

}

function diceAnimation() {
    document.querySelectorAll('img')[0].setAttribute('src', 'assets/dice0.gif');
    document.querySelectorAll('img')[1].setAttribute('src', 'assets/dice0.gif');
}

function rollFuncRpt() {

    document.querySelector('h1').innerHTML = "🎲"
    document.querySelector('h2').innerHTML = "Hold tight..."

    if (player1Name.value == "") {
        player1NameValue = "Player 1"
    } else {
        player1NameValue = player1Name.value
    }

    if (player2Name.value == "") {
        player2NameValue = "Player 2"
    } else {
        player2NameValue = player2Name.value
    }

    showplayer1.innerHTML = player1NameValue
    
    showplayer2.innerHTML = player2NameValue

    diceAnimation()

    setTimeout("rollFunc()", 2000)


}