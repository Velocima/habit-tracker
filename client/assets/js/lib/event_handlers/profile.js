const { putUserInfo, changePassword } = require('../requests');

async function onChangePasswordSumbit(e) {
	e.preventDefault();
	try {
		const formData = Object.fromEntries(new FormData(e.target));
		if (formData['new-password'] !== formData['confirm-password']) {
			window.alert('Your passwords do not match, please try again.');
			return;
		}
		let response = await changePassword(formData);
		if (response.err) {
			throw new Error(response.err.message);
		}
		window.location.pathname = '/dashboard.html';
	} catch (error) {
		window.alert('Could not change password - current password incorrect');
		console.warn(error);
	}
}

async function onUpdateUserInfoSumbit(e) {
	e.preventDefault();
	try {
		const formData = Object.fromEntries(new FormData(e.target));
		if (formData.name === localStorage.getItem('name')) {
			window.alert('Must provide a different name to update.');
			return;
		}
		const response = await putUserInfo(formData);
		if (response.err) {
			throw new Error(response.err.message);
		} else {
			window.location.pathname = '/dashboard.html';
		}
	} catch (error) {
		console.warn(error);
	}
}

module.exports = { onChangePasswordSumbit, onUpdateUserInfoSumbit };
