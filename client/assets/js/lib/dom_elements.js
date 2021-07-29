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
