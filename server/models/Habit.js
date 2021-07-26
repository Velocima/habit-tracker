const db = require('../db_config/config');

class Habit {
    constructor(data){
        this.email = data.email
        this.habit = data.habit
        this.frequency = data.frequency
        this.streak = data.streak
    }

    static create({ email, habit, frequency, streak }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO habits (email, habit, frequency, streak) VALUES $1, $2, $3, $4 RETURNING *;`, [email, habit, frequency, streak]);
                let habit = new Habit(result.rows[0]);
                res(habit)
            } catch (err) {
                rej(`Error creating user: ${err}`)
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