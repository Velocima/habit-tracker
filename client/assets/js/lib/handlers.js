const { onLoginButtonClick, onRegistrationButtonClick } = require('./event_handlers/index');
const { onAddHabitButtonClick } = require('./event_handlers/dashboard');

function bindIndexListeners() {
	const loginButton = document.querySelector('.login');
	loginButton.addEventListener('click', onLoginButtonClick);

	const registrationButton = document.querySelector('.register');
	registrationButton.addEventListener('click', onRegistrationButtonClick);
}

function bindDashboardListeners() {
	const addHabbitButtons = document.querySelectorAll('.add-habit');
	addHabbitButtons.forEach((button) => button.addEventListener('click', onAddHabitButtonClick));
}

function bindProfileListeners() {}

function renderHabits() {}

function initPageBindings() {
	const path = window.location.pathname;

	if (path === '/') {
		bindIndexListeners();
	} else if (path === '/dashboard.html') {
		bindDashboardListeners();
	} else if (path === '/profile') {
		bindProfileListeners();
	}
}

module.exports = initPageBindings;
