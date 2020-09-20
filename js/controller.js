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
var move;

var pieceMap;


/**
 * Sets up the communication to the screen.
 */
function init() {
    airconsole = new AirConsole({ "orientation": "portrait" });
    pieceMap = setBoardBasedOnState();
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
                console.log("Recieved new state value below");
                console.log(new_value);
                // console.log("Stringified below");
                // console.log(JSON.stringify(new_value));
                setBoardBasedOnState(new_value);
                var doc = document.getElementById("center-square");
                doc.style.backgroundImage = new_value.playedCard;
            }
        });

        //Will Call from here later JAM UNCOMMENT
        // setBoardBasedOnState();
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
 * Tells the screen to deal the paddle of this player.
 * @param amount
 */
function dealOrMakeMove() {
    if (move) {
        var test = move[0];
        movePieceToSquare(test.pieceId, test.location);


        move = null;
    }





    // checkAndBuildMove();
    if (moveCard && movePiece) {
        document.getElementById("actionButton").disabled = true;
        var cardValue = getCardValueFromElement(moveCard);
        var move = createMove("yp-0", "", "yh");
        var playerMove = createPlayerMove(cardValue, [move]);

        // airconsole.sendEvent(AirConsole.SCREEN, MOVE, { cValue: cardValue });
        airconsole.sendEvent(AirConsole.SCREEN, MOVE, playerMove);
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
                    handleSpawnCard();
                }

            } else if (SPAWN_CARDS.includes(card)) {
                console.log("Attempting to handle a spawn piece");
                handleSpawnCard();

            } else {
                console.log("!!! Unknown Card value: " + card);
            }



        }



    }
}

function handleSpawnCard() {
    let id = movePiece.pieceId;
    let rp1 = document.getElementById(id);
    let square;
    if (id.includes("rp-")) {
        square = document.getElementById("rh");
    } else if (id.includes("yp-")) {
        square = document.getElementById("yh");
    }
    else if (id.includes("gp-")) {
        square = document.getElementById("gh");
    }
    else if (id.includes("bp-")) {
        square = document.getElementById("bh");
    }

    drawArrowBetweenDivs(rp1, square, null);
    movePiece.location = square.id;

    move = [movePiece];

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
    let id = movePiece.pieceId;
    // movePieceToSquare(id, event.srcElement.id);


    // if (movePiece) {
    //     let rp1 = document.getElementById(id);
    //     let square = document.getElementById(event.srcElement.id);
    //     drawArrowBetweenDivs(rp1, square, null);
    // }
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
        let id = event.srcElement.id;
        let element = document.getElementById(id);
        moveCard = element;
        // var cardValue = getCardValueFromElement(element);
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
        // var cardValueMatcher = backGroundImageUrl.match(re);
        // if (cardValueMatcher !== undefined && cardValueMatcher !== null) {
        //   element.style.backgroundImage = "none";
        //   return cardValueMatcher[1];
        // }
    }
}