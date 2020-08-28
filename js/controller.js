var airconsole;
var re = /images\/PNG-cards-1.3\/(.*)_of_/;
var myTurn = false;
/**
 * Sets up the communication to the screen.
 */
function init() {
    console.log("Controller init function");
    airconsole = new AirConsole({ "orientation": "portrait" });

    /*
    * Checks if this device is part of the active game.
    */
    airconsole.onActivePlayersChange = function (player) {
        var div = document.getElementById("player_id");
        if (player !== undefined) {
            div.innerHTML = (["Player One", "Player Two", "Player Three", "Player Four"][player]);
            div.style.color = (["#3531ff", "#fe0000", "#fcff2f", "#009901"][player]);
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
    };

    airconsole.onMessage = function (device_id, data) {
        this.dispatchEvent(device_id, data);
    };

    airconsole.on(DEAL, function (device_id, params) {
        if (device_id === AirConsole.SCREEN && params.hand !== undefined) {
            for (i = 0; i < params.hand.length; i++) {
                document.getElementById("p1c" + i).style.backgroundImage = "url(images/PNG-cards-1.3/" + params.hand[i] + ".png)";
            }
            if (params.hand.length === 4) {
                document.getElementById("p1c4").style.backgroundImage = "none";
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
        var newHtml = div.innerHTML + " Its Your Turn!";
        div.innerHTML = newHtml;
    });
}



/**
 * Tells the screen to deal the paddle of this player.
 * @param amount
 */
function deal() {
    airconsole.sendEvent(AirConsole.SCREEN, DEAL, {});
}

// ************************
//  Move Logic
// ************************
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
        var str = div.innerHTML;
        var newHtml = str.substring(0, str.indexOf(" Its Your Turn!"));
        div.innerHTML = newHtml;

        myTurn = false;
        airconsole.sendEvent(AirConsole.SCREEN, MOVE, { cValue: cardValue });
        // var cs = document.getElementById("centerSquare");
        // cs.style.backgroundImage = element.style.backgroundImage;
        element.style.backgroundImage = "none";
        // Select marble and make move
        return true;
    }
    return false;
}

// ************************
//  Card Listners
// ************************

function card0Listener() {
    if (myTurn) {
        let element = document.getElementById("p1c0");
        var cardValue = getCardValueFromElement(element);
        makeMove(cardValue, element);
    }
}

function card1Listener() {
    if (myTurn) {
        let element = document.getElementById("p1c1");
        var cardValue = getCardValueFromElement(element);
        makeMove(cardValue, element);
    }
}

function card2Listener() {
    if (myTurn) {
        let element = document.getElementById("p1c2");
        var cardValue = getCardValueFromElement(element);
        makeMove(cardValue, element);
    }
}

function card3Listener() {
    if (myTurn) {
        let element = document.getElementById("p1c3");
        var cardValue = getCardValueFromElement(element);
        makeMove(cardValue, element);
    }
}

function card4Listener() {
    if (myTurn) {
        let element = document.getElementById("p1c4");
        var cardValue = getCardValueFromElement(element);
        makeMove(cardValue, element);
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