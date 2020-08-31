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