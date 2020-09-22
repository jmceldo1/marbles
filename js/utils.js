/**
 * 
 * @param {string} id 
 * @param {string} location 
 */
function createPiece(id, location) {
    return { pieceId: id, location: location };
}

/**
 * 
 * @param {string} card 
 * @param {[]} moves 
 */
function createPlayerMove(card, moves) {
    return { cardUrl: card, moves: moves };
}

/**
 * 
 * @param { string } pieceId 
 * @param { string } previousLocation 
 * @param { string } newLocation 
 */
function createMove(pieceId, previousLocation, newLocation) {
    return { pieceId: pieceId, previousLocation: previousLocation, newLocation: newLocation };
}

function createSendToStartMove(piece){
    let startLocation = piece.pieceId.replace('p','s');
    // if (piece.pieceId.includes("rp-")){
    //     startLocation = piece.pieceId.replace('p','s');
    // }

   if(startLocation){
       return(createMove(piece.pieceId, piece.location, startLocation));
   }

}

function setBoardBasedOnState(state) {
    if(state) {
        let tempMap = new Map(state.pieceMap);
        if(tempMap){
        tempMap.forEach(piece => {
            movePieceToSquare(piece.pieceId, piece.location);
        });
    }

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
    }

}

/**
 * 
 * @param {string} pieceId 
 * @param {string} elementId 
 */
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

/**
 * 
 * @param {Element} startDiv 
 * @param {Element} endDiv 
 * @param {string} arrowDivId 
 */
function drawArrowBetweenDivs(startDiv, endDiv, arrowDivId) {
    let startDivCoords = getOffset(startDiv, true);
    let endDivCords = getOffset(endDiv, true);
    let arrow = document.getElementsByTagName("line")[0];
    arrow.x1.baseVal.value = startDivCoords.left;
    arrow.y1.baseVal.value = startDivCoords.top;
    arrow.x2.baseVal.value = endDivCords.left;
    arrow.y2.baseVal.value = endDivCords.top;
}

/**
 * 
 * @param {string} indexAsString 
 * @returns {number} Returns index or NaN if invalid
 */
function getBoardIndex(indexAsString) {
    let index = parseInt(indexAsString);
    if(isNaN(index)){
        if('rh' === indexAsString) index = RED_HOME;
        if('yh' === indexAsString) index = YELLOW_HOME;
        if('gh' === indexAsString) index = GREEN_HOME;
        if('bh' === indexAsString) index = BLUE_HOME;
    }
    console.log("Index is NaN: " + indexAsString);
    return index;
}

function getBoardIdFromIndex(index) {
    let indexAsString;
    if(index === RED_HOME) indexAsString = 'rh';
    if(index === YELLOW_HOME) indexAsString = 'yh';
    if(index === GREEN_HOME) indexAsString = 'gh';
    if(index === BLUE_HOME) indexAsString = 'bh';

    if(!indexAsString) {
        indexAsString = index+'';
    }
    return indexAsString;
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