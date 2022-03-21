function addDeck() {
    const storedDeck = JSON.parse(localStorage.getItem("deck1")) || [];
    const newDeck = {
        front: document.getElementById("deckOneInput").value,
        back: ""
    }
    console.log(newDeck);
    storedDeck.push(newDeck)
    localStorage.setItem("deck1", JSON.stringify(storedDeck));
    // const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    document.getElementById("deckOneInput").value = "";

    displayDecks();
}

function displayDecks() {
    const allDecks = JSON.parse(localStorage.getItem("deck1")) || [];
    

    deckList = allDecks.map(decks => {
        return `<li class="high-score">${decks.front}</li>`;
    }).join("")

    document.querySelector(".showAllDecksArea ol").innerHTML = deckList;

    createButtonElement();

}

function deleteDecks() {
    localStorage.clear();
    displayDecks();
}

function deleteOneDeck(vv) {
    var allDecks = JSON.parse(localStorage.getItem("deck1")) || [];
    allDecks.splice(vv,1);
    console.log(vv);
    console.log(allDecks[1]);
    localStorage.setItem("deck1", JSON.stringify(allDecks));
    displayDecks();
}

function playOneDeck(vv) {
    localStorage.setItem("deckNo", vv);
    window.location.href = 'play.html';
}

function createButtonElement() {
    var a = document.querySelectorAll("li");


    for (var v = 0; v < a.length; v++) {
        var btn1 = document.createElement("button");

        btn1.id = "deleteDeck" + v;
        btn1.className = 'deleteDeckInList';

        a[v].appendChild(document.createElement("br"));
        btn1.appendChild(document.createTextNode("delete"));
        a[v].appendChild(btn1);

        var btn2 = document.createElement("button");

        btn2.id = "playDeck" + v;
        btn2.className = 'playDeckInList';

        btn2.appendChild(document.createTextNode("PLAY"));
        a[v].appendChild(btn2);

        document.getElementById("deleteDeck" + v).setAttribute( "onclick", "javascript: deleteOneDeck("+ v +");" );
    
        document.getElementById("playDeck" + v).setAttribute( "onclick", "javascript: playOneDeck("+ v +");" );
    
    }

  }

displayDecks();

// timeInterval = setInterval(() => {
//     displayDecks()
// }, 100);


