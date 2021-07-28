const { deleteHabit } = require('./requests');

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

	const habitTitle = document.createElement('h1');
	habitTitle.textContent = data.habitName;

	const checkbox = document.createElement('input');
	checkbox.setAttribute('id', 'checkbox');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('name', 'checkbox');
	checkbox.addEventListener('change', () => {
		if (this.checked) {
			console.log('Checkbox is checked..');
		} else {
			console.log('Checkbox is not checked..');
		}
	});

	const description = document.createElement('p');
	description.textContent = data.description;

	const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.addEventListener('click', () =>
		console.log('this should redirect to the edit page...')
	);

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', async () => {
		const response = await deleteHabit(data.id);
		const responseJson = await response.json();
		console.log(responseJson);
	});

	const chartContainer = document.createElement('div');
	chartContainer.setAttribute('id', 'myChart');

	//add in chart generation and streaks

	section.append(goHomeButton);
	section.append(habitTitle);
	section.append(description);
	section.append(checkbox);
	section.append(chartContainer);
	section.append(editButton);
	section.append(deleteButton);

	return section;
}

module.exports = { createLoginForm, createRegistrationForm, createHabit, createViewHabit };
