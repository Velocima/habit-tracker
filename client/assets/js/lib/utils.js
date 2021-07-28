const { createHabit } = require('./dom_elements');

function toggleNav() {}

function addNewHabitToDOM(data) {
	const habits = document.querySelector('habits');
	const habit = createHabit(data);
	habits.insertBefore(habit, habits.firstChild);
}

module.exports = { toggleNav, addNewHabitToDOM };
