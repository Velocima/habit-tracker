const { createLoginForm, createRegistrationForm } = require('../dom_elements');

function onLoginButtonClick(e) {
	const body = document.querySelector('body');
	const slogan = document.querySelector('p');
	const loginButton = document.querySelector('.login');
	const form = createLoginForm();
	form.addEventListener('submit', onLoginSumbit);
	body.removeChild(slogan);
	body.insertBefore(form, loginButton);
	body.removeChild(loginButton);
}

function onRegistrationButtonClick(e) {}

function onRegistrationSumbit(e) {}

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
