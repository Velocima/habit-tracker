const { onLoginButtonClick, onRegistrationButtonClick } = require('./event_handlers/index');
const { onChangePasswordSumbit, onUpdateUserInfoSumbit } = require('./event_handlers/profile');
const {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onClickViewHabit,
	onAddHabitFormChange,
	onFrequencyChange,
} = require('./event_handlers/dashboard');
const { createHabit } = require('./dom_elements');
const { getAllUserHabits } = require('./requests');

function bindIndexListeners() {
	const loginButton = document.querySelector('.login');
	loginButton.addEventListener('click', onLoginButtonClick);

	const registrationButton = document.querySelector('.register');
	registrationButton.addEventListener('click', onRegistrationButtonClick);
}

function bindDashboardListeners() {
	const addHabitButtons = document.querySelectorAll('.add-habit');
	addHabitButtons.forEach((button) => button.addEventListener('click', onAddHabitButtonClick));
	const addHabitForm = document.querySelector('form');
	addHabitForm.addEventListener('submit', onAddHabitSumbit);

	const viewHabitButtons = document.querySelectorAll('.view-button');
	viewHabitButtons.forEach((button) => button.addEventListener('click', onClickViewHabit));

	const addHabitFormFields = document.querySelectorAll('input, textarea, select');
	addHabitFormFields.forEach((field) => {
		field.addEventListener('keyup', onAddHabitFormChange);
		field.addEventListener('change', onAddHabitFormChange);
	});

	const habitFrequency = document.getElementById('frequency');
	habitFrequency.addEventListener('change', onFrequencyChange);
}

function bindProfileListeners() {
	const changeUserInfoSubmitButton = document.getElementById('user-info-form');
	changeUserInfoSubmitButton.addEventListener('submit', onUpdateUserInfoSumbit);

	const changePasswordSubmitButton = document.getElementById('change-password-form');
	changePasswordSubmitButton.addEventListener('submit', onChangePasswordSumbit);
}

async function renderHabits() {
	const habitsContainer = document.querySelector('.habits-container');
	const userHabitData = await getAllUserHabits(localStorage.getItem('email'));
	userHabitData.reverse();
	let habitSections = userHabitData.map((habit) => createHabit(habit));
	habitSections.forEach((habit) => habitsContainer.append(habit));
}

async function initPageBindings() {
	const path = window.location.pathname;
	if (path === '/') {
		bindIndexListeners();
	} else if (path === '/dashboard.html') {
		await renderHabits();
		bindDashboardListeners();
	} else if (path === '/profile.html') {
		bindProfileListeners();
	}
}

module.exports = { initPageBindings, renderHabits };
