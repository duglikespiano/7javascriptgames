const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logLefts = document.querySelectorAll('.log-left');
const logRights = document.querySelectorAll('.log-right');
const carLefts = document.querySelectorAll('.car-left');
const carRights = document.querySelectorAll('.car-right');
const cellsOnGridRow = 9;
let timerId;
let outcomeTimerId;
let currentIndex = 76;
let currentTime = 20;

function moveFrog(e) {
	squares[currentIndex].classList.remove('frog');

	switch (e.key) {
		case 'ArrowLeft':
			if (currentIndex % cellsOnGridRow !== 0) currentIndex -= 1;
			break;
		case 'ArrowRight':
			if (currentIndex % cellsOnGridRow < cellsOnGridRow - 1) currentIndex += 1;
			break;
		case 'ArrowUp':
			if (currentIndex - cellsOnGridRow >= 0) currentIndex -= cellsOnGridRow;
			break;
		case 'ArrowDown':
			if (currentIndex + cellsOnGridRow < cellsOnGridRow * cellsOnGridRow) currentIndex += cellsOnGridRow;
			break;
	}
	squares[currentIndex].classList.add('frog');
}

function autoMoveElements() {
	currentTime--;
	timeLeftDisplay.textContent = currentTime;
	logLefts.forEach((log) => moveLogsLeft(log));
	logRights.forEach((log) => moveLogsRight(log));
	carLefts.forEach((car) => moveCarsLeft(car));
	carRights.forEach((car) => moveCarsRight(car));
	lose();
	win();
}

function moveLogsLeft(log) {
	switch (true) {
		case log.classList.contains('l1'):
			log.classList.remove('l1');
			log.classList.add('l2');
			break;
		case log.classList.contains('l2'):
			log.classList.remove('l2');
			log.classList.add('l3');
			break;
		case log.classList.contains('l3'):
			log.classList.remove('l3');
			log.classList.add('l4');
			break;
		case log.classList.contains('l4'):
			log.classList.remove('l4');
			log.classList.add('l5');
			break;
		case log.classList.contains('l5'):
			log.classList.remove('l5');
			log.classList.add('l1');
			break;
	}
}

function moveLogsRight(log) {
	switch (true) {
		case log.classList.contains('l1'):
			log.classList.remove('l1');
			log.classList.add('l5');
			break;
		case log.classList.contains('l2'):
			log.classList.remove('l2');
			log.classList.add('l1');
			break;
		case log.classList.contains('l3'):
			log.classList.remove('l3');
			log.classList.add('l2');
			break;
		case log.classList.contains('l4'):
			log.classList.remove('l4');
			log.classList.add('l3');
			break;
		case log.classList.contains('l5'):
			log.classList.remove('l5');
			log.classList.add('l4');
			break;
	}
}

function moveCarsLeft(car) {
	switch (true) {
		case car.classList.contains('c1'):
			car.classList.remove('c1');
			car.classList.add('c2');
			break;
		case car.classList.contains('c2'):
			car.classList.remove('c2');
			car.classList.add('c3');
			break;
		case car.classList.contains('c3'):
			car.classList.remove('c3');
			car.classList.add('c4');
			break;
		case car.classList.contains('c4'):
			car.classList.remove('c4');
			car.classList.add('c5');
			break;
		case car.classList.contains('c5'):
			car.classList.remove('c5');
			car.classList.add('c1');
			break;
	}
}

function moveCarsRight(car) {
	switch (true) {
		case car.classList.contains('c1'):
			car.classList.remove('c1');
			car.classList.add('c5');
			break;
		case car.classList.contains('c2'):
			car.classList.remove('c2');
			car.classList.add('c1');
			break;
		case car.classList.contains('c3'):
			car.classList.remove('c3');
			car.classList.add('c2');
			break;
		case car.classList.contains('c4'):
			car.classList.remove('c4');
			car.classList.add('c3');
			break;
		case car.classList.contains('c5'):
			car.classList.remove('c5');
			car.classList.add('c4');
			break;
	}
}

function lose() {
	if (
		squares[currentIndex].classList.contains('c1') ||
		squares[currentIndex].classList.contains('l4') ||
		squares[currentIndex].classList.contains('l5')
	) {
		resultDisplay.textContent = 'You lose!';
		clearInterval(timerId);
		clearInterval(outcomeTimerId);
		squares[currentIndex].classList.remove('frog');
		document.removeEventListener('keyup', moveFrog);
	}
}

function win() {
	if (squares[currentIndex].classList.contains('ending-block')) {
		resultDisplay.textContent = 'You won!';
		clearInterval(timerId);
		document.removeEventListener('keyup', moveFrog);
	}
}

function checkOutComes() {
	lose();
	win();
}

startPauseButton.addEventListener('click', () => {
	if (timerId) {
		clearInterval(timerId);
		clearInterval(outcomeTimerId);
		outcomeTimerId = null;
		timerId = null;
		document.removeEventListener('keyup', moveFrog);
	} else {
		timerId = setInterval(autoMoveElements, 1000);
		outcomeTimerId = setInterval(checkOutComes, 50);
		document.addEventListener('keyup', moveFrog);
	}
});
document.addEventListener('keyup', moveFrog);
timerId = setInterval(autoMoveElements, 1000);
