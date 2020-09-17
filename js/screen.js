var airconsole;
var canvas;
var cards = [];
var numberOfPlayers = 2;
var p1 = [];
var p2 = [];
var p3 = [];
var p4 = [];

var state;

var boardArray = [{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null, home: [{ id: "ye-0", piece: null }, { id: "ye-1", piece: null }, { id: "ye-2", piece: null }, { id: "ye-3", piece: null }] }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null, home: [{ id: "ge-0", piece: null }, { id: "ge-1", piece: null }, { id: "ge-2", piece: null }, { id: "ge-3", piece: null }] }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null, home: [{ id: "be-0", piece: null }, { id: "be-1", piece: null }, { id: "be-2", piece: null }, { id: "be-3", piece: null }] }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null },
{ piece: null }, { piece: null }, { piece: null }, { piece: null }, { piece: null, home: [{ id: "re-0", piece: null }, { id: "re-1", piece: null }, { id: "re-2", piece: null }, { id: "re-3", piece: null }] }, { piece: null }]


// var redPiece0 = createPiece("rp-0", "rs-0");
// var redPiece1 = createPiece("rp-1", "rs-1");
// var redPiece2 = createPiece("rp-2", "rs-2");
// var redPiece3 = createPiece("rp-3", "rs-3");

// var yellowPiece0 = createPiece("yp-0", "ys-0");
// var yellowPiece1 = createPiece("yp-1", "ys-1");
// var yellowPiece2 = createPiece("yp-2", "ys-2");
// var yellowPiece3 = createPiece("yp-3", "ys-3");

// var greenPiece0 = createPiece("gp-0", "gs-0");
// var greenPiece1 = createPiece("gp-1", "gs-1");
// var greenPiece2 = createPiece("gp-2", "gs-2");
// var greenPiece3 = createPiece("gp-3", "gs-3");

// var bluePiece0 = createPiece("bp-0", "bs-0");
// var bluePiece1 = createPiece("bp-1", "bs-1");
// var bluePiece2 = createPiece("bp-2", "bs-2");
// var bluePiece3 = createPiece("bp-3", "bs-3");

/**
 * Sets up the communication to game pads.
 */
function setupConsole() {
    airconsole = new AirConsole();

    var setCustomState = function (value) {
        console.log("Current State");
        console.log(state);
        console.log(value);
        airconsole.setCustomDeviceStateProperty("data", value.state);
    };

    airconsole.onReady = function () {
        state = buildInitialState();
        setBoardBasedOnState(state);
        // Set an inital value for the state property
        setCustomState({
            state: state
        });
    };

    airconsole.onConnect = function (device_id) {
        //Will eventually need 4. Will do two for now for testing purposes
        checkTwoPlayers();
    };

    airconsole.onDisconnect = function (device_id) {
        var player = airconsole.convertDeviceIdToPlayerNumber(device_id);
        if (player != undefined) {
            // Player that was in game left the game.
            // Setting active players to length 0.
            airconsole.setActivePlayers(0);
        }
        checkTwoPlayers();
    };

    airconsole.onMessage = function (device_id, data) {
        this.dispatchEvent(device_id, data);
    };

    airconsole.on(DEAL, function (device_id, params) {
        var player = airconsole.convertDeviceIdToPlayerNumber(device_id);
        if (player != undefined) {
            dealPlease();
        }
    });

    airconsole.on(MOVE, function (device_id, params) {
        var player = airconsole.convertDeviceIdToPlayerNumber(device_id);
        if (player != undefined) {
            updateStateBasedOnMove(params);
            // state.playedCard = params.cValue;
            setCustomState({
                state: state
            });
            var doc = document.getElementById("center-square");
            // doc.style.backgroundImage = params.cValue;
            doc.style.backgroundImage = state.playedCard;

            yourTurn(player);
        }
    });

}

function updateStateBasedOnMove(move) {
    state.playedCard = move.cardUrl;
    console.log(move);
    if (move.moves) {
        Array.prototype.map.call(move.moves, element => {
            let piece = state.pieceMap.get(element.pieceId);
            console.log("Updating piece: ");
            console.log(piece);
            if (piece && element.newLocation) {
                piece.location = element.newLocation;
                console.log(piece);
            }

            //Potentially erase and redraw arrows?

            //Updated Board Array
        });
    }

    setBoardBasedOnState(state);
}

/**
 * Checks if two players are connected!
 */
function checkTwoPlayers() {
    var active_players = airconsole.getActivePlayerDeviceIds();
    var connected_controllers = airconsole.getControllerDeviceIds();
    // Only update if the game didn't have active players.
    if (active_players.length == 0) {
        if (connected_controllers.length >= numberOfPlayers) {
            // Enough controller devices connected to start the game.
            // Setting the first 2 controllers to active players.
            airconsole.setActivePlayers(numberOfPlayers);
            document.getElementById("wait").innerHTML = "";
            yourTurn(0);
        } else if (connected_controllers.length == 1) {
            document.getElementById("wait").innerHTML = "Need 1 more player!";
        } else if (connected_controllers.length == 0) {
            document.getElementById("wait").innerHTML = "Need 2 more players!";
        }
    }
}

/**
 * body.onload function.
 */
function init() {
    setupConsole();
    shuffle();

    // Setting up the game. Nothing AirConsole specific.

    canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    window.onresize = (clearCanvas);

    // setBoardBasedOnState();
}

function clearCanvas() {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function initDeck() {
    var index;
    var max = 52;
    var suit = 'hearts';
    var cardNum = 1;
    for (index = 0; index < max; index++) {
        if (index === 13) {
            suit = 'clubs'
            cardNum = 1;
        } else if (index === 26) {
            suit = 'diamonds';
            cardNum = 1;
        } else if (index === 39) {
            suit = "spades";
            cardNum = 1;
        }
        var realCardFace = cardNum;
        if (cardNum === 11) {
            realCardFace = "jack";
        } else if (cardNum === 12) {
            realCardFace = "queen";
        } else if (cardNum === 13) {
            realCardFace = "king";
        } else if (cardNum === 1) {
            realCardFace = "ace"
        }
        var cardFace = realCardFace + "_of_" + suit;
        var cardObj = { ind: index + 1, face: cardFace };
        cards[index] = cardObj;
        cardNum++;
    }
}

function shuffle() {
    initDeck()
    var currentIndex = cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}

function dealCards(numOfCards) {
    var fileType = ".png";
    var pNo = 0;
    var cardNo = 0;
    for (i = 0; i < numOfCards; i++) {
        switch (pNo) {
            case 0:
                var cardVal = cards.pop().face;
                p1[cardNo] = cardVal;
                pNo++;
                break;
            case 1:
                var cardVal = cards.pop().face;
                p2[cardNo] = cardVal;
                pNo++;
                break;
            case 2:
                var cardVal = cards.pop().face;
                p3[cardNo] = cardVal;
                pNo++;
                break;
            default:
                var cardVal = cards.pop().face;
                p4[cardNo] = cardVal;
                pNo = 0;
                cardNo++;
        }
    }
    //Deal to connected_controllers
    var player1DeviceId = airconsole.convertPlayerNumberToDeviceId(0);

    var player1Data = { messageType: DEAL, hand: p1 };
    airconsole.sendEvent(player1DeviceId, DEAL, player1Data);
    airconsole.sendEvent(airconsole.convertPlayerNumberToDeviceId(1), DEAL, { hand: p2 });
    p1 = [];
    p2 = [];
    p3 = [];
    p4 = [];
}

function dealPlease() {
    if (cards.length === 0) {
        clearHands();
        shuffle(cards);
    }
    else if (cards.length === 52) {
        dealCards(20);
    }
    else {
        dealCards(16);
    }
}

function clearHands() {
    p1 = [];
    p2 = [];
    p3 = [];
    p4 = [];
    airconsole.broadcastEvent(CLEAR, {});
}

function yourTurn(recentlyPlayedPlayerNumber) {
    var nextPlayer = (recentlyPlayedPlayerNumber + 1) % numberOfPlayers;
    airconsole.sendEvent(airconsole.convertPlayerNumberToDeviceId(nextPlayer), YOUR_TURN, {});
}

function buildInitialState() {
    console.log("Building Initial State for Screen");

    // let redPiece0 = createPiece("rp-0", "rs-0");
    // let redPiece1 = createPiece("rp-1", "rs-1");
    // let redPiece2 = createPiece("rp-2", "rs-2");
    // let redPiece3 = createPiece("rp-3", "rs-3");

    // let yellowPiece0 = createPiece("yp-0", "ys-0");
    // let yellowPiece1 = createPiece("yp-1", "ys-1");
    // let yellowPiece2 = createPiece("yp-2", "ys-2");
    // let yellowPiece3 = createPiece("yp-3", "ys-3");

    // let greenPiece0 = createPiece("gp-0", "gs-0");
    // let greenPiece1 = createPiece("gp-1", "gs-1");
    // let greenPiece2 = createPiece("gp-2", "gs-2");
    // let greenPiece3 = createPiece("gp-3", "gs-3");

    // let bluePiece0 = createPiece("bp-0", "bs-0");
    // let bluePiece1 = createPiece("bp-1", "bs-1");
    // let bluePiece2 = createPiece("bp-2", "bs-2");
    // let bluePiece3 = createPiece("bp-3", "bs-3");

    var pieceMap = new Map();
    pieceMap.set("rp-0", createPiece("rp-0", "rs-0"));
    pieceMap.set("rp-1", createPiece("rp-1", "rs-1"));
    pieceMap.set("rp-2", createPiece("rp-2", "rs-2"));
    pieceMap.set("rp-3", createPiece("rp-3", "rs-3"));

    pieceMap.set("yp-0", createPiece("yp-0", "ys-0"));
    pieceMap.set("yp-1", createPiece("yp-1", "ys-1"));
    pieceMap.set("yp-2", createPiece("yp-2", "ys-2"));
    pieceMap.set("yp-3", createPiece("yp-3", "ys-3"));

    pieceMap.set("gp-0", createPiece("gp-0", "gs-0"));
    pieceMap.set("gp-1", createPiece("gp-1", "gs-1"));
    pieceMap.set("gp-2", createPiece("gp-2", "gs-2"));
    pieceMap.set("gp-3", createPiece("gp-3", "gs-3"));

    pieceMap.set("bp-0", createPiece("bp-0", "bs-0"));
    pieceMap.set("bp-1", createPiece("bp-1", "bs-1"));
    pieceMap.set("bp-2", createPiece("bp-2", "bs-2"));
    pieceMap.set("bp-3", createPiece("bp-3", "bs-3"));

    return {
        // rp0: redPiece0,
        // rp1: redPiece1,
        // rp2: redPiece2,
        // rp3: redPiece3,

        // yp0: yellowPiece0,
        // yp1: yellowPiece1,
        // yp2: yellowPiece2,
        // yp3: yellowPiece3,

        // gp0: greenPiece0,
        // gp1: greenPiece1,
        // gp2: greenPiece2,
        // gp3: greenPiece3,

        // bp0: bluePiece0,
        // bp1: bluePiece1,
        // bp2: bluePiece2,
        // bp3: bluePiece3,

        pieceMap: pieceMap,
        boardArray: boardArray,
        playedCard: "url(images/PNG-cards-1.3/haas.jpg)"
    }

}