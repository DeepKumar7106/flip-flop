import {removeElement, gameMode} from './main.js'
import {computerGuess} from './computer.js'
let first,second;

function firstClickEvent(value) {
  
    document.getElementById('playerTitle').innerHTML = 'User';
    first = value;
    firstDiv.innerHTML = first;
  }
  
  function secondClickEvent(value) {
    second = value;
    secondDiv.innerHTML = second;
  
    keys.forEach(key => {
      key.classList.add('no-click')
    })
    gameMode = gameMode === 'user'? 'opponent': 'user';
    if(first === second) {
      gameMode = 'user';
      renderOut(first);
      userScore+=2
      renderScore(userScore, user);
      clickEventActive();
      removeElement(second);
    }
    if(gameMode === 'opponent')
      computerGuess();
  }
  