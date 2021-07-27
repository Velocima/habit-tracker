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
