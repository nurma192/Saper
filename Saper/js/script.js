import Table from "./Table.js";
const gameBoard = document.getElementById("game_board");

let table = new Table(gameBoard,18,40);

console.log("hello Nurmukhamet")

const btnRestart1 = document.getElementById("restart1");
const btnRestart2 = document.getElementById("restart2");

btnRestart1.addEventListener("click",function () {
    table.restart();
});
btnRestart2.addEventListener("click",function () {
    table.restart();
});

let comboBoxValue = 2;
const comboBox = document.getElementById("comboBox");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click",function () {
    if(comboBoxValue !== comboBox.value){
        comboBoxValue = comboBox.value;

        table.isGameOver = true;
        while (gameBoard.firstChild){
            gameBoard.removeChild(gameBoard.firstChild);
        }

        if(comboBoxValue == 1){
            gameBoard.style.setProperty("--square-size", "60px");
            gameBoard.style.setProperty("--numberSize", "30px");

            table = new Table(gameBoard,10,15);
        }else if(comboBoxValue == 2){
            gameBoard.style.setProperty("--square-size", "40px");
            gameBoard.style.setProperty("--numberSize", "25px");

            table = new Table(gameBoard,18,40);
        }else if(comboBoxValue == 3){
            gameBoard.style.setProperty("--square-size", "33px");
            gameBoard.style.setProperty("--numberSize", "20px");

            table = new Table(gameBoard,25,70);
        }
    }
})

