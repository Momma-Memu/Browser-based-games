import { Game } from './game.js';

export class GameJSONDeserializer{
    constructor(JSONString){
        this.JSONString = JSONString;
    }

    deserialize(){
        let savedGameObject = JSON.parse(this.JSONString);
        let newGame = new Game(savedGameObject.player1, savedGameObject.player2);
        for (let i=0; i<7; i++){
            savedGameObject.boardArray[i].forEach(entry => {
                newGame.currentPlayer = entry;
                newGame.playInColumn(i);
            });
        }
        newGame.currentPlayer = savedGameObject.currentPlayer;
        return newGame;
    }
}