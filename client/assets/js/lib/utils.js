const { createHabit } = require('./dom_elements');

function toggleNav() {
	const nav = document.querySelector('nav');
	if (nav.classList.contains('hide-nav')) {
		nav.classList.remove('hide-nav');
	} else {
		nav.classList.add('hide-nav');
	}
	console.log('toggling');
}

function addNewHabitToDOM(data) {
	const habits = document.querySelector('.habits-container');
	const habit = createHabit(data);
	habits.insertBefore(habit, habits.firstChild);
	return habit;
}

function addNameToDashboard() {
	const welcomeMessage = document.getElementById('welcome');
	welcomeMessage.textContent = `Welcome, ${localStorage.getItem('name')}`;
}

function addNameToProfileInput() {
	const name = localStorage.getItem('name');
	const nameInput = document.getElementById('name');
	nameInput.setAttribute('value', name);
}

// function bringUpEditModal(data) {
// 	//Note this function does not work as it should atm..!
// 	document.getElementById('submit-habit').remove();
// 	const submitButton = document.createElement('input');
// 	submitButton.setAttribute('type', 'submit');
// 	submitButton.setAttribute('value', 'Submit');
// 	submitButton.addEventListener('Submit', () => {
// 		// make edit request here
// 		const data = Object.fromEntries(new FormData(e.target));
// 		console.log(data);
// 		window.location.pathname = '/dashboard.html';
// 	});

// 	const habitModal = document.querySelector('.habit-modal');
// 	habitModal.removeAttribute('style');

// 	const form = document.querySelector('form');
// 	form.append(submitButton);

// 	const name = document.getElementById('name');
// 	name.setAttribute('value', data.habitName);

// 	const frequency = document.getElementById('frequency');
// 	frequency.setAttribute('value', data.frequency);

// 	const goal = document.getElementById('goal');
// 	goal.setAttribute('value', data.frequencyTarget);

// 	const modal = document.querySelector('.habit-modal');
// 	modal.classList.remove('hidden');
// }

module.exports = {
	toggleNav,
	addNewHabitToDOM,
	addNameToDashboard,
	addNameToProfileInput,
};
