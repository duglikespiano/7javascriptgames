const gridParent = document.querySelector('.grid.boxes');
const boxElements = document.querySelectorAll('.boxes__box');
const scoreElement = document.querySelector('.score span');
const lefttimeElement = document.querySelector('.time span');
const startButton = document.querySelector('.start-button');

let score = 0;
let timeLimit = 30;
let updateMoleInterval = 300;
let updateTimeInterval;
let updateMoleIndexInterval;

scoreElement.innerText = score;
lefttimeElement.innerText = timeLimit;

gridParent.addEventListener('click', (event) => {
	if (event.target.matches('#mole')) {
		score++;
		scoreElement.innerText = score;
	}
});

startButton.addEventListener('click', () => {
	updateMoleIndexInterval = setInterval(() => {
		boxElements.forEach((box) => {
			box.removeAttribute('id');
		});
		const moleBoxIndex = Math.floor(Math.random() * boxElements.length);
		boxElements[moleBoxIndex].setAttribute('id', 'mole');
	}, updateMoleInterval);

	updateTimeInterval = setInterval(() => {
		timeLimit--;
		lefttimeElement.innerText = timeLimit;
		if (timeLimit === 0) {
			clearInterval(updateTimeInterval);
			clearInterval(updateMoleIndexInterval);
			setTimeout(() => {
				alert(`Your score is ${score}!`);
			}, 100);
		}
	}, 1000);
});
