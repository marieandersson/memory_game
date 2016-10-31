'use strict';

// loop out 16 cards to memoryboard
for (let i = 0; i < 16; i++) {
	// creating back of memory card and add to memoryboard
  let card = document.createElement('div');
  card.className = 'backofcard';
  document.querySelector('.memoryboard').appendChild(card);

	// test flip card to front with given color
  card.addEventListener('click', function (event) {
    this.style.backgroundColor = 'green';
  });
}
/* memory card images as objects
const cardImages = [
  {
    image: 'chase',
    id: 1
  },
  {
    image: 'everest',
    id: 2
  },
  {
    image: 'marshall',
    id: 3
  },
  {
    image: 'rocky',
    id: 4
  },
  {
    image: 'rubble',
    id: 5
  },
  {
    image: 'ryder',
    id: 6
  },
  {
    image: 'skye',
    id: 7
  },
  {
    image: 'zuma',
    id: 8
  }
];
*/
