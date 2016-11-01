'use strict';

// loop out 16 cards to memoryboard
for (let i = 0; i < 16; i++) {
	// creating back of memory card and add to memoryboard
  let card = document.createElement('div');
  card.className = 'backofcard';
  document.querySelector('.memoryboard').appendChild(card);

	// test flip card to front with given color
  card.addEventListener('click', function (event) {
    this.className = 'front';
		this.innerHTML = "<img src='images/" + cardImages[i] + ".png'>";
  });
}
 // memory card images as objects
const cardImages = ['chase', 'chase', 'everest', 'everest', 'marshall', 'marshall', 'rocky', 'rocky', 'rubble', 'rubble', 'ryder', 'ryder', 'skye', 'skye', 'zuma', 'zuma'];

// get and rewrite shuffle
function shuffle (array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
shuffle(cardImages);
console.log(cardImages);
