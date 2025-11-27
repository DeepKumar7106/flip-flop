import * as render from "./render";
//renders gamemode selection 
render.renderGameModeSelection();


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
export let gameArray = jumbleArray();

//renders the actual game 
// renderGameSetup(gameArray);


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

//match case for both ends
function matchCase(player, guess) {
  renderOut(guess);
  if( player === user)
    userScore++;
  else
    opponentScore++;
  removeElements(guess);
  console.log(userScore, opponentScore);
}

//allows user to click again
function clickEventActive() {
  const keys = document.querySelectorAll('.keys')
  keys.forEach(key => {
    key.classList.remove('no-click')
  })
}

//game functionings
let gameMode = '';

const choiceBoxes = document.querySelectorAll('.choiceBox');
choiceBoxes.forEach(choiceBox => {
  choiceBox.addEventListener('click', () => {
    //store the game mode selected
    gameMode = choiceBox.querySelector('p').textContent;

    //set the display to none
    document.getElementById('choice').style.display = 'none';

    //move on to toss
    render.renderTossBox();
  })
})

//toss functionality

export function tossEvent(coin) {
  const randomToss = (Math.floor(Math.random() * 2))? 'Heads': 'Tails';
  const userToss = String(coin.querySelector('p').textContent);
  currentPlayer = randomToss === userToss? user : opponent;

  render.renderTossResult(currentPlayer, randomToss);
  
  // document.getElementById('toss').style.display = 'none';
}

let currentPlayer = 'user',
    userScore = 0,
    opponentScore = 0;
const opponent = 'opponent', user = 'user';
const firstDiv = document.getElementById('firstDiv');
const secondDiv = document.getElementById('secondDiv');

console.log(firstDiv,secondDiv)

//player related 
let firstClick = true,
    compareValue = "",
    first,second;

//this function is called when clicked a key 
export function keysEventClick(key) {
  console.log(key);
  const value = key.getAttribute("value");
  if(firstClick) 
    compareValue = String(value);
  else
    secondClickEvent(String(value));
  firstClick = firstClick? false : true;
  firstClickEvent(compareValue);

}

//doesnot work
// const keys = document.querySelectorAll('.keys');
// keys.forEach((key) => {
//   key.addEventListener('click', () => {
//     const value = key.getAttribute("value");
//     if(firstClick) 
//       compareValue = String(value);
//     else
//       secondClickEvent(String(value));
//     firstClick = firstClick? false : true;
//     firstClickEvent(compareValue);
//   })
// })


function firstClickEvent(value) {
  console.log(value);
  document.getElementById('playerTitle').innerHTML = 'User';
  first = value;
  console.log(first);
  document.getElementById('firstDiv').innerHTML = first;
}

function secondClickEvent(value) {
  second = value;
  document.getElementById('secondDiv').innerHTML = second;
  const keys = document.querySelectorAll('.keys')
 

  currentPlayer = currentPlayer === user? opponent: user;
  if(first === second) {
    keys.forEach( key => {
      key.classList.remove('no-click');
    })
    currentPlayer = 'user';
    matchCase(user, second);
    // clickEventActive();
  }
  if(currentPlayer === 'opponent') {
    keys.forEach(key => {
      key.classList.add('no-click')
    })
    computerGuess();
  }
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
  if(firstGuess === secondGuess && renderCounter < 12) {
    matchCase(opponent, secondGuess);
    setTimeout(computerGuess, 1000);
  } else {
    clickEventActive();
    currentPlayer = user;
  }
}



//results
function renderResult() {
  const game = document.getElementById('game');
  game.classList.add('gameResult');

  const result = document.getElementById('result');
  result.style.display = 'flex';

  const resultHeading = document.getElementById('resultHeading');
  if(userScore > opponentScore) {
    resultHeading.innerHTML = user + ' won';
  } else {
    resultHeading.innerHTML = opponent + ' won';
  }
}