import { renderGameSetup } from "./render";


//randomiser for the game 
function jumbleArray() {
  let randomArraySetup = [];

  for (let index = 0; index < 24; index+=2) {
      randomArraySetup[index] = index;
      randomArraySetup[index+1] = index;
  }
  let arr = randomArraySetup;

  for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
  }
  return arr;
}

//stores into a array
let gameArray = jumbleArray();

//renders the actual game 
renderGameSetup(gameArray);


//removes the provided element 
function removeElements(value){
  for (let index = gameArray.length-1; index >=0; index--) {
    if(gameArray[index] === Number(value))
      gameArray.splice(index, 1);  
  }
}

//removes the matched elements
let renderCounter = 1;

function renderOut(value) {
  renderCounter++;
  const keys = document.querySelectorAll(`[value="${value}"]`);
  keys.forEach(key => {
    key.style.pointerEvents = "none";
    key.style.opacity = "0.5";
  })
  if(renderCounter > 12)
    renderResult();
}

//allows user to click again
function clickEventActive() {
  keys.forEach(key => {
    key.classList.remove('no-click')
  })
}

let gameMode = 'user',
    userScore = 0,
    opponentScore = 0;

const firstDiv = document.getElementById('firstDiv');
const secondDiv = document.getElementById('secondDiv');

console.log(firstDiv,secondDiv)

//player related 
let firstClick = true,
    compareValue = "",
    first,second;
const keys = document.querySelectorAll('.keys');
keys.forEach((key) => {
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


function firstClickEvent(value) {
  console.log('clicker')
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
    // renderScore(userScore, user);
    clickEventActive();
    removeElements(second);
  }
  if(gameMode === 'opponent')
    computerGuess();
}



//computer moves
function computerMove() {
  const index = Math.floor(Math.random() * gameArray.length);
  const value =  gameArray[index];
  return value;
}

function computerGuess() {
  const firstGuess = computerMove();
  const secondGuess = computerMove();

  console.log(firstGuess,secondGuess);
  if(firstGuess === secondGuess) {
    renderOut(secondGuess);
    opponentScore+=2;
    removeElements(secondGuess);
    setTimeout(computerGuess, 1000);
  } else {
    clickEventActive();
    gameMode = 'user';
  }
}