export class GameJSONSerializer{
    constructor(currentGame){
        this.currentGame = currentGame;
        this.player1 = this.currentGame.player1;
        this.player2 = this.currentGame.player2;
        this.currentPlayer = this.currentGame.currentPlayer;
        this.boardArray = [];
        for (let i=0; i<7; i++){
            let currentArray = [];
            for (let j=0; j<6; j++){
                currentArray.push(this.currentGame.getTokenAt(j, i));
            }
            this.boardArray.push(currentArray);
        }
    }

    serialize(){
        let JSONString = JSON.stringify({player1: this.player1, player2: this.player2, boardArray: this.boardArray, currentPlayer: this.currentPlayer});
        return JSONString;
    }
}