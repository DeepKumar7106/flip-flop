import { removeElements, gameMode } from "./main.js";

function computerGuess() {
    
    let firstGuess = computerMove();
    document.getElementById('firstDiv').innerHTML = firstGuess;
    let secondGuess;
    setTimeout(100, () => {
        secondGuess = computerMove();
        document.getElementById('secondDiv').innerHTML = secondGuess;
        console.log(firstGuess,secondGuess);
        gameMode = gameMode === 'user'? 'opponent': 'user';
        document.getElementById('playerTitle').innerHTML = opponent;
    })















    // console.log(firstGuess,secondGuess);
    // // i will deal with this later 
    
    // gameMode = gameMode === 'user'? 'opponent': 'user';
    
    // console.log(firstGuess, secondGuess)
    
    // document.getElementById('playerTitle').innerHTML = opponent;
    // if(firstGuess === secondGuess) {
    //   gameMode = 'opponent';
    //   renderOut(secondGuess);
    //   opponentScore+=2;
    //   removeElements(secondGuess);
    //   renderScore(opponentScore, opponent)
    // }
    // clickEventActive();
    // document.getElementById('playerTitle').innerHTML = 'Opponent';
    // if (gameMode === 'opponent' && renderCounter < 12) {
    //   computerGuess();
    // }
  }
  
function computerMove() {
    const index = Math.floor(Math.random() * gameArray.length);
    const value =  gameArray[index];
    return value;
  }