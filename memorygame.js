'use strict';

// Create memorycards and put them in an array
let cardImages = ['chase', 'everest', 'marshall', 'rocky', 'rubble', 'ryder', 'skye', 'zuma'];
let cards = [];
cardImages.forEach (function(image) {
 // push each object twice to get pairs
 cards.push({image: image, turned: false});
 cards.push({image: image, turned: false});
});

// Define if player is allowed to click on cards
let allowedToClick = true;
// Create array to temporary store cards in while comparing them
let clickedCards = [];
// Let the game begin!
startGame(cards);

// Shuffle cards and put them on memory board
function startGame (cards) {
	shuffle(cards);
	for (let i = 0; i < cards.length; i++) {
	  let cardElement = document.createElement('div');
		cardElement.innerHTML = "<img src='card_images/" + cards[i].image + ".png'>";
	  cardElement.className = 'backofcard';
	  document.querySelector('.memoryboard').appendChild(cardElement);
		// Push div to card object in cards array
		cards[i].element = cardElement;

	  cardElement.addEventListener('click', function (event) {
	    onClick(cards[i]);
	  });
	}
}

// Shuffle memory cards using Fisher–Yates shuffle
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

// Flip clicked card to front and compare when two cards have been turned
function onClick (card) {
	if (card.turned || !allowedToClick) {
		return;
	}
	flipCardToFront(card);
	if (clickedCards.length != 2) {
		return;
	}
	// Compare clicked cards
	if (clickedCards[0].image == clickedCards[1].image) {
		clickedCards.forEach (function(card) {
			// Set green border when player gets matching pair
			card.element.setAttribute('id','greenBorder');
		});
		if (isGameFinished()) {
			givePlayerStar();
		}
	} else {
		// Player unable to click until cards have been turned back
		allowedToClick = false;
		clickedCards.forEach (function(card) {
			// Set temporary red border if cards don't match
			card.element.setAttribute('id','redBorder');
			flipBackToBack(clickedCards);
		});
	}
	clickedCards = [];
};

// Flip card to front when clicked
function flipCardToFront (card) {
	card.element.className = 'front';
	card.turned = true;
	clickedCards.push(card);
}

// Flip cards back if they don't match
function flipBackToBack (clickedCards) {
	setTimeout(function() {
		clickedCards.forEach (function(card) {
			card.element.removeAttribute("id");
			card.element.className = 'backofcard';
			card.turned = false;
			allowedToClick = true;
		});
	}, 2000); // 2 sec delay
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

// Give player a star when game is finished
function givePlayerStar () {
	let star = document.createElement('div');
	star.className = 'star';
	document.querySelector('.memoryboard').appendChild(star);
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
