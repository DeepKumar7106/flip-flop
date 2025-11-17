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

  gameSection.appendChild(actualGame);
}

renderGameSetup();

const keys = document.querySelectorAll('.keys');
keys.forEach(key => {
  key.addEventListener('click', () => {
    const value = key.getAttribute("value");
    console.log(value);
  })
})
