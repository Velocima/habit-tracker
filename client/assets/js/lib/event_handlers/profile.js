const { putUserInfo } = require('../requests');

async function onChangePasswordSumbit(e) {
	e.preventDefault();
	const formData = Object.fromEntries(new FormData(e.target));
	let response;
	if (formData['new-password'] === formData['confirm-password']) {
		try {
			response = await putUserInfo(formData);
		} catch (error) {
			console.warn(error);
		}
	} else {
		window.alert('Your passwords do not match, please try again.');
	}
}

async function onUpdateUserInfoSumbit(e) {
	e.preventDefault();
	try {
		const formData = Object.fromEntries(new FormData(e.target));
		const response = await putUserInfo(formData);
		if (response.err) {
			throw new Error(err.message);
		} else {
			window.location.pathname = '/dashboard.html';
		}
	} catch (error) {
		console.warn(error);
	}
}

module.exports = { onChangePasswordSumbit, onUpdateUserInfoSumbit };
