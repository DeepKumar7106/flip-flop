export function renderGameSetup(gameArray) {
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
