const db = require('../db_config/config');

/**
 * User class.
 * Contains the e-mail, name, and password for a particular user,
 * Can filter by e-mail to find a particular user.
 */
class User {
	constructor(data) {
		this.email = data.email;
		this.name = data.name;
		this.passwordDigest = data.password_digest;
	}

	static create({ name, email, passwordDigest }) {
		return new Promise(async (res, rej) => {
			try {
				let result = await db.query(
					`INSERT INTO users (name, email, password_digest) VALUES ($1, $2, $3) RETURNING *;`,
					[name, email, passwordDigest]
				);
				let user = new User(result.rows[0]);
				res(user);
			} catch (err) {
				rej(`Error creating user: ${err}`);
			}
		});
	}

	static findByEmail(email) {
		return new Promise(async (res, rej) => {
			try {
				let result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
				let user = new User(result.rows[0]);
				res(user);
			} catch (err) {
				rej(`Error retrieving user: ${err}`);
			}
		});
	}

	updatePassword(updatedPassword) {
		return new Promise(async (res, rej) => {
			try {
				const result = await db.query(
					'UPDATE users SET password_digest = $1 WHERE email = $2 RETURNING email;',
					[updatedPassword, this.email]
				);
				res(result.rows[0]);
			} catch (err) {
				rej(`Error retrieving habits: ${err}`);
			}
		});
	}

	updateName(email, newName) {
		return new Promise(async (res, rej) => {
			try {
				const result = await db.query(
					'UPDATE users SET name = $2 WHERE email = $1 RETURNING name, email;',
					[email, newName]
				);
				res(result.rows[0]);
			} catch (err) {
				rej(`Error updating: ${err}`);
			}
		});
	}
}

module.exports = User;
