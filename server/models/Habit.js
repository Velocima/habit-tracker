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

    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users
                                                WHERE email = $1;`, [email]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}

module.exports = User