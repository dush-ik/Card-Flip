(() => {
  const divList = Array.from(document.getElementsByClassName('game__card'));
  const $restart = document.getElementById('restart');
  const numbers = [1, 1, 2, 2, 3, 3, 4, 4];
  const flippedCards = [];
  let selectedIndices = [];

  const shuffleArray = (arr, excludeIndexList = []) => {
    let currLength = arr.length;
    while (currLength > 0) {
      const randomIndex = Math.floor(Math.random() * currLength--);
      // exclude index list shouldn`t include the random index or the replaced index
      if(!excludeIndexList.includes(randomIndex) 
        && !excludeIndexList.includes(currLength)) {
        [arr[randomIndex], arr[currLength]] 
          = [arr[currLength], arr[randomIndex]];
      }
    }
    return arr;
  }

  const flipCards = (e, index) => {
    const currentTarget = e.currentTarget;
    currentTarget.children[0].classList.add('game__card--rotate');

    // push it in to the selected index array
    selectedIndices.push(index);
    if (selectedIndices.length === 2) {
      if(numbers[selectedIndices[0]] === numbers[selectedIndices[1]]) {
        // if the numbers matches push those indices in flippedCards
        flippedCards.push(selectedIndices[0], selectedIndices[1]);
      } else {
        const firstOne = selectedIndices[0];
        const secondOne = selectedIndices[1];

        setTimeout(() => {
          divList[firstOne].children[0].classList.remove('game__card--rotate');
          divList[secondOne].children[0].classList.remove('game__card--rotate');
        }, 500);
  
        setTimeout(() => {
          shuffleArray(numbers, flippedCards);
          divList.map((div, index) => div.children[0].children[1].textContent = numbers[index]);  
        }, 600)
      }
      selectedIndices.length = 0;
    }
    // winning condition
    if (flippedCards.length === numbers.length) {
      alert('Yay!!');
      window.location.reload();
    }
  }

  const restartGame = () => {
    divList.forEach(div => div.removeEventListener('click', flipCards, false));
    initializeGame();
  }

  const initializeEvents = () => {
    divList.forEach((div, index) => div.addEventListener('click',
      e => flipCards(e, index),
      false
    ));
    $restart.addEventListener('click', restartGame, false);
  }

  const initializeCard = () => {
    shuffleArray(numbers);
    divList.map((div, index) => div.children[0].children[1].textContent = numbers[index]);
  }

  const initializeGame = () => {
    initializeCard();
    initializeEvents();
  }

  document.addEventListener('DOMContentLoaded', initializeGame, false)
})();