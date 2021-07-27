const { createHabit } = require('./dom_elements');

function toggleNav() {}

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

module.exports = { toggleNav, addNewHabitToDOM, updateHabitDescription };
