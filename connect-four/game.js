import { Column } from './column.js'
import { ColumnWinInspector } from './column-win-inspector.js'
import { RowWinInspector } from './row-win-inspector.js';
import { DiagonalWinInspector } from './diagonal-win-inspector.js';

//import { GameJsonSerializer } from "./game-JSON-serializer.js";

export class Game{
    constructor(player1, player2){
        this.player1 = player1
        this.player2 = player2
        this.currentPlayer = 1;
        this.columns = []
        for(let i = 0; i < 7; i++){
            this.columns.push(new Column())
        }
        this.winnerNumber = 0;
    }
    getName(){
        if(this.winnerNumber === 3){
            return `${this.player1} ties with ${this.player2}`;
        } else if (this.winnerNumber === 1){
            return `${this.player1} wins!`
        } else if (this.winnerNumber === 2){
            return `${this.player2} wins!`
        } else {
            return `${this.player1} vs. ${this.player2}`;
        }
    }

    checkForATie(){
        let allFull = true;
        for(let i = 0; i < 7; i++){
            if (!this.isColumnFull(i)) allFull = false;
        }
        if(allFull){
            this.winnerNumber = 3;
            console.log("It's a tie!")
        }
    }

    checkForColumnWin(){
        if(this.winnerNumber === 0){
            this.columns.forEach(column => {
                let inspector = new ColumnWinInspector(column)
                let columnWinner = inspector.inspect()
                if(columnWinner === 1 || columnWinner === 2){
                    this.winnerNumber = columnWinner;

                }
            });
        }
    }

    checkForRowWin(){
        if(this.winnerNumber === 0){
            let bundles = [this.columns.slice(0, 4),
                this.columns.slice(1, 5),
                this.columns.slice(2, 6),
                this.columns.slice(3)];
            for(let i=0; i<4; i++){
                let inspector = new RowWinInspector(bundles[i]);
                let currentWinner = inspector.inspect();
                if (currentWinner > 0){
                    this.winnerNumber = currentWinner;
                    return undefined;
                }
            }
        };
    };

    checkForDiagonalWin(){
        if(this.winnerNumber === 0){
            let bundles = [this.columns.slice(0, 4),
                this.columns.slice(1, 5),
                this.columns.slice(2, 6),
                this.columns.slice(3)];
            for(let i = 0; i < 4; i++){
                let inspector = new DiagonalWinInspector(bundles[i])
                let currentWinner = inspector.inspect();
                if(currentWinner > 0){
                    this.winnerNumber = currentWinner
                    return undefined
                }

            }
        }
    }

    playInColumn(columnIndex){
        if(!this.isColumnFull(columnIndex)){
            this.columns[columnIndex].add(this.currentPlayer)
            if(this.currentPlayer === 1) this.currentPlayer = 2;
            else this.currentPlayer = 1;
        }
    }
    getTokenAt(rowIndex, columnIndex){
        return this.columns[columnIndex].columnArray[rowIndex]
    }

    isColumnFull(colIndex){
        if(this.winnerNumber === 1 || this.winnerNumber === 2) return true
        return this.columns[colIndex].isFull();
    }
}
