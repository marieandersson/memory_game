'use strict';

 // Here's my 16 memory cards stored in an array (value equals img file name)
const cardImages = ['chase', 'chase', 'everest', 'everest', 'marshall', 'marshall', 'rocky', 'rocky', 'rubble', 'rubble', 'ryder', 'ryder', 'skye', 'skye', 'zuma', 'zuma'];

// Let's shuffle the memory cards using Fisher–Yates shuffle
function shuffle (array) {
  let m = array.length, t, i;
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

// Then put all the cards on the game board with the back facing up
for (let i = 0; i < 16; i++) {
	// creating html div as memory card
  let card = document.createElement('div');
  card.className = 'backofcard';
  document.querySelector('.memoryboard').appendChild(card);

	// flip card to front when clicked
  card.addEventListener('click', function (event) {
    this.className = 'front';
    this.innerHTML = "<img src='images/" + cardImages[i] + ".png'>";
  });
}

let clicks = 0;
const getCards = document.querySelectorAll('.backofcard');
getCards.forEach (function(cardClicks) {
	cardClicks.addEventListener('click', function(event) {
		clicks++;
		if (clicks == 2) {
			let frontCards = document.querySelectorAll('.front img');
			if (frontCards[0].src == frontCards[1].src) {
				console.log('par!');
				clicks = 0;
			}
		}
	});
});


//function countClicks ()
// new loop - count clicks, if two cards cliked - matching. reset count click.
// if not matching - set all cards to class backofcard.
// when all cards have class front - game finished
// replay game with button by calling shufflefunction and set all cards to class backofcard
