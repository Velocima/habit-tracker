const { createHabit } = require('./dom_elements');

function toggleNav() {
	const nav = document.querySelector('nav');
	if (nav.classList.contains('hide-nav')) {
		nav.classList.remove('hide-nav');
	} else {
		nav.classList.add('hide-nav');
	}
}

function addNewHabitToDOM(data) {
	const habits = document.querySelector('habits');
	const habit = createHabit(data);
	habits.insertBefore(habit, habits.firstChild);
}

function updateHabitDescription() {
	const form = document.querySelector('form');
	const description = document.querySelector('.description');

	const name = form.name.value || '*habit*';
	const goal = form.goal.value || '*goal*';

	description.innerText = `I am going to ${name} ${goal} times per day`;
}

function addDailyCountField(eventHandler) {
	const form = document.querySelector('form');

	if (form.occurences) return;

	const dailyCountLabel = document.createElement('label');
	dailyCountLabel.setAttribute('for', 'occurences');
	dailyCountLabel.innerText = 'Times per day:';

	const dailyCountInput = document.createElement('input');
	dailyCountInput.setAttribute('name', 'occurences');
	dailyCountInput.setAttribute('id', 'occurences');
	dailyCountInput.setAttribute('type', 'number');
	dailyCountInput.setAttribute('min', 1);
	dailyCountInput.setAttribute('max', 30);
	dailyCountInput.setAttribute('placeholder', 'How many times?');
	dailyCountInput.setAttribute('required', true);

	dailyCountInput.addEventListener('keyup', eventHandler);
	dailyCountInput.addEventListener('change', eventHandler);

	form.insertBefore(dailyCountInput, form.childNodes[13]);
	form.insertBefore(dailyCountLabel, form.childNodes[13]);
}

module.exports = { toggleNav, addNewHabitToDOM, updateHabitDescription, addDailyCountField };
