(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { initPageBindings } = require('./lib/handlers');

document.addEventListener('DOMContentLoaded', initPageBindings);

},{"./lib/handlers":7}],2:[function(require,module,exports){
const jwt_decode = require("jwt-decode");

async function requestLogin(data) {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`http://localhost:3000/auth/login`, options);
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error("Login not authorised");
    }
    login(responseJson.token);
  } catch (err) {
    console.warn(err);
  }
}

async function requestRegistration(data) {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`http://localhost:3000/auth/register`, options);
    const responseJson = await response.json();
    if (responseJson.err) {
      throw Error(responseJson.err);
    }
    requestLogin(data);
  } catch (err) {
    console.warn(err);
  }
}

function login(token) {
  const user = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("name", user.name);
  localStorage.setItem("email", user.email);
  window.location.pathname = "/dashboard.html";
}

function logout() {
  localStorage.clear();
  window.location.pathname = "/index.html";
}

module.exports = { requestLogin, requestRegistration, login, logout };

},{"jwt-decode":11}],3:[function(require,module,exports){
const { deleteHabit, postCompletion, deleteCompletion } = require('./requests');

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
	console.log(data);

	const goHomeButton = document.createElement('button');
	goHomeButton.textContent = 'Return to Dashboard';
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
		console.log(response);
	});

	const removeCompletion = document.createElement('button');
	removeCompletion.textContent = 'Remove completion';
	removeCompletion.addEventListener('click', async () => {
		const response = await deleteCompletion(data.id, 1);
		console.log(response);
	});

	const habitTitle = document.createElement('h1');
	habitTitle.textContent = data.habitName;

	const description = document.createElement('p');
	description.textContent = data.description;

	const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.addEventListener('click', () => console.log('edit functionality'));
	// editButton.addEventListener('click', () => bringUpEditModal(data));

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', async () => {
		const response = await deleteHabit(data.id);
		const responseJson = await response.json();
		console.log(responseJson);
	});

	const chartContainer1 = document.createElement('div');
	chartContainer1.setAttribute('id', 'chart1');

	const chartContainer2 = document.createElement('div');
	chartContainer2.setAttribute('id', 'chart2');

	//add in chart generation and streaks

	section.append(goHomeButton);
	section.append(habitTitle);
	section.append(description);
	section.append(markAsComplete);
	section.append(removeCompletion);
	section.append(chartContainer1);
	section.append(chartContainer2);
	section.append(editButton);
	section.append(deleteButton);

	return section;
}

module.exports = { createLoginForm, createRegistrationForm, createHabit, createViewHabit };

},{"./requests":8}],4:[function(require,module,exports){
const { createViewHabit } = require('../dom_elements');
const { postHabit, getHabitData } = require('../requests');
const { updateHabitDescription, addDailyCountField, addNewHabitToDOM } = require('../utils');
const { createChart } = require('../zing_chart');

function onAddHabitButtonClick(e) {
	const modal = document.querySelector('.habit-modal');
	modal.classList.remove('hidden');
}

async function onAddHabitSumbit(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target));
	const description = document.querySelector('.description').textContent;
	console.log(description);
	const submitData = { ...data, description };
	const newHabit = await postHabit(submitData);
	console.log('the new habit', newHabit);
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
		goal.setAttribute('max', 15);
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
	console.log(data);
	const habitSection = createViewHabit(data.habit);
	viewContainer.append(habitSection);
	createChart(data.habit);
}

module.exports = {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onFrequencyChange,
	onAddHabitFormChange,
	onClickViewHabit,
};

},{"../dom_elements":3,"../requests":8,"../utils":9,"../zing_chart":10}],5:[function(require,module,exports){
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
	console.log(data);
	requestLogin(data);
}

module.exports = {
	onLoginButtonClick,
	onRegistrationButtonClick,
	onRegistrationSumbit,
	onLoginSumbit,
};

},{"../auth":2,"../dom_elements":3}],6:[function(require,module,exports){
const { putUserInfo } = require("../requests");

async function onChangePasswordSumbit(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  let response;
  if (formData["new-password"] === formData["confirm-password"]) {
    try {
      response = await putUserInfo(formData);
    } catch (error) {
      console.warn(error);
    }
  } else {
    window.alert("Your passwords do not match, please try again.");
  }
}

async function onUpdateUserInfoSumbit(e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  let response;

  try {
    response = await putUserInfo(formData);
  } catch (error) {
    console.warn(error);
  }
  console.log(response);
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
} = require('./event_handlers/dashboard');
const { createHabit } = require('./dom_elements');
const { getAllUserHabits } = require('./requests');
const { toggleNav, addNameToDashboard, addNameToProfileInput } = require('./utils');

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

	const closeNavButton = document.querySelector('.close-btn');
	const openNavButton = document.querySelector('.menu-btn');

	closeNavButton.addEventListener('click', toggleNav);
	openNavButton.addEventListener('click', toggleNav);
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
	if (path === '/' || path === '/index.html') {
		bindIndexListeners();
	} else if (path === '/dashboard.html') {
		await renderHabits();
		addNameToDashboard();
		bindDashboardListeners();
	} else if (path === '/profile.html') {
		bindProfileListeners();
		addNameToProfileInput();
	}
}

module.exports = { initPageBindings, renderHabits };

},{"./dom_elements":3,"./event_handlers/dashboard":4,"./event_handlers/index":5,"./event_handlers/profile":6,"./requests":8,"./utils":9}],8:[function(require,module,exports){
const { logout } = require('./auth');

const devURL = 'http://localhost:3000';

async function getAllUserHabits(email) {
	try {
		const options = { headers: new Headers({ Authorization: localStorage.getItem('token') }) };
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits`;
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			logout();
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
		console.log(responseJson);
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
		const responseJson = await response.json();
		if (responseJson.err) {
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
			method: 'PUT',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const response = await fetch(`${devURL}/user/${data.email}`, options);
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
	return responseJson;
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
		console.log(responseJson);
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
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(err);
		}
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
	// console.log('toggling');
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

},{"./dom_elements":3}],10:[function(require,module,exports){
async function createChart(data = true) {
	// DEFINE CHART LOCATIONS (IDS)
	// -----------------------------
	// Main chart render location
	const chart1Id = 'chart1';
	const chart2Id = 'chart2';

	// CHART CONFIG
	// -----------------------------

	// Chart 1
	const chart1Data = {
		type: 'ring',
		globals: {
			fontFamily: 'Poppins',
			color: 'purple',
		},
		plot: {
			slice: '80%',
			valueBox: {
				placement: 'center',
				text: '75 %',
				fontSize: '32px',
				fontWeight: 'normal',
			},
			animation: {
				effect: 'ANIMATION_EXPAND_LEFT',
				sequence: 'ANIMATION_BY_PLOT_AND_NODE',
				speed: '200',
			},
		},
		gui: {
			contextMenu: {
				button: {
					visible: false,
				},
			},
		},
		plotarea: {
			margin: '0px 0px 0px 0px',
		},
		backgroundColor: 'transparent',
		series: [
			{
				values: [25],
				backgroundColor: 'transparent',
				borderWidth: 0,
				shadow: 0,
			},
			{
				values: [75],
				backgroundColor: '#8e2657',
				borderWidth: 0,
				shadow: 0,
				slice: 90,
			},
		],
	};

	// Chart 2
	const chart2Data = {
		type: 'hbar',
		backgroundColor: 'transparent',
		globals: {
			fontSize: '16px',
		},
		plot: {
			animation: {
				delay: 300,
				effect: 'ANIMATION_EXPAND_TOP',
				method: 'ANIMATION_LINEAR',
				sequence: 'ANIMATION_BY_PLOT_AND_NODE',
				speed: '500',
			},
			'value-box': {
				//Displays all data values by default.
			},
			styles: ['#ff3f00', '#8e2657'],
		},
		gui: {
			contextMenu: {
				button: {
					visible: false,
				},
			},
		},
		plotarea: {
			margin: '10px 40px 10px 60px',
		},
		'scale-x': {
			labels: ['Current', 'Best'],
			guide: {
				visible: false,
			},
		},
		scaleY: {
			guide: {
				visible: false,
			},
			visible: false,
		},
		series: [{ values: [5, 8] }],
	};
	// RENDER CHARTS
	// -----------------------------

	// Chart 1
	zingchart.render({
		id: chart1Id,
		data: chart1Data,
		height: '50%',
		width: '100%',
	});

	// Chart 2
	zingchart.render({
		id: chart2Id,
		data: chart2Data,
		height: '10%',
		width: '100%',
	});
}

module.exports = { createChart };

},{}],11:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1]);
