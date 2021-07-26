function bindIndexListeners() {}
function bindDashboardListeners() {}
function bindProfileListeners() {}

function renderHabits() {}

function initPageBindings() {
	const path = window.location.pathname;

	if (path === '/') {
		bindIndexListeners();
	} else if (path === '/dashboard') {
		bindDashboardListeners();
	} else if (path === '/profile') {
		bindProfileListeners();
	}
}

module.exports = initPageBindings;
