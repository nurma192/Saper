import Tile from "./Tile.js";
export default class Square{
    table;
    divSquare;
    tile;
    value = 0;
    index;
    isMine = false;
    isOpened = false;
    constructor(gameBoard, color,index, table) {
        this.table = table;
        this.index = index;

        this.divSquare = document.createElement("div");
        this.divSquare.classList.add("square");
        this.divSquare.style.background = color;

        let tileColor;
        if(color === ("#e5c29f")) {
            tileColor = "#aad750"
        }
        else {
            tileColor = "#a2d148";
        }

        this.tile = new Tile(this ,tileColor, table);
        gameBoard.append(this.divSquare);
    }

}