'use strict';

// create memorycards and put them in array
let cardImages = ['chase', 'everest', 'marshall', 'rocky', 'rubble', 'ryder', 'skye', 'zuma'];
let cards = [];
cardImages.forEach (function(image) {
 // push twice to get pairs
 cards.push({image: image, turned: false});
 cards.push({image: image, turned: false});
});

// prepare game
let allowedToClick = true;
// array to put turned cards in temporary while comparing them
let clickedCards = [];
startGame(cards);


// FUNCTIONS

// shuffle memory cards (using Fisher–Yates shuffle)
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

// Check if game is finished
function isGameFinished () {
	for (let i = 0; i < cards.length; i++) {
		if (!cards[i].turned) {
			return false;
		}
	}
	return true;
}

// player gets a star when game is finished
function givePlayerStar () {
	let star = document.createElement('div');
	star.className = 'star';
	document.querySelector('.memoryboard').appendChild(star);
}

function flipCardToFront (card) {
	card.element.className = 'front';
	card.turned = true;
	clickedCards.push(card);
}

function flipBackToBack (clickedCards) {
	setTimeout(function() {
		clickedCards.forEach (function(card) {
			card.element.style.border = '1px solid gray';
			card.element.className = 'backofcard';
			card.turned = false;
			allowedToClick = true;
		});
	}, 2000); // 2 sec delay, so that the cards don't turn back immediately
}

// call this function when player clicks on a card
function onClick (card) {
	if (card.turned || !allowedToClick) {
		return;
	}
	flipCardToFront(card);
	if (clickedCards.length != 2) {
		return;
	}
	// compare clicked cards
	if (clickedCards[0].image == clickedCards[1].image) {
		clickedCards.forEach (function(card) {
			// set green border when player gets matching pair
			card.element.style.border = '3px solid #93bd41';
		});
		if (isGameFinished()) {
			givePlayerStar();
		}
	} else {
		// player unable to click until cards been turned back
		allowedToClick = false;
		clickedCards.forEach (function(card) {
			// set temporary red border if cards don't match
			card.element.style.border = "3px solid #c41e10";
			// then call function to reset back properties
			flipBackToBack(clickedCards);
		});
	}
	// empty clicked cards array
	clickedCards = [];
};

// start game by shuffle cards and put them on memory board
function startGame (cards) {
	shuffle(cards);
	for (let i = 0; i < cards.length; i++) {
		// creating div as memory card
	  let cardElement = document.createElement('div');
		cardElement.innerHTML = "<img src='card_images/" + cards[i].image + ".png'>";
	  cardElement.className = 'backofcard';
	  document.querySelector('.memoryboard').appendChild(cardElement);
		// also push div to card object in cards array
		cards[i].element = cardElement;

		// flip card to front when clicked
	  cardElement.addEventListener('click', function (event) {
	    onClick(cards[i]);
	  });
	}
}

// Click button to play again
function onPlayAgainClicked () {
	document.querySelector('.star').remove();
	clickedCards = [];
	cards.forEach (function(card) {
		card.element.remove();
		card.element = null;
		card.turned = false;
	});
	startGame(cards);
}
