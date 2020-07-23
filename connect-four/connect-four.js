import { Game } from './game.js';
import { GameJSONSerializer } from './game-json-serializer.js';
import { GameJSONDeserializer } from './game-json-deserializer.js';

let game = undefined

function updateUI(){
    if(game === undefined){
        document.getElementById('board-holder').classList.add('is-invisible')
    } else {
        game.checkForATie();
        game.checkForDiagonalWin();
        game.checkForColumnWin()
        game.checkForRowWin()
        document.getElementById('board-holder').classList.remove('is-invisible')
        document.getElementById('game-name').innerHTML = game.getName();
    }
    let player = game.currentPlayer;
    /// ONE = RED
    /// TWO = BLACK
    let clickTargets = document.getElementById("click-targets");
    if (player === 1){
        clickTargets.classList.add("red");
        clickTargets.classList.remove("black");
    } else {
        clickTargets.classList.add("black");
        clickTargets.classList.remove("red");
    }
    for(let i = 0; i < 7; i++){
        if(game.isColumnFull(i)){
            document.getElementById(`column-${i}`).classList.add("full");
        } else {
            document.getElementById(`column-${i}`).classList.remove("full");
        }
        for(let j = 0; j < 6; j++){
            let token = game.getTokenAt(j, i)
            let currentSquare = document.getElementById(`square-${5 - j}-${i}`);
            if(token && !currentSquare.hasChildNodes()){
                let color = 'red';
                if(token === 2){
                    color = 'black';
                }
                let marker = document.createElement('div')
                marker.classList.add("token");
                marker.classList.add(color)
                currentSquare.appendChild(marker);
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    let player1;
    let player2;
    document.getElementById('form-holder').addEventListener('keyup', (event) => {
        player1 = document.getElementById('player-1-name').value;
        player2 = document.getElementById('player-2-name').value;
        if(player1 === '' || player2 === ''){
            document.getElementById('new-game').disabled = true;
        } else{
            document.getElementById('new-game').disabled = false;
        };
    });

    document.getElementById('new-game').addEventListener('click', ()=>{
        game = new Game(player1, player2)
        document.getElementById('player-1-name').value = '';
        document.getElementById('player-2-name').value = '';
        localStorage.removeItem('savedCFGame');
        document.getElementById('new-game').disabled = true;
        document.querySelectorAll(".token-square").forEach(el => {
            if(el.firstChild){
                el.removeChild(el.firstChild);
            }
        })
        updateUI();
    });

    document.getElementById("click-targets").addEventListener("click", event =>{
        let columnIndex = Number(event.target.id.split('-')[1])
        game.playInColumn(columnIndex);
        updateUI();
        localStorage.setItem("savedCFGame", (new GameJSONSerializer(game)).serialize());
    });
    let localGame = localStorage.getItem("savedCFGame");
    if (localGame){
        game = (new GameJSONDeserializer(localGame)).deserialize();
        console.log(game);
        updateUI();
    }
});
