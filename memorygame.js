'use strict';

 // Here's my 16 memory cards stored in an array (value equals img file name)
let cardImages = ['chase', 'everest', 'marshall', 'rocky', 'rubble', 'ryder', 'skye', 'zuma'];
let cards = [];
cardImages.forEach (function(image) {
	cards.push({image: image, turned: false});
	cards.push({image: image, turned: false});
});


// Let's shuffle the memory cards using Fisher–Yates shuffle
function shuffle (array) {
  let m = array.length;
	let t;
	let i;
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
shuffle(cards);
console.log(cards);

// function to check clicked cards and compare them in a temp array
let clickedCards = [];
function onClick (card) {
	if (card.turned == false) {
		card.element.className = 'front';
		card.element.innerHTML = "<img src='images/" + card.image + ".png'>";
		card.turned = true;
		clickedCards.push(card.image);
		if (clickedCards.length == 2) {
			if (clickedCards[0] == clickedCards[1]) {
				//add green border
				//empty array
			} else {
				//add temp red border
				// turn cards
				// set turned to false
				//empty array
			}
		}
	}
};
// Then put all the cards on the game board with the back facing up
for (let i = 0; i < cards.length; i++) {
	// creating html div as memory card
  let cardElement = document.createElement('div');
  cardElement.className = 'backofcard';
  document.querySelector('.memoryboard').appendChild(cardElement);
	cards[i].element = cardElement;

	// flip card to front when clicked
  cardElement.addEventListener('click', function (event) {
    onClick(cards[i]);
  });
}
