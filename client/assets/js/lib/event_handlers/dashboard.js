const { createViewHabit } = require('../dom_elements');
const { postHabit } = require('../requests');
const { updateHabitDescription, addDailyCountField, addNewHabitToDOM } = require('../utils');
const { createChart } = require('../zing_chart');

function onAddHabitButtonClick(e) {
	const modal = document.querySelector('.habit-modal');
	modal.classList.remove('hidden');
}

async function onAddHabitSumbit(e) {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target));
	const newHabit = await postHabit(data);
	console.log('the new habit', newHabit);
	if (!newHabit.err) {
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
	// const data = await getHabitInfo(localStorage.getItem('email', e.target.id));
	const habitSection = createViewHabit('data');
	viewContainer.append(habitSection);
	createChart();
}

module.exports = {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onFrequencyChange,
	onAddHabitFormChange,
	onClickViewHabit,
};
