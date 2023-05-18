import Square from "./Square.js";
export default class Table{
    size;
    bombAmount;
    flagAmount = 40;
    divGameBoard;
    squares = [];
    openedAmount = 0;
    mines = [];
    isStart = false;
    isGameOver = false;
    isGameWin = false;
    timeToString = "00:00";

    divWinAlert = document.querySelector(".myWinAlert");
    divOverAlert = document.querySelector(".myOverAlert");

    colors = ["#0487ce","#34913c","#c54d4d","#bc00ff","#800000","#30D5C8","#000","gray"]

    constructor(gameBoard,size,bombAmount) {
        this.size =  size;
        this.divGameBoard = gameBoard;
        this.flagAmount = bombAmount;
        this.bombAmount = bombAmount;

        gameBoard.style.setProperty("--size", size);
        let bool = false;
        for (let i = 0; i < size * size; i++) {
            let color = "#e5c29f";
            if(size%2===1){
                if(i % 2 === 0) color = "#e5c29f";
                else color = "#d7b899";
            }else{
                if(i % size === 0)
                    bool = !bool;
                if(bool){
                    if(i % 2 === 0) color = "#e5c29f";
                    else color = "#d7b899";
                }else{
                    if(i % 2 === 1) color = "#e5c29f";
                    else color = "#d7b899";
                }
            }

            const square = new Square(gameBoard,color,i,this)

            this.squares.push(square);
            this.changeFlagAmount();
        }
    }

    startGame(numberOfSquare){
        this.isStart = true;
        outer: for (let i = 0; i < 10; i++) {
            for (let j = 0; j < this.squares.length; j++) {
                if(j === numberOfSquare || j === numberOfSquare+1 || j === numberOfSquare-1 || j === numberOfSquare+this.size || j === numberOfSquare+this.size+1 || j === numberOfSquare+this.size-1 || j === numberOfSquare-this.size+1 || j === numberOfSquare-this.size-1 | j === numberOfSquare-this.size)
                    continue;
                let n = Math.random()*100;
                 if(n < 3 && !this.squares[j].isMine){
                     this.squares[j].isMine = true;
                     this.mines.push(this.squares[j]);
                 }
                 if(this.mines.length >= this.flagAmount){
                     break outer;
                 }
            }
        }
        this.startTimer();

        for (let i = 0; i < this.squares.length; i++) {
            if(!this.squares[i].isMine){
                continue;
            }
            if(i === 0){
                this.squares[i+1].value++;
                this.squares[i+this.size].value++;
                this.squares[i+this.size+1].value++;
            }else if(i === this.size-1){
                this.squares[i-1].value++;
                this.squares[i+this.size].value++;
                this.squares[i+this.size-1].value++;
            }else if(i === this.size*(this.size-1)){
                this.squares[i+1].value++;
                this.squares[i-this.size].value++;
                this.squares[i-this.size+1].value++;
            }else if(i === this.size*this.size-1){
                this.squares[i-1].value++;
                this.squares[i-this.size].value++;
                this.squares[i-this.size-1].value++;
            }else if(i < this.size){
                this.squares[i+1].value++;
                this.squares[i-1].value++;
                this.squares[i+this.size].value++;
                this.squares[i+this.size-1].value++;
                this.squares[i+this.size+1].value++;
            }else if((i+1) % this.size === 0){
                this.squares[i-this.size].value++;
                this.squares[i-this.size-1].value++;
                this.squares[i-1].value++;
                this.squares[i+this.size].value++;
                this.squares[i+this.size-1].value++;
            }else if(i % this.size === 0){
                this.squares[i-this.size].value++;
                this.squares[i-this.size+1].value++;
                this.squares[i+1].value++;
                this.squares[i+this.size].value++;
                this.squares[i+this.size+1].value++;
            }else if(i > this.size*(this.size-1)){
                this.squares[i-this.size+1].value++;
                this.squares[i-this.size].value++;
                this.squares[i-this.size-1].value++;
                this.squares[i+1].value++;
                this.squares[i-1].value++;
            }else{
                this.squares[i-this.size-1].value++;
                this.squares[i-this.size].value++;
                this.squares[i-this.size+1].value++;
                this.squares[i+1].value++;
                this.squares[i-1].value++;
                this.squares[i+this.size-1].value++;
                this.squares[i+this.size].value++;
                this.squares[i+this.size+1].value++;
            }
        }

        // for (let i = 0; i < this.squares.length; i++) {
        //     this.squares[i].divSquare.removeChild(this.squares[i].divSquare.firstChild);
        // }
        // this.seeValues();
        // this.seeBombs();
        console.log(this.squares)
        console.log(this.mines)
    }
    seeBombs(){
        for (let i = 0; i < this.squares.length; i++) {
            if(this.squares[i].isMine){
                const bomb = document.createElement("div");
                bomb.classList.add("bomb");
                this.squares[i].divSquare.append(bomb);
            }
        }
    }
    seeValues(){
        for (let i = 0; i < this.squares.length; i++) {
            if(!this.squares[i].isMine){
                const number = document.createElement("div");
                number.classList.add("number");
                if(this.squares[i].value!==0){
                    number.append(this.squares[i].value);
                }
                this.squares[i].divSquare.append(number);
            }
        }
    }


    openTile(index){
        if(this.squares[index].isOpened || this.squares[index].isMine || this.squares[index].tile.isTagged){
            return;
        }
        this.openedAmount++;
        this.squares[index].divSquare.removeChild(this.squares[index].divSquare.firstChild);
        this.squares[index].isOpened = true;
        const number = document.createElement("div");
        number.classList.add("number");
        if(this.squares[index].value === 0){
            this.openZeroTiles(index);
        }else{
            number.append(this.squares[index].value);
            number.style.color = this.colors[this.squares[index].value-1];
        }
        this.squares[index].divSquare.append(number);

        if(this.openedAmount === this.size*this.size-this.mines.length){
            this.win();
        }
    }

    openZeroTiles(i){
        if(this.squares[i].value !== 0 || this.squares[i].isMine){
            return;
        }
        if(i === 0){
            this.openTile(i+1);
            this.openTile(i+this.size);
            this.openTile(i+this.size+1);
        }else if(i === this.size-1){
            this.openTile(i-1);
            this.openTile(i+this.size);
            this.openTile(i+this.size-1);
        }else if(i === this.size*(this.size-1)){
            this.openTile(i+1);
            this.openTile(i-this.size);
            this.openTile(i-this.size+1);
        }else if(i === this.size*this.size-1){
            this.openTile(i-1);
            this.openTile(i-this.size);
            this.openTile(i-this.size-1);
        }else if(i < this.size){
            this.openTile(i+1);
            this.openTile(i-1);
            this.openTile(i+this.size);
            this.openTile(i+this.size-1);
            this.openTile(i+this.size+1);
        }else if((i+1) % this.size === 0){
            this.openTile(i-this.size);
            this.openTile(i-this.size-1);
            this.openTile(i-1);
            this.openTile(i+this.size);
            this.openTile(i+this.size-1);
        }else if(i % this.size === 0){
            this.openTile(i-this.size);
            this.openTile(i-this.size+1);
            this.openTile(i+1);
            this.openTile(i+this.size);
            this.openTile(i+this.size+1);
        }else if(i > this.size*(this.size-1)){
            this.openTile(i-this.size+1);
            this.openTile(i-this.size);
            this.openTile(i-this.size-1);
            this.openTile(i+1);
            this.openTile(i-1);
        }else{
            this.openTile(i-this.size-1);
            this.openTile(i-this.size);
            this.openTile(i-this.size+1);
            this.openTile(i+1);
            this.openTile(i-1);
            this.openTile(i+this.size-1);
            this.openTile(i+this.size);
            this.openTile(i+this.size+1);
        }
    }


    changeFlagAmount(){
        const divFlagAmount = document.getElementById("flag-amount");
        divFlagAmount.innerHTML = this.flagAmount+"";
    }
    startTimer(){
        const divTimeAmount = document.getElementById("time-amount");

        let seconds = 0;
        let minutes = 0;
        function startTimer(table) {
            setTimeout(() => {
                if(table.isGameOver || table.isGameWin){
                    return;
                }
                seconds++;
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');
                divTimeAmount.innerHTML = (`${formattedMinutes}:${formattedSeconds}`);
                table.timeToString = (`${formattedMinutes}:${formattedSeconds}`);
                if(seconds===60){
                    minutes++;
                    seconds = 0
                }
                startTimer(table); // Recursive call to continue the timer
            }, 1000);
        }
        startTimer(this);
    }

    async gameOver(index) {
        this.isGameOver = true;

        this.squares[index].divSquare.removeChild(this.squares[index].divSquare.firstChild);
        const bomb = document.createElement("div");
        bomb.classList.add("bomb");
        this.squares[index].divSquare.append(bomb);

        for (let i = 0; i < this.mines.length; i++) {
            if (i === index) continue;
            this.mines[i].divSquare.removeChild(this.mines[i].divSquare.firstChild);
            const bomb = document.createElement("div");
            bomb.classList.add("bomb");
            this.mines[i].divSquare.append(bomb);
            await sleep(100);
        }

        function sleep(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }

        // alert("Game OVER :(");
        this.divOverAlert.style.display = "flex";

    }

    win(){
        this.isGameWin = true;
        this.divWinAlert.style.display = "flex";
        const time = document.getElementById("timeID");
        time.innerHTML = ("Time: "+this.timeToString);
    }

    restart(){
        this.gameOver = true;
        while(this.divGameBoard.firstChild){
            this.divGameBoard.removeChild(this.divGameBoard.firstChild);
        }

        const table = new Table(this.divGameBoard,this.size,this.bombAmount);
        table.changeFlagAmount();
        const divTimeAmount = document.getElementById("time-amount");
        divTimeAmount.innerHTML = "00:00";

        this.divWinAlert.style.display = "none";
        this.divOverAlert.style.display = "none";
    }

}