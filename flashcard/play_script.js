
function createCardsFromDeck() {

    const allDecks = JSON.parse(localStorage.getItem("deck1")) || [];
    const deckNumber = localStorage.getItem("deckNo");

    // console.log(allDecks.length)

    const currentDeck = allDecks[deckNumber];
    const cardsFront = currentDeck["front"];
    const cardsBack = currentDeck["back"];

    // console.log(cardsFront);
    // console.log(cardsBack);

    cardsFrontArray = cardsFront.split(/,|，/);

    // console.log(cardsFrontArray);

    
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function randomCardsSequencer() {

    createCardsFromDeck();
    console.log(cardsFrontArray);

    // shuffle cards
    shuffle(cardsFrontArray);
    console.log(cardsFrontArray);
}

function buttonRespondor() {

    console.log(v);

    if (v == cardsFrontArray.length) {
        randomCardsSequencer();
        v = 0;
        document.querySelector(".cardsArea p").textContent = "Ready?...";
        document.getElementById("nextBtn").disabled = true
        window.setTimeout(function() {
            document.querySelector(".cardsArea p").textContent = cardsFrontArray[v];
            document.getElementById("nextBtn").disabled = false
        }, 800);
    } else {
        document.querySelector(".cardsArea p").textContent = cardsFrontArray[v];
    }

    if (v == cardsFrontArray.length - 1) {
        document.getElementById("nextBtn").textContent = "Shuffle";
        document.getElementById("nextBtn").style.background = "#ffffff";
    } else {
        document.getElementById("nextBtn").textContent = "Next Card";
        document.getElementById("nextBtn").style.background = "rgb(178, 248, 178)";
    }

    if (v == 0) {
        document.getElementById("prevBtn").disabled = true
    } else {
        document.getElementById("prevBtn").disabled = false
    }

    console.log(v);

    

}

function next() {
    v = v + 1;
    buttonRespondor();
}

function prev() {
    v = v - 1;
    buttonRespondor();
}


var cardsFrontArray = [];
var lastInd1 = 9999;
randomCardsSequencer();
var v = 0;
buttonRespondor();


