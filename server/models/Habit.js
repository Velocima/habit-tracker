const db = require('../db_config/config');


/**
 * Habit class.
 * Contains create, update, and delete functionality.
 * Can filter by e-mail and ID.
 */
class Habit {
    constructor(data){
        this.id = data.id
        this.email = data.email
        this.habitName = data.habitName
        this.description = data.description
        this.frequency = data.frequency
        this.frequencyTarget= data.frequencyTarget
        this.streak = data.streak
        this.completionDates = data.completionDates // an array of unix timestamps
    }

    static create({ email, habitName, description, frequency, frequencyTarget, streak }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target, streak, completed_) VALUES $1, $2, $3, $4, $5, $6 RETURNING *;`, [email, habitName, description, frequency, frequencyTarget, streak]);

                // Using ARRAY function of PostgreSQL which turns a set of rows into an array (using a subselect) while ordering by date:
                let completionDates = await db.query('SELECT ARRAY(SELECT completion_date FROM completions WHERE completions.habit_id = $7 ORDER BY completion_date);', [result.id])

                let habit = new Habit(...result.rows[0], completionDates);
                res(habit)
            } catch (err) {
                rej(`Error creating habit: ${err}`)
            }
        })
    }

    static filterByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM habits
                                                WHERE email = $1;`, [email]);
                let habits = result.rows.map(habit => new Habit(habit))
                res(habits) // Returns an array of habits for a particular user
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    static findById (id) {         
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query(`SELECT * FROM habits WHERE id = $1;`, [id]);
            let habits = result.rows.map(habit => new Habit(habit))
            res(users)
        } catch (err) {
            rej(`Error retrieving habits: ${err}`)
        }
    })
}

    update() {
        return new Promise(async (res, rej) => {
            try {
                const updatedStreak = this.streak + 1;
                const result = await db.query('UPDATE habits SET streak = $1 WHERE id = $2 RETURNING id, streak;', [ updatedStreak, this.id]);
                res(result.rows[0])
            } catch (err) {
                rej(`Error updating habits: ${err}`)
            }
        })
    }

    destroy() {
        return new Promise(async (resolve, reject) => {
          try {
            await db.query(`DELETE FROM habits WHERE id = $1;`, [this.id]);
            resolve("Habit was deleted");
          } catch (err) {
            reject("Habit could not be deleted");
          }
        });
      }
}

module.exports = Habit