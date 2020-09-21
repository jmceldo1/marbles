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
var playerMove;

var boardArray;
var pieceMap;


/**
 * Sets up the communication to the screen.
 */
function init() {
    airconsole = new AirConsole({ "orientation": "portrait" });

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
        this.observeCustomProperty(AirConsole.SCREEN, "data", function (new_value, old_value) {
            if (new_value && new_value.state) {
                console.log(new_value.state);
                boardArray = new_value.state.boardArray;
                pieceMap = new Map(new_value.state.pieceMap);
                setBoardBasedOnState(new_value.state);
                var doc = document.getElementById("center-square");
                doc.style.backgroundImage = new_value.state.playedCard;
            }
        });
    };

    airconsole.onMessage = function (device_id, data) {
        this.dispatchEvent(device_id, data);
    };

    airconsole.on(DEAL, function (device_id, params) {
        if (device_id === AirConsole.SCREEN && params.hand !== undefined) {
            setCardSizes("");
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
            setCardSizes("");
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
 * 
 */
function dealOrMakeMove() {
    if (playerMove) {
        console.log("Sending Move to Screen");
        console.log(playerMove);
        airconsole.sendEvent(AirConsole.SCREEN, MOVE, playerMove);

        //resetLogic
        document.getElementById("actionButton").disabled = true;
        playerMove = null;

        moveCard.style.display = "none";
        moveCard = null;
        let element = document.getElementById(movePiece.pieceId)
        element.style.borderColor = pieceBoarderColorArray[0];
        element.style.backgroundColor = pieceBackgroundColorArray[0];
        movePiece = null;
        var div = document.getElementById("player_id");
        div.innerHTML = playerName;
    }

    else {
        airconsole.sendEvent(AirConsole.SCREEN, DEAL, {});
    }
}

// ************************
//  Move Logic
// ************************

function checkAndBuildMove() {
    if (moveCard && movePiece) {
        var card = getCardValueFromElement();
        var cardValueMatcher = card.match(re);
        if (cardValueMatcher) {
            card = cardValueMatcher[1];
            if (SPECIAL_CARDS.includes(card)) {
                console.log("Attempting to handle a Stupid Piece");
            } else if (NORMAL_CARDS.includes(card)) {
                console.log("Attempting to handle a normal piece");
                if (movePiece.location.includes("s-") && card === 'ace') {
                    handleSpawnCard(card);
                }
                handleNormalCard(card);
            } else if (SPAWN_CARDS.includes(card)) {
                console.log("Attempting to handle a spawn piece");
                handleSpawnCard(card);
            } else {
                console.log("!!! Unknown Card value: " + card);
            }
        }
    }
}

function handleNormalCard(card){

}

function handleSpawnCard(card) {
    let id = movePiece.pieceId;
    let potentialPiece = document.getElementById(id);
    let square;
    let squareId;
    if (id.includes("rp-")) {
        squareId = "rh";
    } else if (id.includes("yp-")) {
        squareId = "yh";
    }
    else if (id.includes("gp-")) {
        squareId = "gh";
    }
    else if (id.includes("bp-")) {
        squareId = "bh";
    }
    square = document.getElementById(squareId);

    drawArrowBetweenDivs(potentialPiece, square, null);

    let move = createMove(id, "START", squareId);

    playerMove = createPlayerMove(card, [move]);

}


// ************************
//  Listners
// ************************
function setupPieceListeners(player) {
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
    movePiece = pieceMap.get(event.srcElement.id);

    if (moveCard) {
        checkAndBuildMove();

    }
}

function boardListener(event) {
}

function setCardSizes(selectedId) {
    var cardArray = document.getElementsByClassName("cards");
    Array.prototype.map.call(cardArray, card => {
        if (selectedId) {
            if (card.id === selectedId) {
                card.style.width = "20%";
            } else {
                card.style.width = "15%";
            }
        } else {
            //If no selectedId then reset all cards
            card.style.width = "16%";
        }
    });
}

function cardListener(event) {
    if (myTurn) {
        if (playerMove) {
            playerMove = null;
            //Potentially want to reset selected piece as well
        }
        let id = event.srcElement.id;
        let element = document.getElementById(id);
        moveCard = element;
        setCardSizes(id);
    }
}


function getCardValueFromElement(element) {
    if (!element) {
        element = moveCard;
    }
    var backGroundImageUrl = element.style.backgroundImage;
    if (backGroundImageUrl !== undefined) {
        return backGroundImageUrl;
    }
}