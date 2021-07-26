const { onLoginButtonClick, onRegistrationButtonClick } = require('./event_handlers/index');

function bindIndexListeners() {
	const loginButton = document.querySelector('.login');
	loginButton.addEventListener('click', onLoginButtonClick);

	const registrationButton = document.querySelector('.register');
	registrationButton.addEventListener('click', onRegistrationButtonClick);
}

function bindDashboardListeners() {}

function bindProfileListeners() {}

function renderHabits() {}

function initPageBindings() {
	const path = window.location.pathname;

	if (path === '/') {
		bindIndexListeners();
	} else if (path === '/dashboard') {
		bindDashboardListeners();
	} else if (path === '/profile') {
		bindProfileListeners();
	}
}

module.exports = initPageBindings;
