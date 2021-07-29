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

function addNameToDashboard() {
	const welcomeMessage = document.getElementById('welcome');
	welcomeMessage.textContent = `Welcome, ${localStorage.getItem('name')}`;
}

function addNameToProfileInput() {
	const name = localStorage.getItem('name');
	const nameInput = document.getElementById('name');
	nameInput.setAttribute('value', name);
}

function validateUser() {
	const path = window.location.pathname;
	const name = localStorage.getItem('name');
	const email = localStorage.getItem('email');
	const token = localStorage.getItem('token');

	if ((path === '/' || path === '/index.html') && (!name || !email || !token)) {
		return;
	}
	if (!name || !email || !token) {
		localStorage.clear();
		window.location.pathname = '/';
		return;
	}
	//validate token
	if ((path === '/' || path === '/index.html') && name && email && token) {
		window.location.pathname = '/dashboard.html';
	}
}

module.exports = {
	toggleNav,
	addNewHabitToDOM,
	addNameToDashboard,
	addNameToProfileInput,
	validateUser,
};
