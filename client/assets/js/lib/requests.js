const { logout } = require('./auth');

const devURL = 'http://localhost:3000';

async function getAllUserHabits(email) {
	try {
		const options = { headers: new Headers({ Authorization: localStorage.getItem('token') }) };
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits`;
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			// logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function getHabitData(id) {
	try {
		const options = { headers: new Headers({ Authorization: localStorage.getItem('token') }) };
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits/${id}`;
		const response = await fetch(url, options);
		const data = await response.json();
		if (data.err) {
			console.warn(data.err);
			// logout();
		}
		return data;
	} catch (err) {
		console.warn(err);
	}
}

async function postHabit(data) {
	try {
		const options = {
			method: 'POST',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits`;
		const response = await fetch(url, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw new Error(err);
		}
		return responseJson;
	} catch (err) {
		console.warn(err);
	}
}

async function deleteHabit(id) {
	try {
		const options = {
			method: 'DELETE',
			headers: new Headers({ Authorization: localStorage.getItem('token') }),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(`${devURL}/user/${email}/habits/${id}`, options);
		if (response.err) {
			throw Error(err);
		}
	} catch (err) {
		console.warn(err);
	}
}

async function putHabit(data) {
	try {
		const options = {
			method: 'PUT',
			headers: new Headers({ Authorization: localStorage.getItem('token') }),
			body: JSON.stringify(data),
		};
		const response = await fetch(`${devURL}/habits/${data.id}`, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(err);
		} else {
			// redirect to the dashboard
			console.log(responseJson);
		}
	} catch (err) {
		console.warn(err);
	}
}

async function putUserInfo(data) {
	try {
		const options = {
			method: 'PATCH',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(`${devURL}/user/${email}`, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(responseJson.err);
		} else {
			localStorage.setItem('name', responseJson.name);
			return responseJson;
		}
	} catch (err) {
		console.warn(err);
	}
}

async function changePassword(data) {
	try {
		const options = {
			method: 'PATCH',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(data),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(`${devURL}/auth/${email}/password`, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw Error(err);
		} else {
			return responseJson;
		}
	} catch (err) {
		console.warn(err);
	}
}

async function postCompletion(id) {
	try {
		const options = {
			method: 'POST',
			headers: new Headers({
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			}),
		};
		const email = localStorage.getItem('email');
		const url = `${devURL}/user/${email}/habits/${id}/complete`;
		const response = await fetch(url, options);
		const responseJson = await response.json();
		if (responseJson.err) {
			throw new Error(err);
		}
		return responseJson;
	} catch (err) {
		console.warn(err);
	}
}

async function deleteCompletion(id, completionId) {
	try {
		const options = {
			method: 'DELETE',
			headers: new Headers({ Authorization: localStorage.getItem('token') }),
		};
		const email = localStorage.getItem('email');
		const response = await fetch(
			`${devURL}/user/${email}/habits/${id}/complete/${completionId}`,
			options
		);
		if (response.err) {
			throw Error(err);
		}
	} catch (err) {
		console.warn(err);
	}
}

async function getLastestCompletionId(id) {
	try {
		const { habit } = await getHabitData(id);
		return habit.completionDates[habit.completionDates.length - 1].id;
	} catch (err) {
		console.warn(err);
	}
}

module.exports = {
	getAllUserHabits,
	getHabitData,
	postHabit,
	deleteHabit,
	putHabit,
	putUserInfo,
	postCompletion,
	deleteCompletion,
	changePassword,
	getLastestCompletionId,
};
