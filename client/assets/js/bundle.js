(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const initPageBindings = require('./lib/handlers');

document.addEventListener('DOMContentLoaded', initPageBindings);


},{"./lib/handlers":5}],2:[function(require,module,exports){

function createLoginForm() {
	const form = document.createElement('form');

	const emailLabel = document.createElement('label');
	emailLabel.setAttribute('for', 'email');
	emailLabel.innerText = 'Email';

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
	passwordLabel.innerText = 'Password';

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

	return form;
}

function createRegistrationForm() {
	const form = document.createElement('form');

	const nameLabel = document.createElement('label');
	nameLabel.setAttribute('for', 'name');
	nameLabel.innerText = 'Name';

	const nameInput = document.createElement('input');
	nameInput.setAttribute('name', 'name');
	nameInput.setAttribute('id', 'name');
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('placeholder', 'name');
	nameInput.setAttribute('required', true);

	form.append(nameLabel);
	form.append(nameInput);

	const emailLabel = document.createElement('label');
	emailLabel.setAttribute('for', 'email');
	emailLabel.innerText = 'Email';

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
	passwordLabel.innerText = 'Password';

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
	registerButton.setAttribute('value', 'Login');

	form.append(registerButton);

	return form;
}

function createHabit(data) {
	const section = document.createElement('section');
	return section;
}

module.exports = { createLoginForm, createRegistrationForm };


},{}],4:[function(require,module,exports){
const { createLoginForm, createRegistrationForm } = require('../dom_elements');
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
	// call auth function
}

function onLoginSumbit(e) {
	e.preventDefault();
	// call auth function
}

module.exports = {
	onLoginButtonClick,
	onRegistrationButtonClick,
	onRegistrationSumbit,
	onLoginSumbit,
};


},{"../dom_elements":2}],5:[function(require,module,exports){
const { onLoginButtonClick, onRegistrationButtonClick } = require('./event_handlers/index');
const { onAddHabitButtonClick } = require('./event_handlers/dashboard');


function bindIndexListeners() {
  const loginButton = document.querySelector(".login");
  loginButton.addEventListener("click", onLoginButtonClick);

  const registrationButton = document.querySelector(".register");
  registrationButton.addEventListener("click", onRegistrationButtonClick);
}

function bindDashboardListeners() {
	const addHabbitButtons = document.querySelectorAll('.add-habit');
	addHabbitButtons.forEach((button) => button.addEventListener('click', onAddHabitButtonClick));
}

function bindProfileListeners() {
  const changeUserInfoSubmitButton = document.getElementById("user-info-form");
  changeUserInfoSubmitButton.addEventListener("submit", onUpdateUserInfoSumbit);

  const changePasswordSubmitButton = document.getElementById("change-password-form");
  changePasswordSubmitButton.addEventListener("submit", onChangePasswordSumbit);
}

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


},{"./event_handlers/dashboard":3,"./event_handlers/index":4}]},{},[1]);

