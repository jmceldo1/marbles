function createPiece(id, location) {
    return { pieceId: id, location: location };
}

function createPlayerMove(card, moves) {
    return { cardUrl: card, moves: moves };
}

function createMove(pieceId, previousLocation, newLocation) {
    return { pieceId: pieceId, previousLocation: previousLocation, newLocation: newLocation };
}

function setBoardBasedOnState(state) {
    if(state) {
        console.log("Setting board based on state");
        state.pieceMap.forEach(piece => {
            movePieceToSquare(piece.pieceId, piece.location);
        });

    } else {

    



    movePieceToSquare("rp-0", "rs-0");
    movePieceToSquare("rp-1", "rs-1");
    movePieceToSquare("rp-2", "rs-2");
    movePieceToSquare("rp-3", "rs-3");

    movePieceToSquare("yp-0", "ys-0");
    movePieceToSquare("yp-1", "ys-1");
    movePieceToSquare("yp-2", "ys-2");
    movePieceToSquare("yp-3", "ys-3");

    movePieceToSquare("gp-0", "gs-0");
    movePieceToSquare("gp-1", "gs-1");
    movePieceToSquare("gp-2", "gs-2");
    movePieceToSquare("gp-3", "gs-3");

    movePieceToSquare("bp-0", "bs-0");
    movePieceToSquare("bp-1", "bs-1");
    movePieceToSquare("bp-2", "bs-2");
    movePieceToSquare("bp-3", "bs-3");

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
    console.log(pieceMap);

    return pieceMap;
    }

}

function movePieceToSquare(pieceId, elementId) {
    var piece = document.getElementById(pieceId);
    var element = document.getElementById(elementId);
    var elementOffsets = getOffset(element, false);
    piece.style.left = elementOffsets.left;
    piece.style.top = elementOffsets.top;
}

function getOffset(el, center) {
    if (el) {
        var _x;
        var _y;
        if (center) {
            _x = el.offsetWidth/2;
            _y = el.offsetHeight/2;
        } else {
            _x = 0;
            _y = 0;
        }
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }

        return { top: _y, left: _x };
    }
}

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

function drawArrowBetweenDivs(startDiv, endDiv, arrowDivId) {
    let startDivCoords = getOffset(startDiv, true);
    let endDivCords = getOffset(endDiv, true);
    let arrow = document.getElementsByTagName("line")[0];
    arrow.x1.baseVal.value = startDivCoords.left;
    arrow.y1.baseVal.value = startDivCoords.top;
    arrow.x2.baseVal.value = endDivCords.left;
    arrow.y2.baseVal.value = endDivCords.top;
    
}


function getPossibleSquare(piece, cardValue) {
    piece.currentLocation;

    //Get Current location of piece

    //Calculate where cardValue puts piece

    //Update style of that square

}





//Potential trash

// function makeMove(cardValue, element) {
//     if (cardValue !== undefined) {
//         switch (cardValue) {
//             case "2":
//                 //Move piece forward 2 spaces
//                 break;
//             case "3":
//                 //Move piece forward 3 spaces
//                 break;
//             case "4":
//                 //Move piece backwards 4 spaces
//                 break;
//             case "5":
//                 //Move piece forward 5 spaces
//                 break;
//             case "6":
//                 //Move piece forward 6 spaces
//                 break;
//             case "7":
//                 //Move 2 pieces a total of 7 sapces
//                 break;
//             case "8":
//                 //Move piece forward 8 spaces
//                 break;
//             case "9":
//                 //Move piece forward 9 spaces
//                 break;
//             case "10":
//                 //Move piece forward 10 spaces
//                 break;
//             case "jack":
//                 //Swap the position of any two pieces
//                 break;
//             case "queen":
//                 //Move piece forward 12 spaces
//                 break;
//             case "king":
//                 // Move a piece out of Start
//                 break;
//             case "ace":
//                 //Move a piece out of Start or 1 space
//                 break;
//             default:

//         }

//         var div = document.getElementById("player_id");
//         div.innerHTML = playerName;

//         airconsole.sendEvent(AirConsole.SCREEN, MOVE, { cValue: cardValue });
//         element.style.display = "none";
//         return true;
//     }
//     return false;
// }