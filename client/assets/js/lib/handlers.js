const { onLoginButtonClick, onRegistrationButtonClick } = require('./event_handlers/index');
const { onChangePasswordSumbit, onUpdateUserInfoSumbit } = require('./event_handlers/profile');
const {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onClickViewHabit,
	onAddHabitFormChange,
	onFrequencyChange,
	closeModal,
} = require('./event_handlers/dashboard');
const { createHabit } = require('./dom_elements');
const { getAllUserHabits } = require('./requests');
const { toggleNav, addNameToDashboard, addNameToProfileInput, validateUser } = require('./utils');
const { logout } = require('./auth');

function bindIndexListeners() {
	const loginButton = document.querySelector('.login');
	loginButton.addEventListener('click', onLoginButtonClick);

	const registrationButton = document.querySelector('.register');
	registrationButton.addEventListener('click', onRegistrationButtonClick);
}

function bindDashboardListeners() {
	const addHabitButtons = document.querySelector('.add-habit');
	addHabitButtons.addEventListener('click', onAddHabitButtonClick);
	const addHabitForm = document.querySelector('form');
	addHabitForm.addEventListener('submit', onAddHabitSumbit);

	const viewHabitButtons = document.querySelectorAll('.view-button');
	viewHabitButtons.forEach((button) => button.addEventListener('click', onClickViewHabit));

	const closeButton = document.querySelector('.close-modal');
	closeButton.addEventListener('click', closeModal);

	const addHabitFormFields = document.querySelectorAll('input, textarea, select');
	addHabitFormFields.forEach((field) => {
		field.addEventListener('keyup', onAddHabitFormChange);
		field.addEventListener('change', onAddHabitFormChange);
	});

	const habitFrequency = document.getElementById('frequency');
	habitFrequency.addEventListener('change', onFrequencyChange);
}

function bindNavListeners() {
	const closeNavButton = document.querySelector('.close-btn');
	const openNavButton = document.querySelector('.menu-btn');
	closeNavButton.addEventListener('click', toggleNav);
	openNavButton.addEventListener('click', toggleNav);

	const navAddHabitButton = document.getElementById('nav-add-habit');
	navAddHabitButton.addEventListener('click', onAddHabitButtonClick);

	const logoutButton = document.querySelector('.logout');
	logoutButton.addEventListener('click', logout);
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
	if (userHabitData && userHabitData.length > 0) {
		userHabitData.reverse();
		let habitSections = userHabitData.map((habit) => createHabit(habit));
		habitSections.forEach((habit) => habitsContainer.append(habit));
	}
}

function openHabitModalFromProfile() {
	const isAddHabit = localStorage.getItem('add-habit');
	if (isAddHabit === 'true') {
		onAddHabitButtonClick();
		localStorage.removeItem('add-habit');
	}
}

async function initPageBindings() {
	validateUser();
	const path = window.location.pathname;
	if (path === '/' || path === '/index.html') {
		bindIndexListeners();
	} else if (path === '/dashboard.html') {
		await renderHabits();
		addNameToDashboard();
		bindDashboardListeners();
		bindNavListeners();
		openHabitModalFromProfile();
	} else if (path === '/profile.html') {
		bindProfileListeners();
		addNameToProfileInput();
		bindNavListeners();
	}
}

module.exports = { initPageBindings, renderHabits };
