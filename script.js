(() => {
  const divList = Array.from(document.getElementsByTagName('div'));
  const numbers = [1, 1, 2, 2, 3, 3, 4, 4];
  const flippedCards = [];
  let selectedIndices = [];

  const bindEventsOnCard = (ele, index, divList) => {
    ele.addEventListener('click', (e) => {
      // show the card
      const currentTarget = e.currentTarget;
      currentTarget.children[0].style.opacity = 1;

      // push it in to the selected index array
      selectedIndices.push(index);
      if (selectedIndices.length === 2) {
        if(numbers[selectedIndices[0]] === numbers[selectedIndices[1]]) {
          // if the numbers matches push those indices in flippedCards
          flippedCards.push(selectedIndices[0], selectedIndices[1]);
        } else {
          // if they don`t match, hide those both card and reshuffle.
          divList[selectedIndices[0]].children[0].style.opacity = 0;
          divList[selectedIndices[1]].children[0].style.opacity = 0;
          shuffleArray(numbers, flippedCards);
          divList.map((div, index) => div.children[0].textContent = numbers[index]);
        }
        selectedIndices.length = 0;
      }
      // winning condition
      if (flippedCards.length === numbers.length) {
        alert('Yay!!');
        window.location.reload();
      }
    }, false);
  }

  const shuffleArray = (arr, excludeIndexList = []) => {
    let currLength = arr.length;
    while (currLength > 0) {
      const randomIndex = Math.floor(Math.random() * currLength--);
      // exclude index list shouldn`t include the random index or the replaced index
      if(!excludeIndexList.includes(randomIndex) && !excludeIndexList.includes(currLength)) {
        [arr[randomIndex], arr[currLength]] = [arr[currLength], arr[randomIndex]];
      }
    }
    return arr;
  }

  const initalizeCard = () => {
    shuffleArray(numbers)
    divList.map((div, index) => {
      const span = document.createElement('span');
      span.textContent = numbers[index];
      div.appendChild(span);
      bindEventsOnCard(div, index, divList);
    });
  }



  document.addEventListener('DOMContentLoaded', initalizeCard, false)
})();