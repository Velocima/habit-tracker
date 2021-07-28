const e = require('express');
const db = require('../db_config/config');

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
		this.completionDates = data.completionDates; // an array of unix timestamps
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

				// Initially completion dates are an empty array:
				let completionDates = [];

				let habit = new Habit({
					...result.rows[0],
					completionDates,
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
					const currentStreak = Habit.getCurrentStreak(completionDates);
					const bestStreak = Habit.getBestStreak(completionDates);
					return new Habit({ ...habit, completionDates, currentStreak, bestStreak });
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
					'SELECT ARRAY(SELECT completion_date FROM completions WHERE completions.habit_id = $1 ORDER BY completion_date);',
					[result.rows[0].id]
				);
				const completionDates = datesResult.rows[0].array;
				const currentStreak = Habit.getCurrentStreak(completionDates);
				const bestStreak = Habit.getBestStreak(completionDates);
				let habit = new Habit({ ...result.rows[0], completionDates, currentStreak, bestStreak });
				res(habit);
			} catch (err) {
				rej(err);
			}
		});
	}

	get isComplete() {
		return new Promise(async (res, rej) => {
			try {
				const todayUnix = Date.now(); // Milliseconds UNIX time

				const dates = this.completionDates.map((unix) => {
					const date = new Date(Number(unix));
					return {
						day: date.getDate(),
						month: date.getMonth(),
						year: date.getFullYear(),
					};
				});

				const todaysUnixDate = new Date(todayUnix);

				const today = {
					day: todaysUnixDate.getDate(),
					month: todaysUnixDate.getMonth(),
					year: todaysUnixDate.getFullYear(),
				};

				const todaysIndex = dates.findIndex(({ day, month, year }) => {
					return day === today.day && month === today.month && year === today.year;
				});

				if (todaysIndex !== -1) {
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
				const todayUnix = Date.now(); // Milliseconds UNIX time

				const dates = this.completionDates.map((unix) => {
					const date = new Date(Number(unix));
					return {
						day: date.getDate(),
						month: date.getMonth(),
						year: date.getFullYear(),
					};
				});

				const todaysUnixDate = new Date(todayUnix);

				const today = {
					day: todaysUnixDate.getDate(),
					month: todaysUnixDate.getMonth(),
					year: todaysUnixDate.getFullYear(),
				};

				const todaysIndex = dates.findIndex(({ day, month, year }) => {
					return day === today.day && month === today.month && year === today.year;
				});

				if (todaysIndex === -1) {
					const result = await db.query(
						'INSERT into completions (completion_date, habit_id) VALUES ($1, $2) RETURNING *;',
						[todayUnix, this.id]
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

	static getCurrentStreak(completionDates) {
		if (completionDates.length === 0) {
			return 0;
		}
		const todaysDayCount = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
		const completedDays = completionDates
			.map((str) => Math.floor(Number(str) / 1000 / 60 / 60 / 24))
			.sort();

		let currentStreak = 0;
		let previousDay = todaysDayCount;

		if (Math.abs(todaysDayCount - completedDays[completedDays.length - 1]) > 1) {
			return currentStreak;
		}

		for (let i = completedDays.length - 1; i >= 0; i--) {
			if (Math.abs(completedDays[i] - previousDay) <= 1) {
				currentStreak++;
				previousDay = completedDays[i];
			} else {
				return currentStreak;
			}
		}
		return currentStreak;
	}

	static getBestStreak(completionDates) {
		if (completionDates.length === 0) {
			return 0;
		}
		const todaysDayCount = Math.floor(Date.now() / 1000 / 60 / 60 / 24);
		const completedDays = completionDates
			.map((str) => Math.floor(Number(str) / 1000 / 60 / 60 / 24))
			.sort();

		let currentStreak = 0;
		let bestStreak = 0;
		let previousDay = todaysDayCount;

		for (let i = completedDays.length - 1; i >= 0; i--) {
			if (Math.abs(completedDays[i] - previousDay) <= 1) {
				currentStreak++;
				previousDay = completedDays[i];
				if (currentStreak > bestStreak) {
					bestStreak = currentStreak;
				}
			} else {
				currentStreak = 1;
			}
		}
		return bestStreak;
	}
}

module.exports = Habit;
