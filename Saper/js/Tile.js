export default class Tile{
    // table;
    square;
    divTile;
    table;
    isTagged = false;
    constructor(square, color,table) {
        this.table = table;
        this.square = square;

        this.divTile = document.createElement("div");
        this.divTile.classList.add("tile");
        this.divTile.style.setProperty("--color", color);

        this.divTile.addEventListener("mouseover",function () {
            this.style.setProperty("--color", "#cceb90");
        });
        this.divTile.addEventListener("mouseout",function () {
            this.style.setProperty("--color", color);
        });

        this.divTile.addEventListener("click",function () {
            if(square.tile.isTagged || table.isGameOver){
                return;
            }
            if(!table.isStart){
                table.startGame(square.index);
            }
            if(!square.isMine){
                table.openTile(square.index);
            }else {
                table.gameOver(square.index);
            }
        });
        this.divTile.addEventListener("contextmenu",function () {
            event.preventDefault();
            if(table.isGameOver){
                return;
            }

            if(!square.tile.isTagged){
                if(table.flagAmount === 0) return;
                const img = document.createElement("img");
                img.src = "./img/flag_icon.png";
                this.append(img);
                square.tile.isTagged = true;
                table.flagAmount--;
                table.changeFlagAmount();
            }else{
                square.tile.divTile.removeChild(square.tile.divTile.firstChild);
                square.tile.isTagged = false;
                table.flagAmount++;
                table.changeFlagAmount();
            }
        });

        square.divSquare.append(this.divTile);
    }
}
