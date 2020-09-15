var airconsole;
var re = /images\/PNG-cards-1.3\/(.*)_of_/;
var myTurn = false;
var selectedPiece;
var playerName
var pieceBoarderColorArray;
var pieceBackgroundColorArray;

var moveCard;
var movePiece;
var moveSquare;


/**
 * Sets up the communication to the screen.
 */
function init() {
    airconsole = new AirConsole({ "orientation": "portrait" });
    // setBoardBasedOnState();
    // var tp = document.getElementById("rp-0").addEventListener("click", pieceListener);
    // setupPieceListeners(3);

    /*
    * Checks if this device is part of the active game.
    */
    airconsole.onActivePlayersChange = function (player) {
        var div = document.getElementById("player_id");
        if (player !== undefined) {
            playerName = (["Player One", "Player Two", "Player Three", "Player Four"][player]);
            div.innerHTML = playerName;
            div.style.color = (["red", "yellow", "green", "blue"][player]);
            setupPieceListeners(player);
        } else {
            div.innerHTML = "It's a 2 player game!!";
        }
    };

    airconsole.onDeviceStateChange = function (device_id, data) {
        //Not sure if this check should be required or not
        if (data) {
            this.evaluateCustomData(device_id, data);
        }
    };

    airconsole.onReady = function () {
        // Observe the 'position' property of the screen
        this.observeCustomProperty(AirConsole.SCREEN, "data", function (new_value, old_value) {
            if (new_value) {
                var doc = document.getElementById("center-square");
                doc.style.backgroundImage = new_value.playedCard;
            }
        });

        //Will Call from here later JAM UNCOMMENT
        setBoardBasedOnState();
    };

    airconsole.onMessage = function (device_id, data) {
        this.dispatchEvent(device_id, data);
    };

    airconsole.on(DEAL, function (device_id, params) {
        if (device_id === AirConsole.SCREEN && params.hand !== undefined) {
            for (i = 0; i < params.hand.length; i++) {
                let element = document.getElementById("p1c" + i);
                element.style.backgroundImage = "url(images/PNG-cards-1.3/" + params.hand[i] + ".png)";
                element.style.display = "inline-block";
            }
            if (params.hand.length === 4) {
                document.getElementById("p1c4").style.display = "none";
            }
        }
    });

    airconsole.on(CLEAR, function (device_id, params) {
        if (device_id === AirConsole.SCREEN) {
            var cardElements = document.getElementsByClassName("cards");
            var i; j = cardElements.length;
            for (var i = 0; i < j; i++) {
                cardElements[i].style.backgroundImage = "url(images/PNG-cards-1.3/haas.jpg)";
            }
        }
    });

    airconsole.on(YOUR_TURN, function (device_id, params) {
        myTurn = true;
        var div = document.getElementById("player_id");
        div.innerHTML = "Its Your Turn!";
        
    document.getElementById("actionButton").disabled = false;
    });
}





/**
 * Tells the screen to deal the paddle of this player.
 * @param amount
 */
function dealOrMakeMove() {
    if (moveCard && movePiece) {
        document.getElementById("actionButton").disabled = true;
        var cardValue = getCardValueFromElement(moveCard);
        airconsole.sendEvent(AirConsole.SCREEN, MOVE, { cValue: cardValue });
        moveCard.style.display = "none";
        moveCard = null;
        let element = document.getElementById(movePiece.pieceId)
        element.style.borderColor = pieceBoarderColorArray[0];
        element.style.backgroundColor = pieceBackgroundColorArray[0];
        movePiece = null;

    }
    else {
        airconsole.sendEvent(AirConsole.SCREEN, DEAL, {});
    }
}

// ************************
//  Move Logic
// ************************

function checkAndBuildMove() {
    if (moveCard && movePiece  && moveSquare) {
        return true;
        // var actionButton = element.getElementById("actionButton");
        // actionButton.disabled = true;
    }
}


function makeMove(cardValue, element) {
    if (cardValue !== undefined) {
        switch (cardValue) {
            case "2":
                //Move piece forward 2 spaces
                break;
            case "3":
                //Move piece forward 3 spaces
                break;
            case "4":
                //Move piece backwards 4 spaces
                break;
            case "5":
                //Move piece forward 5 spaces
                break;
            case "6":
                //Move piece forward 6 spaces
                break;
            case "7":
                //Move 2 pieces a total of 7 sapces
                break;
            case "8":
                //Move piece forward 8 spaces
                break;
            case "9":
                //Move piece forward 9 spaces
                break;
            case "10":
                //Move piece forward 10 spaces
                break;
            case "jack":
                //Swap the position of any two pieces
                break;
            case "queen":
                //Move piece forward 12 spaces
                break;
            case "king":
                // Move a piece out of Start
                break;
            case "ace":
                //Move a piece out of Start or 1 space
                break;
            default:

        }

        var div = document.getElementById("player_id");
        div.innerHTML = playerName;

        // myTurn = false;
        airconsole.sendEvent(AirConsole.SCREEN, MOVE, { cValue: cardValue });
        // var cs = document.getElementById("centerSquare");
        // cs.style.backgroundImage = element.style.backgroundImage;
        // element.style.backgroundImage = "none";
        element.style.display = "none";
        // Select marble and make move
        return true;
    }
    return false;
}

// ************************
//  Listners
// ************************
function setupPieceListeners(player) {
    console.log("Setting up listeners for player: " + player);
    switch (player) {
        case 0:
            var elements = document.getElementsByClassName("red-pieces");
            pieceBoarderColorArray = ["white", "black"];
            pieceBackgroundColorArray = ["red", "darkred"];
            Array.prototype.map.call(elements, element => {
                element.addEventListener("click", pieceListener);
            });
            break;
        case 1:
            var elements = document.getElementsByClassName("yellow-pieces");
            pieceBoarderColorArray = ["black", "white"];
            pieceBackgroundColorArray = ["yellow", "orange"];
            Array.prototype.map.call(elements, element => {
                element.addEventListener("click", pieceListener);
            });
            break;
        case 2:
            var elements = document.getElementsByClassName("green-pieces");
            pieceBoarderColorArray = ["white", "black"];
            pieceBackgroundColorArray = ["green", "darkgreen"];
            Array.prototype.map.call(elements, element => {
                element.addEventListener("click", pieceListener);
            });
            break;
        case 3:
            var elements = document.getElementsByClassName("blue-pieces");
            pieceBoarderColorArray = ["white", "black"];
            pieceBackgroundColorArray = ["blue", "darkblue"];
            Array.prototype.map.call(elements, element => {
                element.addEventListener("click", pieceListener);
            });
            break;
        default:
            console.log("Invalid Player Number: " + player);
            break;
    }

}

function pieceListener(event) {
    if (movePiece) {
        var oldPiece = document.getElementById(movePiece.pieceId); 
        oldPiece.style.backgroundColor = pieceBackgroundColorArray[0];
        oldPiece.style.borderColor = pieceBoarderColorArray[0];
    }

    var piece = document.getElementById(event.srcElement.id);
    piece.style.backgroundColor = pieceBackgroundColorArray[1];
    piece.style.borderColor = pieceBoarderColorArray[1];
    movePiece = createPiece(event.srcElement.id, null);
}

function boardListener(event) {
    let id = movePiece.pieceId;
    movePieceToSquare(id, event.srcElement.id);
}

function setCardSizes(selectedId) {
    var cardArray = document.getElementsByClassName("cards");
    Array.prototype.map.call(cardArray, card => {
        if (card.id === selectedId ) {
            card.style.width = "20%";
        } else {
            card.style.width = "15%";
        }
    });
}

function cardListener(event) {
    if (myTurn) {
        let id = event.srcElement.id;
        let element = document.getElementById(id);
        moveCard = element;
        // var cardValue = getCardValueFromElement(element);
        setCardSizes(id);
        // makeMove(cardValue, element);
    }
}


function getCardValueFromElement(element) {
    var backGroundImageUrl = element.style.backgroundImage;
    if (backGroundImageUrl !== undefined) {
        return backGroundImageUrl;
        // var cardValueMatcher = backGroundImageUrl.match(re);
        // if (cardValueMatcher !== undefined && cardValueMatcher !== null) {
        //   element.style.backgroundImage = "none";
        //   return cardValueMatcher[1];
        // }
    }
}