function createPiece(id, location){
    return {pieceId: id, location: location};
}

function createPlayerMove(card, moves) {
    return {cardUrl: card, moves: moves};
}

function createMove(pieceId, previousLocation, newLocation) {
    return {pieceId: pieceId, previousLocation: previousLocation, newLocation: newLocation};
}

function setBoardBasedOnState() {  
    
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

function movePieceToSquare(pieceId, elementId) {
    var piece = document.getElementById(pieceId);
    var element = document.getElementById(elementId);
    var elementOffsets = getOffset(element);
    piece.style.left = elementOffsets.left;
    piece.style.top = elementOffsets.top;
}
 
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

var boardArray = [{piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null},{piece: null},
    {piece: null}, {piece: null}, {piece: null, home: [{id:"ye-0", piece:null}, {id:"ye-1", piece:null},{id:"ye-2", piece:null}, {id:"ye-3", piece:null}]}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null, home: [{id:"ge-0", piece:null}, {id:"ge-1", piece:null},{id:"ge-2", piece:null}, {id:"ge-3", piece:null}]}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null, home: [{id:"be-0", piece:null}, {id:"be-1", piece:null},{id:"be-2", piece:null}, {id:"be-3", piece:null}]}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null},
    {piece: null}, {piece: null}, {piece: null}, {piece: null}, {piece: null, home: [{id:"re-0", piece:null}, {id:"re-1", piece:null},{id:"re-2", piece:null}, {id:"re-3", piece:null}]}, {piece: null}]




function getPossibleSquare(piece, cardValue) {
    piece.currentLocation;

    //Get Current location of piece

    //Calculate where cardValue puts piece

    //Update style of that square

}