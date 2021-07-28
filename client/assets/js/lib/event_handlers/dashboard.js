const { createViewHabit } = require('../dom_elements');
const { postHabit } = require('../requests');
const { updateHabitDescription, addDailyCountField } = require('../utils');

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
	updateHabitDescription();
}

function onClickViewHabit(e) {
	e.preventDefault();
	const main = document.querySelector('main');
	main.textContent = '';
	const habitName = e.target.id;
	//create a new request function that retreives all info for this users habit, and call this here
	const habitSection = createViewHabit('data');
	main.append(habitSection);
}

module.exports = {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onFrequencyChange,
	onAddHabitFormChange,
	onClickViewHabit,
};
