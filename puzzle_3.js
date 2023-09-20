var rows = 4;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;

// var orignalOrder = ["1", "2", "3", "4", "5", "6", "7","8", "9", "10","11","12","13","14","15","16"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3", "11", "12", "3", "13", "14", "8", "15", "16", "10"];

window.onload = function () {
    //initialize the 4x4 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>

            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            tile.src = "./images/blank.png";
            document.getElementById("board").append(tile);

        }

    }

    //pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); //put "1" to "16" into the array (puzzle images names)
    }

    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }


    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images3/" + pieces[i] + ".png";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }

}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on

}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }

    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;


    const imageNameWithExtension = currImg.split('/').pop();
    const imageNameWithoutExtension = imageNameWithExtension.split('.').slice(0, -1).join('.');

    turns += 1
    // document.getElementById("output").innerHTML =imageNameWithoutExtension ;
    document.getElementById("turns").innerText = turns;

}
getImages();
function getImages() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            var someimage = document.getElementById('this_one');
            var myimg = someimage.getElementsByTagName('img')[0];
            var mysrc = myimg.src;
            document.getElementById("output").innerHTML =mysrc ;

        }
    }
}
