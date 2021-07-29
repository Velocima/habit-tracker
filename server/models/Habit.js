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
					return new Habit({
						...habit,
						completionDates,
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
				const streaks = Habit.getStreaks(
					completionDates.map((data) => data.completion_date),
					result.rows[0].frequency,
					result.rows[0].frequency_target
				);
				let habit = new Habit({
					...result.rows[0],
					completionDates,
					...streaks,
				});
				res(habit);
			} catch (err) {
				console.log(err.message);
				rej(err);
			}
		});
	}

	markAsComplete() {
		return new Promise(async (res, rej) => {
			try {
				// creating today's date in YYYYMMDD format
				const today = new Date();
				const todaysDate = `${today.getFullYear()}-${(today.getMonth() + 1)
					.toString()
					.padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

				const result = await db.query(
					'INSERT INTO completions (completion_date, habit_id) VALUES ($1, $2) RETURNING *;',
					[todaysDate, this.id]
				);
				res(result.rows[0]);
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

	static getStreaks(completionDates, frequency, frequencyTarget) {
		if (completionDates.length === 0) {
			return {
				bestStreak: 0,
				currentStreak: 0,
			};
		}

		let today = dayjs();
		let dates = [];

		if (frequency === 'hourly') {
			today = today.dayOfYear();
			dates = completionDates.map((date) => dayjs(date).dayOfYear());
		}
		if (frequency === 'daily') {
			today = today.week();
			dates = completionDates.map((date) => dayjs(date).week());
		}
		if (frequency === 'weekly') {
			today = today.month();
			dates = completionDates.map((date) => dayjs(date).month());
		}
		const datesLength = dates.length;

		if (Math.abs(today - dates[datesLength - 1]) > 1) {
			return {
				bestStreak: 0,
				currentStreak: 0,
			};
		}

		const datesData = dates
			.reduce(
				(acc, curr) => {
					if (curr === acc[acc.length - 1].day) {
						acc[acc.length - 1].count++;
					} else {
						acc.push({
							day: curr,
							count: 1,
						});
					}
					return acc;
				},
				[
					{
						day: dates[0],
						count: 0,
					},
				]
			)
			.filter((day) => day.count >= frequencyTarget)
			.map((date) => date.day);

		let currentStreak = 1;
		let bestStreak = 1;
		let previousDate = datesData[0];

		for (let i = 1; i < datesData.length; i++) {
			if (Math.abs(previousDate - datesData[i]) === 1) {
				currentStreak++;
				if (currentStreak > bestStreak) {
					bestStreak = currentStreak;
				}
			} else {
				currentStreak = 1;
			}
			previousDate = datesData[i];
		}
		return {
			bestStreak,
			currentStreak,
		};
	}
}

module.exports = Habit;
