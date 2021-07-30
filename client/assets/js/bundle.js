(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { initPageBindings } = require('./lib/handlers');

document.addEventListener('DOMContentLoaded', initPageBindings);

},{"./lib/handlers":7}],2:[function(require,module,exports){
const jwt_decode = require('jwt-decode');


const URL = window.location.hostname.includes('localhost')
	? 'http://localhost:3000'
	: 'https://habitude-app.herokuapp.com';

async function requestLogin(data) {
	try {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};

		const response = await fetch(`${URL}/auth/login`, options);

		const responseJson = await response.json();
		if (!responseJson.success) {
			throw new Error('Login not authorised');
		}
		login(responseJson.token);
	} catch (err) {
		window.alert(err.message);
		console.warn(err);
	}
}

async function requestRegistration(data) {
	try {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};
		const response = await fetch(`${URL}/auth/register`, options);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		requestLogin(data);
	} catch (err) {
		if (err.message === 'Not Found') {
			window.alert('Account with this email already exists.');
		}
		console.warn(err);
	}
}

function login(token) {
	const user = jwt_decode(token);
	localStorage.setItem('token', token);
	localStorage.setItem('name', user.name);
	localStorage.setItem('email', user.email);
	window.location.pathname = '/dashboard.html';
}

function logout() {
	localStorage.clear();
	window.location.pathname = '/';
}

module.exports = { requestLogin, requestRegistration, login, logout };

},{"jwt-decode":10}],3:[function(require,module,exports){
const {
	deleteHabit,
	postCompletion,
	deleteCompletion,
	getLastestCompletionId,
	getHabitData,
} = require('./requests');

function createLoginForm() {
	const form = document.createElement('form');

	const emailLabel = document.createElement('label');
	emailLabel.setAttribute('for', 'email');
	// emailLabel.innerText = 'Email';

	const emailInput = document.createElement('input');
	emailInput.setAttribute('name', 'email');
	emailInput.setAttribute('id', 'email');
	emailInput.setAttribute('type', 'email');
	emailInput.setAttribute('placeholder', 'Email');
	emailInput.setAttribute('required', true);

	form.append(emailLabel);
	form.append(emailInput);

	const passwordLabel = document.createElement('label');
	passwordLabel.setAttribute('for', 'password');
	// passwordLabel.innerText = 'Password';

	const passwordInput = document.createElement('input');
	passwordInput.setAttribute('name', 'password');
	passwordInput.setAttribute('id', 'password');
	passwordInput.setAttribute('type', 'password');
	passwordInput.setAttribute('placeholder', 'Password');
	passwordInput.setAttribute('required', true);

	form.append(passwordLabel);
	form.append(passwordInput);

	const loginButton = document.createElement('input');
	loginButton.setAttribute('type', 'submit');
	loginButton.setAttribute('value', 'Login');

	form.append(loginButton);

	const hasNoAccount = document.createElement('p');
	hasNoAccount.innerText = "Don't have an account?";
	form.append(hasNoAccount);

	return form;
}

function createRegistrationForm() {
	const form = document.createElement('form');

	const nameLabel = document.createElement('label');
	nameLabel.setAttribute('for', 'name');
	// nameLabel.innerText = 'Name';

	const nameInput = document.createElement('input');
	nameInput.setAttribute('name', 'name');
	nameInput.setAttribute('id', 'name');
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('placeholder', 'Name');
	nameInput.setAttribute('required', true);

	form.append(nameLabel);
	form.append(nameInput);

	const emailLabel = document.createElement('label');
	emailLabel.setAttribute('for', 'email');
	// emailLabel.innerText = 'Email';

	const emailInput = document.createElement('input');
	emailInput.setAttribute('name', 'email');
	emailInput.setAttribute('id', 'email');
	emailInput.setAttribute('type', 'email');
	emailInput.setAttribute('placeholder', 'Email');
	emailInput.setAttribute('required', true);

	form.append(emailLabel);
	form.append(emailInput);

	const passwordLabel = document.createElement('label');
	passwordLabel.setAttribute('for', 'password');
	// passwordLabel.innerText = 'Password';

	const passwordInput = document.createElement('input');
	passwordInput.setAttribute('name', 'password');
	passwordInput.setAttribute('id', 'password');
	passwordInput.setAttribute('type', 'password');
	passwordInput.setAttribute('placeholder', 'Password');
	passwordInput.setAttribute('required', true);

	form.append(passwordLabel);
	form.append(passwordInput);

	const registerButton = document.createElement('input');
	registerButton.setAttribute('type', 'submit');
	registerButton.setAttribute('value', 'Register');

	form.append(registerButton);

	const hasAccount = document.createElement('p');
	hasAccount.innerText = 'Already have an account?';
	form.append(hasAccount);

	return form;
}

function createHabit(data) {
	const div = document.createElement('div');
	div.setAttribute('class', 'habit-card');

	const habitTitle = document.createElement('h2');
	habitTitle.textContent = data.habitName;

	const viewButton = document.createElement('button');
	viewButton.textContent = 'View';
	viewButton.setAttribute('id', data.id);
	viewButton.setAttribute('class', 'view-button');

	div.append(habitTitle);
	div.append(viewButton);

	return div;
}

function createViewHabit(data) {
	const section = document.createElement('div');
	section.setAttribute('class', 'habit-view-container');

	const goHomeButton = document.createElement('button');
	goHomeButton.setAttribute('class', 'return');
	goHomeButton.textContent = '⇚';
	// can change this to be more elegant
	goHomeButton.addEventListener('click', () => {
		const main = document.querySelector('main');
		const viewContainer = document.getElementById('habit-view');
		const habitsModal = document.querySelector('.habit-modal');

		//hide the current page content, other than nav
		main.removeAttribute('style');
		habitsModal.removeAttribute('style');
		viewContainer.textContent = '';
	});

	const markAsComplete = document.createElement('button');
	markAsComplete.textContent = 'Mark as complete';
	markAsComplete.addEventListener('click', async () => {
		const response = await postCompletion(data.id);
		onUpdateCompletion(data.id);
	});

	const removeCompletion = document.createElement('button');
	removeCompletion.textContent = 'Remove completion';
	removeCompletion.addEventListener('click', async () => {
		const completions = document.querySelectorAll('.habit-instance-complete').length;
		if (completions === 0) {
			return;
		}
		const id = await getLastestCompletionId(data.id);
		const response = await deleteCompletion(data.id, id);
		onUpdateCompletion(data.id);
	});

	const habitTitle = document.createElement('h1');
	habitTitle.textContent = data.habitName;

	const streaksContainer = document.createElement('div');
	streaksContainer.setAttribute('class', 'streaks-container');

	const currentStreak = document.createElement('p');
	currentStreak.textContent = 'Current streak';
	const bestStreak = document.createElement('p');
	bestStreak.textContent = 'Best streak';
	const bestStreakSpan = document.createElement('span');
	bestStreakSpan.textContent = data.bestStreak;
	const currentStreakSpan = document.createElement('span');
	currentStreakSpan.textContent = data.currentStreak;

	streaksContainer.append(currentStreak);
	streaksContainer.append(bestStreak);
	streaksContainer.append(currentStreakSpan);
	streaksContainer.append(bestStreakSpan);

	const description = document.createElement('p');
	description.textContent = data.description;

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', async () => {
		const response = await deleteHabit(data.id);
		window.location.pathname = '/dashboard.html';
	});

	const infographicContainer = document.createElement('div');
	infographicContainer.setAttribute('class', 'infographic-container');

	for (let i = 0; i < data.frequencyTarget; i++) {
		const div = document.createElement('div');
		if (data.currentCompletions > i) {
			div.setAttribute('class', 'habit-instance-complete');
		}
		infographicContainer.append(div);
	}

	const infographicTitle = document.createElement('h2');
	infographicTitle.innerText = 'Progress';

	section.append(goHomeButton);
	section.append(habitTitle);
	section.append(description);
	section.append(markAsComplete);
	section.append(removeCompletion);
	section.append(infographicTitle);
	section.append(infographicContainer);
	section.append(streaksContainer);
	section.append(deleteButton);

	return section;
}

async function onUpdateCompletion(id) {
	try {
		const { habit } = await getHabitData(id);
		const infographicContainer = document.querySelector('.infographic-container');
		const streaksContainer = document.querySelector('.streaks-container');
		infographicContainer.textContent = '';
		streaksContainer.textContent = '';

		const currentStreak = document.createElement('p');
		currentStreak.textContent = 'Current streak';
		const bestStreak = document.createElement('p');
		bestStreak.textContent = 'Best streak';
		const bestStreakSpan = document.createElement('span');
		bestStreakSpan.textContent = habit.bestStreak;
		const currentStreakSpan = document.createElement('span');
		currentStreakSpan.textContent = habit.currentStreak;

		streaksContainer.append(currentStreak);
		streaksContainer.append(bestStreak);
		streaksContainer.append(currentStreakSpan);
		streaksContainer.append(bestStreakSpan);

		for (let i = 0; i < habit.frequencyTarget; i++) {
			const div = document.createElement('div');
			if (habit.currentCompletions > i) {
				div.setAttribute('class', 'habit-instance-complete');
			}
			infographicContainer.append(div);
		}
	} catch (err) {
		console.warn(err);
	}
}

module.exports = { createLoginForm, createRegistrationForm, createHabit, createViewHabit };

},{"./requests":8}],4:[function(require,module,exports){
const { createViewHabit } = require('../dom_elements');
const { postHabit, getHabitData } = require('../requests');
const { addNewHabitToDOM } = require('../utils');

function onAddHabitButtonClick(e) {
	if (window.location.pathname !== '/dashboard.html') {
		localStorage.setItem('add-habit', 'true');
		window.location.pathname = '/dashboard.html';
	}
	const nav = document.querySelector('nav');
	if (!nav.classList.contains('hide-nav')) {
		nav.classList.add('hide-nav');
	}

	const modal = document.querySelector('.habit-modal');
	modal.classList.remove('hidden');
}

async function onAddHabitSumbit(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target));
	const description = document.querySelector('.description').textContent;
	const submitData = { ...data, description };
	const newHabit = await postHabit(submitData);
	if (!newHabit.err) {
		const form = document.querySelector('form');
		form.reset();
		const modal = document.querySelector('.habit-modal');
		modal.classList.add('hidden');
		const habitElement = addNewHabitToDOM(newHabit);
		habitElement.querySelector('button').addEventListener('click', onClickViewHabit);
	} else {
		console.log(newHabit);
		// add error handling
	}
}

function onFrequencyChange(e) {
	const goal = document.getElementById('goal');
	if (e.target.value === 'hourly') {
		goal.setAttribute('max', 10);
	} else if (e.target.value === 'daily') {
		goal.setAttribute('max', 7);
	} else if (e.target.value === 'weekly') {
		goal.setAttribute('max', 4);
	}
}

function onAddHabitFormChange(e) {
	const form = document.querySelector('form');
	const description = document.querySelector('.description');

	const name = form.name.value || '*habit*';
	const goal = form.goal.value || '*goal*';
	const plurality = form.goal.value === '1' ? '' : 's';
	const frequency =
		form.frequency.value === 'hourly' ? 'day' : form.frequency.value === 'daily' ? 'week' : 'month';

	description.innerText = `I am going to ${name} ${goal} time${plurality} per ${frequency}`;
}

async function onClickViewHabit(e) {
	e.preventDefault();
	const main = document.querySelector('main');
	const viewContainer = document.getElementById('habit-view');
	const habitsModal = document.querySelector('.habit-modal');

	//hide the current page content, other than nav
	main.setAttribute('style', 'display:none');
	habitsModal.setAttribute('style', 'display:none');
	viewContainer.setAttribute('style', 'display:block');

	//create a new request function that retreives all info for this users habit, and call this here
	const data = await getHabitData(e.target.id);
	const habitSection = createViewHabit(data.habit);
	viewContainer.append(habitSection);
}

function closeModal() {
	const modal = document.querySelector('.habit-modal');
	modal.classList.add('hidden');
}

module.exports = {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onFrequencyChange,
	onAddHabitFormChange,
	onClickViewHabit,
	closeModal,
};

},{"../dom_elements":3,"../requests":8,"../utils":9}],5:[function(require,module,exports){
const { createLoginForm, createRegistrationForm } = require('../dom_elements');
const { requestLogin, requestRegistration } = require('../auth');
const body = document.querySelector('body');
const loginButton = document.querySelector('.login');
const registerButton = document.querySelector('.register');

function onLoginButtonClick(e) {
	const form = createLoginForm();
	form.addEventListener('submit', onLoginSumbit);

	const registerForm = document.querySelector('form');
	if (registerForm) {
		body.removeChild(registerForm);
		registerButton.classList.remove('hidden');
	}

	const slogan = document.querySelector('p');
	if (slogan) {
		body.removeChild(slogan);
	}
	body.insertBefore(form, loginButton);
	loginButton.classList.add('hidden');
}

function onRegistrationButtonClick(e) {
	const form = createRegistrationForm();
	form.addEventListener('submit', onRegistrationSumbit);

	const loginForm = document.querySelector('form');
	if (loginForm) {
		body.removeChild(loginForm);
		loginButton.classList.remove('hidden');
	}

	const slogan = document.querySelector('p');
	if (slogan) {
		body.removeChild(slogan);
	}
	body.insertBefore(form, loginButton);
	registerButton.classList.add('hidden');
}

function onRegistrationSumbit(e) {
	e.preventDefault();
	let data = Object.fromEntries(new FormData(e.target));
	requestRegistration(data);
}

function onLoginSumbit(e) {
	e.preventDefault();
	let data = Object.fromEntries(new FormData(e.target));
	requestLogin(data);
}

module.exports = {
	onLoginButtonClick,
	onRegistrationButtonClick,
	onRegistrationSumbit,
	onLoginSumbit,
};

},{"../auth":2,"../dom_elements":3}],6:[function(require,module,exports){
const { putUserInfo, changePassword } = require('../requests');

async function onChangePasswordSumbit(e) {
	e.preventDefault();
	try {
		const formData = Object.fromEntries(new FormData(e.target));
		if (formData['new-password'] !== formData['confirm-password']) {
			window.alert('Your passwords do not match, please try again.');
			return;
		}
		let response = await changePassword(formData);
		if (response.err) {
			throw new Error(response.err.message);
		}
		window.location.pathname = '/dashboard.html';
	} catch (error) {
		window.alert('Could not change password - current password incorrect');
		console.warn(error);
	}
}

async function onUpdateUserInfoSumbit(e) {
	e.preventDefault();
	try {
		const formData = Object.fromEntries(new FormData(e.target));
		if (formData.name === localStorage.getItem('name')) {
			window.alert('Must provide a different name to update.');
			return;
		}
		const response = await putUserInfo(formData);
		if (response.err) {
			throw new Error(response.err.message);
		} else {
			window.location.pathname = '/dashboard.html';
		}
	} catch (error) {
		console.warn(error);
	}
}

module.exports = { onChangePasswordSumbit, onUpdateUserInfoSumbit };

},{"../requests":8}],7:[function(require,module,exports){
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
	if (userHabitData.length > 0) {
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

},{"./auth":2,"./dom_elements":3,"./event_handlers/dashboard":4,"./event_handlers/index":5,"./event_handlers/profile":6,"./requests":8,"./utils":9}],8:[function(require,module,exports){
const { logout } = require('./auth');

const devURL = window.location.hostname.includes('localhost')
	? 'http://localhost:3000'
	: 'https://habitude-app.herokuapp.com';

async function getAllUserHabits(email) {
	try {
		const options = { headers: new Headers({ Authorization: localStorage.getItem('token') }) };
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits`;
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			// logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function getHabitData(id) {
	try {
		const options = { headers: new Headers({ Authorization: localStorage.getItem('token') }) };
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits/${id}`;
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			// logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function postHabit(data) {
	try {
		const options = {
			method: 'POST',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits`;
		const response = await fetch(url, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw new Error(err);
		}
		return responseJson;
	} catch (err) {
		console.warn(err);
	}
}

async function deleteHabit(id) {
	try {
		const options = {
			method: 'DELETE',
			headers: new Headers({ Authorization: localStorage.getItem('token') }),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(`${devURL}/user/${email}/habits/${id}`, options);
		if (response.err) {
			throw Error(err);
		}
	} catch (err) {
		console.warn(err);
	}
}

async function putHabit(data) {
	try {
		const options = {
			method: 'PUT',
			headers: new Headers({ Authorization: localStorage.getItem('token') }),
			body: JSON.stringify(data),
		};
		const response = await fetch(`${devURL}/habits/${data.id}`, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(err);
		} else {
			// redirect to the dashboard
			console.log(responseJson);
		}
	} catch (err) {
		console.warn(err);
	}
}

async function putUserInfo(data) {
	try {
		const options = {
			method: 'PATCH',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(`${devURL}/user/${email}`, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(responseJson.err);
		} else {
			localStorage.setItem('name', responseJson.name);
			return responseJson;
		}
	} catch (err) {
		console.warn(err);
	}
}

async function changePassword(data) {
	try {
		const options = {
			method: 'PATCH',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(`${devURL}/auth/${email}/password`, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(err);
		} else {
			return responseJson;
		}
	} catch (err) {
		console.warn(err);
	}
}

async function postCompletion(id) {
	try {
		const options = {
			method: 'POST',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
		};
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits/${id}/complete`;
		const response = await fetch(url, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw new Error(err);
		}
		return responseJson;
	} catch (err) {
		console.warn(err);
	}
}

async function deleteCompletion(id, completionId) {
	try {
		const options = {
			method: 'DELETE',
			headers: new Headers({ Authorization: localStorage.getItem('token') }),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(
			`${devURL}/user/${email}/habits/${id}/complete/${completionId}`,
			options
		);
		if (response.err) {
			throw Error(err);
		}
	} catch (err) {
		console.warn(err);
	}
}

async function getLastestCompletionId(id) {
	try {
		const { habit } = await getHabitData(id);
		return habit.completionDates[habit.completionDates.length - 1].id;
	} catch (err) {
		console.warn(err);
	}
}

module.exports = {
	getAllUserHabits,
	getHabitData,
	postHabit,
	deleteHabit,
	putHabit,
	putUserInfo,
	postCompletion,
	deleteCompletion,
	changePassword,
	getLastestCompletionId,
};

},{"./auth":2}],9:[function(require,module,exports){
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

},{"./dom_elements":3}],10:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1]);
