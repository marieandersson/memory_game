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

// Then put all the cards on the game board with the back facing up
for (let i = 0; i < cards.length; i++) {
	// creating html div as memory card
  let card = document.createElement('div');
  card.className = 'backofcard';
  document.querySelector('.memoryboard').appendChild(card);

	// flip card to front when clicked
  card.addEventListener('click', function (event) {
    this.className = 'front';
    this.innerHTML = "<img src='images/" + cards[i].image + ".png'>";
  });
}

let clicks = 0;
const getCards = document.querySelectorAll('.backofcard');
getCards.forEach (function(cardClicks) {
	cardClicks.addEventListener('click', function(event) {
		clicks++;
		if (clicks == 2) {
			let turnedCards = document.querySelectorAll('.front');
			if (turnedCards[0].src == turnedCards[1].src) {
				console.log('par!');
				clicks = 0;
			} else {

			}
		}
	});
});


//function countClicks ()
// new loop - count clicks, if two cards cliked - matching. reset count click.
// if not matching - set all cards to class backofcard.
// when all cards have class front - game finished
// replay game with button by calling shufflefunction and set all cards to class backofcard
