'use strict';

 // Here's my 16 memory cards stored as objects in the array named cards
let cardImages = ['chase', 'everest', 'marshall', 'rocky', 'rubble', 'ryder', 'skye', 'zuma'];
let cards = [];
cardImages.forEach (function(image) {
	cards.push({image: image, turned: false});
	cards.push({image: image, turned: false});
});

// function shuffle the memory cards (using Fisher–Yates shuffle)
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

// start game, shuffle and put all the cards on the game board with the back facing up
function addCardsToBoard () {
	shuffle(cards);
	for (let i = 0; i < cards.length; i++) {
		// creating html div as memory card
	  let cardElement = document.createElement('div');
		cardElement.innerHTML = "<img src='card_images/" + cards[i].image + ".png'>";
	  cardElement.className = 'backofcard';
	  document.querySelector('.memoryboard').appendChild(cardElement);
		cards[i].element = cardElement; //push div to object cards array

		// flip card to front when clicked
	  cardElement.addEventListener('click', function (event) {
	    onClick(cards[i]);
	  });
	}
}
addCardsToBoard();

// compare clicked cards
let allowedToClick = true;
let clickedCards = [];
function onClick (card) {
	if (card.turned || !allowedToClick) {
		return;
	}
	card.element.className = 'front';
	card.turned = true;
	clickedCards.push(card);
	if (clickedCards.length != 2) {
		return;
	}
	if (clickedCards[0].image == clickedCards[1].image) {
		clickedCards.forEach (function(card) {
			card.element.style.border = '3px solid #93bd41'; // green border
		});
		if (isGameFinished()) {
			console.log("slut på spel");
		}
	} else {
		allowedToClick = false; // unable to click until cards been turned to back
		clickedCards.forEach (function(card) {
			card.element.style.border = "3px solid #c41e10"; //red border
			backToBack(clickedCards); // call function to reset back properties
		});
	}
	clickedCards = [];
};

// If cards don't match lets turn them back
function backToBack (clickedCards) {
	setTimeout(function() {
		clickedCards.forEach (function(card) {
			card.element.style.border = '1px solid gray';
			card.element.className = 'backofcard';
			card.turned = false;
			allowedToClick = true;
		});
	}, 2000);
}

// check if game is finished
function isGameFinished () {
	for (let i = 0; i < cards.length; i++) {
		if (!cards[i].turned) {
			return false;
		}
	}
	return true;
}

// lets click the button and play again NOT WORKING
function playAgain () {
	clickedCards = [];
	cards.forEach (function(card) {
		card.element.remove();
		card.element = null;
		card.turned = false;
	});
	addCardsToBoard();
}
