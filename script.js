(() => {
  const numbers = [1, 2, 2, 3, 3, 4, 4, 5, 5];
  const flippedCards = [];
  const selectedNumbers = [];

  const bindEventsOnCard = (ele, index, divList) => {
    ele.addEventListener('click', (e) => {
      const currentTarget = e.currentTarget;
      currentTarget.children[0].style.opacity = 1;

      flippedCards.push(index);
      selectedNumbers.push(numbers[index]);
      if (flippedCards.length === 2) {
        if(!selectedNumbers.every(val => val === selectedNumbers[0])) {
          divList[flippedCards[0]].children[0].style.opacity = 0;
          divList[flippedCards[1]].children[0].style.opacity = 0;
          flippedCards.length = 0;
          selectedNumbers.length = 0;
        } else {
          // alert('you win');
          flippedCards.length = 0;
          selectedNumbers.length = 0;
        }
      }
    });
  }
  // [1,2,3,4,5,6,7]
  // Math.floor(Math.random() * 9);

  const initalizeCard = () => {
    const divList = Array.from(document.getElementsByTagName('div'));
    divList.map((div, index) => {
      const span = document.createElement('span');
      span.textContent = numbers[index];
      div.appendChild(span);
      bindEventsOnCard(div, index, divList);
    });
  }



  document.addEventListener('DOMContentLoaded', ()=> {
    initalizeCard();
  }, false)
})();