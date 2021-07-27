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
	const form = document.querySelector('form');

	if (form.frequency.value === 'hourly') {
		addDailyCountField(onAddHabitFormChange);
	} else if (form.occurences) {
		form.removeChild(form.childNodes[13]);
		form.removeChild(form.childNodes[13]);
	}
}

function onAddHabitFormChange(e) {
	updateHabitDescription();
}

module.exports = {
	onAddHabitButtonClick,
	onAddHabitSumbit,
	onFrequencyChange,
	onAddHabitFormChange,
};
