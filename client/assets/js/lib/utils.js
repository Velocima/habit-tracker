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
	const habits = document.querySelector('.habits-container');
	const habit = createHabit(data);
	habits.insertBefore(habit, habits.firstChild);
	return habit;
}

module.exports = { toggleNav, addNewHabitToDOM };
