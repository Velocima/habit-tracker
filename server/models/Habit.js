const db = require('../db_config/config');

class Habit {
    constructor(data){
        this.email = data.email
        this.habitName = data.habitName
        this.description = data.description
        this.frequency = data.frequency
        this.frequencyTarget= data.frequencyTarget
        this.streak = data.streak
    }

    static create({ email, habitName, description, frequency, frequencyTarget, streak }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target, streak) VALUES $1, $2, $3, $4, $5, $6 RETURNING *;`, [email, habitName, description, frequency, frequencyTarget, streak]);
                let habit = new Habit(result.rows[0]);
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

    static update() {
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM habits;`);
                let habits = result.rows.map(r => new Habit(r))
                res(users)
            } catch (err) {
                rej(`Error retrieving habits: ${err}`)
            }
        })
    }
}

module.exports = User