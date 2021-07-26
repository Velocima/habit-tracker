const { onLoginButtonClick, onRegistrationButtonClick } = require("./event_handlers/index");
const { onChangePasswordSumbit, onUpdateUserInfoSumbit } = require("./event_handlers/profile");

function bindIndexListeners() {
  const loginButton = document.querySelector(".login");
  loginButton.addEventListener("click", onLoginButtonClick);

  const registrationButton = document.querySelector(".register");
  registrationButton.addEventListener("click", onRegistrationButtonClick);
}

function bindDashboardListeners() {}

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
  } else if (path === "/dashboard") {
    bindDashboardListeners();
  } else if (path === "/profile.html") {
    bindProfileListeners();
  }
}

module.exports = initPageBindings;
