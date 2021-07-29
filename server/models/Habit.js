const db = require('../db_config/config');
const dayjs = require('dayjs');

/**
 * Habit class.
 * Contains create, update, and delete functionality.
 * Can filter by e-mail and ID.
 */
class Habit {
	constructor(data) {
		this.id = data.id;
		this.email = data.email;
		this.habitName = data.habit_name;
		this.description = data.habit_description;
		this.frequency = data.habit_frequency;
		this.frequencyTarget = data.frequency_target;
		this.completionDates = data.completionDates; // an array of dates in 'YYYY-MM-YY' format
		this.completionsCount = data.completionsCount; // an array of objects in date:count format
		this.currentStreak = data.currentStreak;
		this.bestStreak = data.bestStreak;
	}

	static create({ email, name, description, frequency, goal }) {
		return new Promise(async (res, rej) => {
			try {
				let result = await db.query(
					`INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
					[email, name, description, frequency, goal]
				);

				let completionDates = [];
				let completionsCount = {}; // both are empty initially

				let habit = new Habit({
					...result.rows[0],
					completionDates,
					completionsCount,
					currentStreak: 0,
					bestStreak: 0,
				});
				res(habit);
			} catch (err) {
				rej(`Error creating habit: ${err}`);
			}
		});
	}

	static filterByEmail(email) {
		return new Promise(async (res, rej) => {
			try {
				let result = await db.query(
					`SELECT * FROM habits
          	WHERE email = $1;`,
					[email]
				);

				let data = result.rows.map(async (habit) => {
					let completions = await db.query(
						'SELECT ARRAY(SELECT completion_date FROM completions WHERE completions.habit_id = $1 ORDER BY completion_date);',
						[habit.id]
					);
					const completionDates = completions.rows[0].array;
					const completionsCount = (completionDates) =>
						completionDates.reduce((acc, curr) => ((acc[curr] = ++acc[curr] || 1), acc), {});
					const currentStreak = Habit.getCurrentStreak(completionDates);
					const bestStreak = Habit.getBestStreak(completionDates);
					return new Habit({
						...habit,
						completionDates,
						completionsCount,
						currentStreak,
						bestStreak,
					});
				});
				const habits = await Promise.all(data);
				res(habits);
			} catch (err) {
				rej(`Error retrieving user: ${err}`);
			}
		});
	}

	// Addressing a particular habit:
	static findById(id) {
		return new Promise(async (res, rej) => {
			try {
				let result = await db.query(`SELECT * FROM habits WHERE id = $1;`, [id]);
				if (result.rowCount === 0) {
					throw new Error('Habit not found');
				}
				let datesResult = await db.query(
					'SELECT * FROM completions WHERE habit_id = $1 ORDER BY completion_date;',
					[result.rows[0].id]
				);

				const completionDates = datesResult.rows;
				const completionsCount = (completionDates) =>
					completionDates
						.map((date) => date.completion_date)
						.reduce((acc, curr) => ((acc[curr] = ++acc[curr] || 1), acc), {});
				const currentStreak = Habit.getCurrentStreak(
					completionDates.map((data) => data.completion_date)
				);
				const bestStreak = Habit.getBestStreak(completionDates.map((data) => data.completion_date));
				let habit = new Habit({
					...result.rows[0],
					completionDates,
					completionsCount,
					currentStreak,
					bestStreak,
				});
				res(habit);
			} catch (err) {
				console.log(err.message);
				rej(err);
			}
		});
	}

	get isComplete() {
		return new Promise(async (res, rej) => {
			try {
				// creating today's date in 'YYYY-MM-DD' format
				const today = new Date();
				const todaysDate = `${today.getFullYear()}-${(today.getMonth() + 1).padStart(
					2,
					'0'
				)}-${today.getDate().padStart(2, '0')}`;

				// Sending "true" only if today's date alrerady exeists in the db:
				if (this.completionsCount.hasOwnProperty(todaysDate) === true) {
					res(true);
				} else {
					res(false);
				}
			} catch (err) {
				rej(err);
			}
		});
	}

	markAsComplete() {
		return new Promise(async (res, rej) => {
			try {
				// creating today's date in YYYYMMDD format
				const today = new Date();
				const todaysDate = `${today.getFullYear()}-${(today.getMonth() + 1).padStart(
					2,
					'0'
				)}-${today.getDate().padStart(2, '0')}`;

				// A new completion record is added only if today's date doesn't exist in db yet:
				if (this.completionsCount.hasOwnProperty(todaysDate) === false) {
					const result = await db.query(
						'INSERT into completions (completion_date, habit_id) VALUES ($1, $2) RETURNING *;',
						[todaysDate, this.id]
					);
					res(result.rows[0]);
				} else {
					throw new Error('Record already complete for time period');
				}
			} catch (err) {
				rej(err);
			}
		});
	}

	destroyHabit() {
		return new Promise(async (resolve, reject) => {
			try {
				await db.query(`DELETE FROM completions WHERE habit_id = $1;`, [this.id]);
				await db.query(`DELETE FROM habits WHERE id = $1;`, [this.id]);
				resolve('Habit was deleted');
			} catch (err) {
				reject('Habit could not be deleted');
			}
		});
	}

	static destroyCompletionDate(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await db.query(`DELETE FROM completions WHERE id = $1 RETURNING *;`, [id]);
				if (result.rowCount === 0) {
					throw new Error('Completion record not found.');
				}
				resolve({ habit_id: 'Completion date was deleted' });
			} catch (err) {
				reject(err);
			}
		});
	}

	static getCurrentStreak(completionDates, completionsCount) {
		if (completionDates.length === 0) {
			return 0;
		}

		// Getting today's date to match db dates ('YYYY-MM-DD' format):
		const today = new Date();
		const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).padStart(2, '0')}-${today
			.getDate()
			.padStart(2, '0')}`;
		const todaysDate = dayjs(todayStr); // applying dayjs format

		const completedDaysUnformatted = Object.keys(completionsCount); // getting all unique completion dates
		const uniqueCompletedDays = completedDaysUnformatted.map((date) => dayjs(date)); // applying dayjs format to unique completion dates

		// Converting completionDates array to dayjs format:
		const completionDatesFormatted = completionDates.map((date) => dayjs(date));

		let currentStreak = 0;
		let previousDay = todaysDate;

		if (this.frequency === 'hourly') {
			// If the difference between today & last completion date is > 1 day, the streak is broken:
			if (
				Math.abs(previousDay.diff(uniqueCompletedDays[uniqueCompletedDays.length - 1], 'day')) > 1
			) {
				return currentStreak; // retuns 0
			}
			// Iterating through dates array backwards:
			for (let i = completionDatesFormatted.length - 1; i >= 0; i--) {
				if (completionDatesFormatted[i].diff(previousDay, 'day') <= 1) {
					currentStreak++;
					previousDay = completionDatesFormatted[i];
				} else {
					return currentStreak;
				}
			}
		}

		if (this.frequency === 'daily') {
			// If the difference between today & last completion date is > 1 week, the streak is broken:
			if (
				Math.abs(
					previousDay.diff(completionDatesFormatted[completionDatesFormatted.length - 1], 'week')
				) > 1
			) {
				return currentStreak; // retuns 0
			}
			// Iterating through dates array backwards:
			for (let i = completionDatesFormatted.length - 1; i >= 0; i--) {
				if (Math.abs(completionDatesFormatted[i].diff(previousDay, 'week')) <= 1) {
					currentStreak++;
					previousDay = completionDatesFormatted[i];
				} else {
					return currentStreak;
				}
			}
		}

		if (this.frequency === 'weekly') {
			// If the difference between today a& last completion date is > 1 month, the streak is broken:
			if (
				Math.abs(
					previousDay.diff(completionDatesFormatted[completionDatesFormatted.length - 1]),
					'month'
				) > 1
			) {
				return currentStreak; // retuns 0
			}
			// Iterating through dates array backwards:
			for (let i = completionDatesFormatted.length - 1; i >= 0; i--) {
				if (Math.abs(completionDatesFormatted[i].diff(previousDay, 'month')) <= 1) {
					currentStreak++;
					previousDay = completionDatesFormatted[i];
				} else {
					return currentStreak;
				}
			}
		}
		return currentStreak;
	}

	static getBestStreak(completionDates, completionsCount) {
		if (completionDates.length === 0) {
			return 0;
		}
		// Getting today's date to match db dates ('YYYY-MM-DD' format):
		const today = new Date();
		const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).padStart(2, '0')}-${today
			.getDate()
			.padStart(2, '0')}`;
		const todaysDate = dayjs(todayStr); // applying dayjs format

		const completedDaysUnformatted = Object.keys(completionsCount); // getting all unique completion dates
		const uniqueCompletedDays = completedDaysUnformatted.map((date) => dayjs(date)); // applying dayjs format to unique completion dates

		// Converting completionDates array to dayjs format:
		const completionDatesFormatted = completionDates.map((date) => dayjs(date));

		let currentStreak = 0;
		let bestStreak = 0;

		if (this.frequency === 'hourly') {
			// If the difference between today & last completion date is > 1 day, the streak is broken:
			if (
				Math.abs(previousDay.diff(uniqueCompletedDays[uniqueCompletedDays.length - 1]), 'day') > 1
			) {
				return currentStreak; // retuns 0
			}
			// Iterating through dates array backwards:
			for (let i = completionDatesFormatted.length - 1; i >= 0; i--) {
				if (
					Math.abs(completionDatesFormatted[i].diff(previousDay), 'day') <= this.frequencyTarget
				) {
					currentStreak++;
					previousDay = completionDatesFormatted[i];
					if (currentStreak > bestStreak) {
						bestStreak = currentStreak;
					}
				} else {
					currentStreak = 1;
				}
			}
		}

		if (this.frequency === 'daily') {
			// If the difference between today & last completion date is > 1 day, the streak is broken:
			if (
				Math.abs(
					previousDay.diff(completionDatesFormatted[completionDatesFormatted.length - 1]),
					'week'
				) > 1
			) {
				return currentStreak; // retuns 0
			}
			// Iterating through dates array backwards:
			for (let i = completionDatesFormatted.length - 1; i >= 0; i--) {
				if (
					Math.abs(completionDatesFormatted[i].diff(previousDay), 'week') <= this.frequencyTarget
				) {
					currentStreak++;
					previousDay = completionDatesFormatted[i];
					if (currentStreak > bestStreak) {
						bestStreak = currentStreak;
					}
				} else {
					currentStreak = 1;
				}
			}
		}

		if (this.frequency === 'weekly') {
			// If the difference between today a& last completion date is > 1 month, the streak is broken:
			if (
				previousDay.diff(completionDatesFormatted[completionDatesFormatted.length - 1], 'month') > 1
			) {
				return currentStreak; // retuns 0
			}
			// Iterating through dates array backwards:
			for (let i = completionDatesFormatted.length - 1; i >= 0; i--) {
				if (completionDatesFormatted[i].diff(previousDay, 'month') <= 1) {
					currentStreak++;
					previousDay = completionDatesFormatted[i];
					if (currentStreak > bestStreak) {
						bestStreak = currentStreak;
					}
				} else {
					currentStreak = 1;
				}
			}
			return currentStreak;
		}
	}
}

module.exports = Habit;
