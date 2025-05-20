// Global variable
const cardFrontsidePath = 'images/white.png';
const cardBacksidePath = 'images/blank.png';
let chosenCards = [];
let chosenCardsIndex = [];
let matchedCardsIndex = [];
let score = 0;
let isNowClickable = true;

// Set up foods line-up
const foodNames = ['cheeseburger', 'fries', 'hotdog', 'icecream', 'milkshake', 'pizza'];

// Create fundamental card infomation array
let cardInfoArray = foodNames.map((name) => ({
	name,
	path: `images/${name}.png`,
}));

// Duplicate the cards
cardInfoArray = [...cardInfoArray, ...cardInfoArray];

// Shuffle the cards
cardInfoArray.sort(() => 0.5 - Math.random());

// Append cards to the grid
const cardsGrid = document.querySelector('#cards');
cardInfoArray.forEach((card, i) => {
	const cardElement = document.createElement('img');
	cardElement.classList.add('cards__card');
	cardElement.setAttribute('src', cardBacksidePath);
	cardElement.setAttribute('data-card-id', i);
	cardElement.addEventListener('click', flipCard);
	cardsGrid.appendChild(cardElement);
});

// Check if chosen cards match
function checkIfMatch() {
	if (chosenCards[0].name === chosenCards[1].name) {
		cardInfoArray.forEach((card, i) => {
			if (card.name === chosenCards[0].name) {
				matchedCardsIndex.push(i);
			}
		});
		matchedCardsIndex.forEach((index) => {
			const cardElements = document.querySelectorAll('.cards__card');
			cardElements[index].setAttribute('src', cardFrontsidePath);
			cardElements[index].style.pointerEvents = 'none';
		});
		chosenCards = [];
		chosenCardsIndex = [];
		score++;
		updateScore();
		if (score === foodNames.length) {
			setTimeout(() => {
				alert('game over!');
			}, 500);
		}
	} else {
		setTimeout(() => {
			chosenCardsIndex.forEach((index) => {
				document.querySelectorAll('[data-card-id]')[index].setAttribute('src', cardBacksidePath);
			});
			chosenCards = [];
			chosenCardsIndex = [];
		}, 500);
	}
	setTimeout(() => {
		isNowClickable = true;
	}, 500);
}

// Flip cards
function flipCard() {
	if (isNowClickable) {
		isNowClickable = false;
		const cardId = this.getAttribute('data-card-id');
		this.setAttribute('src', cardInfoArray[cardId].path);
		if (!chosenCardsIndex.includes(cardId)) {
			chosenCards.push(cardInfoArray[cardId]);
			chosenCardsIndex.push(cardId);
		}
		if (chosenCards.length === 2) {
			setTimeout(checkIfMatch, 100);
		} else {
			isNowClickable = true;
		}
	}
}

function updateScore() {
	document.querySelector('p span').innerHTML = score;
}

updateScore();
