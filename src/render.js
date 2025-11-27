import * as main from "./main.js";

//renders the actual game 
export function renderGameSetup(winner) {
    const gameSection = document.getElementById('game');

    const scoreBox = document.createElement('div');
    scoreBox.id = 'scoreBox';
    scoreBox.classList.add('center');
    scoreBox.innerHTML = `
        <div id="user" class="player center">
            <img src="public/friend.png" alt="" class="profile">
            <div class="statBox">
              <p id="userScore"></p>
            </div>
        </div>
        <div id="opponent" class="player center">
            <div class="statBox">
                <p id="opponentScore"></p>
            </div>
            <img src="public/computer.png" alt="" class="profile">
        </div>
    `;
    gameSection.appendChild(scoreBox);

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
    const actualGame = document.createElement('div');
    actualGame.id = 'actualGame';
    main.gameArray.forEach((value) => {
        const keys = document.createElement('div');
        keys.classList.add('keys', 'center');
        keys.setAttribute('value', value);
        keys.innerHTML = value;
        actualGame.appendChild(keys);
    });

    gameSection.appendChild(compareBox);
    gameSection.appendChild(actualGame);

    const keys = document.querySelectorAll('.keys');
    keys.forEach((key) => {
        key.addEventListener('click', () =>{
            key.classList.add('no-click')
            main.keysEventClick(key)
        }) 
    })

    if(winner === 'opponent' )
        main.computerGuess();

}

//render the gameMode selection 
export function renderGameModeSelection() {
    const choice = document.getElementById('choice');
    const h2 = document.createElement('h2');
    h2.innerHTML = '';
    choice.appendChild(h2);

    const choiceContainer = document.createElement('div');
    choiceContainer.id = 'choiceContainer';
    choiceContainer.classList.add('center');
    choiceContainer.innerHTML = `
        <div class="choiceBox">
            <img src="public/computer.svg" alt="">
            <p>Computer</p>
        </div>
        <div class="choiceBox">
            <img src="public/friend.svg" alt="">
            <p>Human</p>
        </div>
    `

    choice.appendChild(choiceContainer);
}

//renderToss
export function renderTossBox() {
    const toss = document.getElementById('toss');
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Toss';
    toss.appendChild(h2);

    const coinBox = document.createElement('div');
    coinBox.id = 'coinBox';
    coinBox.classList.add('center');
    coinBox.innerHTML = `
        <div class="coin">
            <img src="public/heads.svg" alt="">
            <p>Heads</p>
        </div>
        <div class="coin">
            <img src="public/tails.svg" alt="">
            <p>Tails</p>
        </div>
    `
    toss.appendChild(coinBox);
    
    const coins = document.querySelectorAll('.coin');
        coins.forEach(coin => {
        coin.addEventListener('click', () => {
            main.tossEvent(coin)
        })
    })
}

export function renderTossResult(winner, tossResult){
    const toss = document.getElementById('toss');
    toss.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Toss';
    toss.appendChild(h2);
    const imgSrc = tossResult === 'Heads'? 'heads' : 'tails';
    // const coinBox = document.createElement('div');
    // coinBox.id = 'coinBox';
    // coinBox.classList.add('center');
    // coinBox.innerHTML = 
    toss.innerHTML +=`
        <div class="coin">
            <img src="public/${imgSrc}.svg" alt="">
            <p>${tossResult}</p>
        </div>
        <p id="tossResultText">${winner} will flip first</p>
        <button id="tossResult">Play</button>
    `

    const tossResultBtn = document.getElementById('tossResult');
    tossResultBtn.addEventListener('click', () => {
        renderGameSetup(winner);
        toss.style.display = 'none';
    })
}