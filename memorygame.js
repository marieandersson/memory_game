'use strict';

 // Here's my 16 memory cards stored as objects in the array named cards
let cardImages = ['chase', 'everest', 'marshall', 'rocky', 'rubble', 'ryder', 'skye', 'zuma'];
let cards = [];
cardImages.forEach (function(image) {
	cards.push({image: image, turned: false});
	cards.push({image: image, turned: false});
});

// Let's shuffle the memory cards (using Fisher–Yates shuffle)
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

// Then put all the cards on the game board with the back facing up
for (let i = 0; i < cards.length; i++) {
	// creating html div as memory card
  let cardElement = document.createElement('div');
	cardElement.innerHTML = "<img src='images/" + cards[i].image + ".png'>";
  cardElement.className = 'backofcard';
  document.querySelector('.memoryboard').appendChild(cardElement);
	cards[i].element = cardElement; //push div to object cards array

	// flip card to front when clicked
  cardElement.addEventListener('click', function (event) {
    onClick(cards[i]);
  });
}

// compare clicked cards
let clickedCards = [];
function onClick (card) {
	if (card.turned == false) {
		card.element.className = 'front';
		card.turned = true;
		clickedCards.push(card);
		if (clickedCards.length == 2) {
			if (clickedCards[0].image == clickedCards[1].image) {
				clickedCards.forEach (function(card) {
					card.element.style.border = '3px solid green';
				});
				clickedCards = [];
			} else {
				clickedCards.forEach (function(card) {
					card.element.style.border = "3px solid red";
					backToBack(clickedCards);
				});
				clickedCards = [];
			}
		}
	}
};

// If cards don't match lets turn them back
function backToBack (clickedCards) {
	setTimeout(function() {
		clickedCards.forEach (function(card) {
			card.element.style.border = '1px solid black';
			card.element.className = 'backofcard';
			card.turned = false;
		});
	}, 1500);
}

// dont be able to click befor they turned back?
// game finnished
// replay
