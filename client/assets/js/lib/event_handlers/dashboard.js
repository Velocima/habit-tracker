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
