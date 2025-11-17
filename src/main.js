function jumbleArray() {
  let randomArraySetup = [];
  
  for (let index = 0; index < 24; index+=2) {
    randomArraySetup[index] = index;
    randomArraySetup[index+1] = index;
  }
  console.log(randomArraySetup)
  let arr = randomArraySetup;

  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  }
  return arr;
}

let gameArray = jumbleArray();
console.log(gameArray)

function renderGameSetup() {
  const compareBox = document.createElement('div');
  compareBox.id = 'compareBox';
  compareBox.classList.add('center');
  compareBox.innerHTML = `
      <h2 id="playerTitle">User</h2>
      <div class="center">
        <div id="firstDiv" class="center"></div>
        <div id="secondDiv" class="center"></div>
      </div>
  `
  const gameSection = document.getElementById('game');
  const actualGame = document.createElement('div');
  actualGame.id = 'actualGame';
  gameArray.forEach((value) => {
    const keys = document.createElement('div');
    keys.classList.add('keys', 'center');
    keys.setAttribute('value', value);
    keys.innerHTML = value;
    actualGame.appendChild(keys);
  });

  gameSection.appendChild(compareBox);
  gameSection.appendChild(actualGame);
}

renderGameSetup();

let firstClick = true;
let compareValue = "";

const keys = document.querySelectorAll('.keys');
keys.forEach(key => {
  key.addEventListener('click', () => {
    const value = key.getAttribute("value");
    if(firstClick) 
      compareValue = String(value);
    else
      secondClickEvent(String(value));
    firstClick = firstClick? false : true;
    firstClickEvent(compareValue);
  })
})

const firstDiv = document.getElementById('firstDiv');
const secondDiv = document.getElementById('secondDiv');
let first = "", 
    second = "";


function firstClickEvent(value) {
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
    userScore+=2
    renderScore(userScore, user)
  }
  if(gameMode === 'opponent')
    computerGuess();
}

let userScore = 0;
let opponentScore = 0;
const user = 'user', opponent = 'opponent';
let gameMode = 'user';

function renderScore(score, player) {
  const playerName = document.getElementById(player);
  const p = playerName.querySelector("p");
  p.innerHTML = score;

}


function computerGuess() {
  document.getElementById('playerTitle').innerHTML = 'Opponent';
  let firstGuess = Math.floor(Math.random() * 12);
  let secondGuess = Math.floor(Math.random() * 12);
  secondDiv.innerHTML = secondGuess;
  console.log(firstGuess,secondGuess)
  

  
  if(firstGuess === secondGuess) {
    opponentScore+=2;
    renderScore(opponentScore, opponent)
  }
  gameMode = gameMode === 'user'? 'opponent': 'user';
  clickEventActive();
}


function clickEventActive() {
  keys.forEach(key => {
    key.classList.remove('no-click')
  })
}
