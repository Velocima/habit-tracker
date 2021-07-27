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
        this.habitName = data.habit_name
        this.description = data.habit_description
        this.frequency = data.habit_frequency
        this.frequencyTarget= data.frequency_target
        this.completionDates = data.completionDates // an array of unix timestamps
    }

    static create({ email, name, description, frequency, goal}){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target) VALUES $1, $2, $3, $4, $5, $6 RETURNING *;`, [email, name, description, frequency, goal]);

                // Initially completion dates are an empty array:
                let completionDates = [];

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
                                                                // Using ARRAY function of PostgreSQL which turns a set of rows into an array (using a subselect) while ordering by date:
                let dates = await db.query('SELECT ARRAY(SELECT completion_date FROM completions WHERE completions.habit_id = $1 ORDER BY completion_date);', [result.id])
                let habits = result.rows.map(habit => new Habit(habit, dates));
                res(habits) // Returns an array of habits for a particular user
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    // Addressing a particular habit:
    static findById (id) {         
    return new Promise(async (res, rej) => {
        try {
            let result = await db.query(`SELECT * FROM habits WHERE id = $1;`, [id]);
            let dates = await db.query('SELECT ARRAY(SELECT completion_date FROM completions WHERE completions.habit_id = $2 ORDER BY completion_date);', [result.id])
            let habits = result.rows.map(habit => new Habit(habit, dates))
            res(habits)
        } catch (err) {
            rej(`Error retrieving habits: ${err}`)
        }
    })
}

    update() {
        return new Promise(async (res, rej) => {
            try {
                const todayUnix = Date.now(); // Milliseconds UNIX time
                const completedDateUnix = (Math.floor(today/ 1000)); // Seconds UNIX time
                const 
                const result = await db.query('INSERT into completions (completion_date, habit_id) VALUES $1, $2 WHERE id = $3 RETURNING id;', [ completedDate, this.id]);
                res(result.rows[0])
            } catch (err) {
                rej(`Error updating habits: ${err}`)
            }
        })
    }

    destroyHabit() {
        return new Promise(async (resolve, reject) => {
          try {
            await db.query(`DELETE FROM habits WHERE id = $1;`, [this.id]);
            resolve("Habit was deleted");
          } catch (err) {
            reject("Habit could not be deleted");
          }
        });
      }

    static destroyCompletionDate(id) {
        return new Promise(async (resolve, reject) => {
          try {
            await db.query(`DELETE FROM completions WHERE habit_id = $1 RETURNING habit_id;`, [id]);
            resolve({habit_id: "Completion date was deleted"});
          } catch (err) {
            reject("Completion date could not be deleted");
          }
        });
      }
}

module.exports = Habit