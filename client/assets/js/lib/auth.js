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

modules.exports = { requestLogin, requestRegistration, login, logout };
