(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const initPageBindings = require('./lib/handlers');

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

},{"jwt-decode":9}],3:[function(require,module,exports){
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
const { postHabit } = require('../requests');

function onAddHabitButtonClick(e) {
	const modal = document.querySelector('.habit-modal');
	modal.classList.remove('hidden');
}

async function onAddHabitSumbit(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target));
	const newHabit = await postHabit(data);
	if (newHabit.success) {
		const form = document.querySelector('form');
		form.reset();
		const modal = document.querySelector('.habit-modal');
		modal.classList.add('hidden');
		addNewHabitToDOM(newHabit);
	} else {
		console.log(newHabit);
		// add error handling
	}
}

function onFrequencyChange(e) {}

function onAddHabitFormChange(e) {}

module.exports = {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onFrequencyChange,
	onAddHabitFormChange,
};

},{"../requests":8}],5:[function(require,module,exports){
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

},{"../dom_elements":3}],6:[function(require,module,exports){
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
const { onLoginButtonClick, onRegistrationButtonClick } = require("./event_handlers/index");
const { onChangePasswordSumbit, onUpdateUserInfoSumbit } = require("./event_handlers/profile");
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
  if (path === "/") {
    bindIndexListeners();
  } else if (path === "/dashboard.html") {
    bindDashboardListeners();
  } else if (path === "/profile.html") {
    bindProfileListeners();
  }
}

module.exports = initPageBindings;

},{"./event_handlers/dashboard":4,"./event_handlers/index":5,"./event_handlers/profile":6}],8:[function(require,module,exports){
const { logout } = require("./auth");

const devURL = "http://localhost:3000";

async function getAllUserHabits(email) {
  try {
    const options = { headers: new Headers({ Authorization: localStorage.getItem("token") }) };
    const response = await fetch(`${devURL}/habits/${email}`, options);
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

async function postHabit(data) {
  try {
    const options = {
      method: "POST",
      headers: new Headers({
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    };

    const response = await fetch(`${devURL}/habits`, options);
    const responseJson = await response.json();
    if (responseJson.err) {
      throw new Error(err);
    } else {
      // add a new habit (require from dom_elements.js)
    }
  } catch (err) {
    console.warn(err);
  }
}

async function deleteHabit(id) {
  try {
    const options = {
      method: "DELETE",
      headers: new Headers({ Authorization: localStorage.getItem("token") }),
    };
    const response = await fetch(`${devURL}/habits/${id}`, options);
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
      method: "PUT",
      headers: new Headers({ Authorization: localStorage.getItem("token") }),
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
      method: "PUT",
      headers: new Headers({ Authorization: localStorage.getItem("token") }),
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

module.exports = { getAllUserHabits, postHabit, deleteHabit, putHabit, putUserInfo };

},{"./auth":2}],9:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[1]);
