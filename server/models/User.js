const db = require('../db_config/config');

class User {
    constructor(data){
        this.email = data.email
        this.name = data.name
        this.passwordDigest = data.passwordDigest
    }

    static create({ name, email, passwordDigest }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO users (name, email, password_digest) VALUES $1, $2, $3 RETURNING *;`, [name, email, passwordDigest]);
                let user = new User(result.rows[0]);
                res(user)
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