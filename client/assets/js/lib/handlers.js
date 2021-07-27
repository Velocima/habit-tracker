const { onLoginButtonClick, onRegistrationButtonClick } = require('./event_handlers/index');
const { onChangePasswordSumbit, onUpdateUserInfoSumbit } = require('./event_handlers/profile');
const { onAddHabitButtonClick, onAddHabitSumbit } = require('./event_handlers/dashboard');
const { createHabit } = require('./dom_elements');
const { getAllUserHabits } = require('./requests');

function bindIndexListeners() {
	const loginButton = document.querySelector('.login');
	loginButton.addEventListener('click', onLoginButtonClick);

	const registrationButton = document.querySelector('.register');
	registrationButton.addEventListener('click', onRegistrationButtonClick);
}

function bindDashboardListeners() {
	const addHabbitButtons = document.querySelectorAll('.add-habit');
	addHabbitButtons.forEach((button) => button.addEventListener('click', onAddHabitButtonClick));
	const addHabitForm = document.querySelector('form');
	addHabitForm.addEventListener('submit', onAddHabitSumbit);
}

function bindProfileListeners() {
	const changeUserInfoSubmitButton = document.getElementById('user-info-form');
	changeUserInfoSubmitButton.addEventListener('submit', onUpdateUserInfoSumbit);

	const changePasswordSubmitButton = document.getElementById('change-password-form');
	changePasswordSubmitButton.addEventListener('submit', onChangePasswordSumbit);
}

function renderHabits() {
	const main = document.querySelector('main');
	const userHabitData = getAllUserHabits(localStorage.getItem('email'));
	let habitSections = userHabitData.map((habit) => createHabit(habit));
	habitSections.forEach((habit) => main.append(habit));
}

function initPageBindings() {
	const path = window.location.pathname;
	if (path === '/') {
		bindIndexListeners();
	} else if (path === '/dashboard.html') {
		bindDashboardListeners();
	} else if (path === '/profile.html') {
		bindProfileListeners();
	}
}

module.exports = initPageBindings;
