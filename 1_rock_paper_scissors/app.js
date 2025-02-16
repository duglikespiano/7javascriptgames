const computerChoiceElement = document.querySelector('#computer-choice');
const userChoiceElement = document.querySelector('#user-choice');
const resultElement = document.querySelector('#result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;

const generateComputerChoice = () => {
	const randomNumber = Math.floor(Math.random() * possibleChoices.length);
	if (randomNumber === 0) {
		computerChoice = 'rock';
	} else if (randomNumber === 1) {
		computerChoice = 'paper';
	} else if (randomNumber === 2) {
		computerChoice = 'scissors';
	}
	computerChoiceElement.innerHTML = computerChoice;
};

const getResult = () => {
	if (computerChoice === userChoice) {
		result = "It's a draw!";
	}
	if (computerChoice === 'rock' && userChoice === 'paper') {
		result = 'you win!';
	}
	if (computerChoice === 'rock' && userChoice === 'scissors') {
		result = 'you lose!';
	}
	if (computerChoice === 'paper' && userChoice === 'scissors') {
		result = 'you win!';
	}
	if (computerChoice === 'paper' && userChoice === 'rock') {
		result = 'you lose!';
	}
	if (computerChoice === 'scissors' && userChoice === 'rock') {
		result = 'you win!';
	}
	if (computerChoice === 'scissors' && userChoice === 'paper') {
		result = 'you lose!';
	}
	resultElement.innerHTML = result;
};

const renderResult = (event) => {
	userChoice = event.target.id;
	userChoiceElement.innerHTML = userChoice;
	generateComputerChoice();
	getResult();
};

possibleChoices.forEach((possibleChoice) => {
	possibleChoice.addEventListener('click', renderResult);
});
