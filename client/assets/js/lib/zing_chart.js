async function createChart(data = true) {
	// DEFINE CHART LOCATIONS (IDS)
	// -----------------------------
	// Main chart render location
	const chart1Id = 'chart1';
	const chart2Id = 'chart2';

	// CHART CONFIG
	// -----------------------------

	// Chart 1
	const chart1Data = {
		type: 'ring',
		globals: {
			fontFamily: 'Poppins',
			color: 'purple',
		},
		plot: {
			slice: '80%',
			valueBox: {
				placement: 'center',
				text: '75 %',
				fontSize: '32px',
				fontWeight: 'normal',
			},
			animation: {
				effect: 'ANIMATION_EXPAND_LEFT',
				sequence: 'ANIMATION_BY_PLOT_AND_NODE',
				speed: '200',
			},
		},
		gui: {
			contextMenu: {
				button: {
					visible: false,
				},
			},
		},
		plotarea: {
			margin: '0px 0px 0px 0px',
		},
		backgroundColor: 'transparent',
		series: [
			{
				values: [25],
				backgroundColor: 'transparent',
				borderWidth: 0,
				shadow: 0,
			},
			{
				values: [75],
				backgroundColor: '#8e2657',
				borderWidth: 0,
				shadow: 0,
				slice: 90,
			},
		],
	};

	// Chart 2
	const chart2Data = {
		type: 'hbar',
		backgroundColor: 'transparent',
		globals: {
			fontSize: '16px',
		},
		plot: {
			animation: {
				delay: 300,
				effect: 'ANIMATION_EXPAND_TOP',
				method: 'ANIMATION_LINEAR',
				sequence: 'ANIMATION_BY_PLOT_AND_NODE',
				speed: '500',
			},
			'value-box': {
				//Displays all data values by default.
			},
			styles: ['#ff3f00', '#8e2657'],
		},
		gui: {
			contextMenu: {
				button: {
					visible: false,
				},
			},
		},
		plotarea: {
			margin: '10px 40px 10px 60px',
		},
		'scale-x': {
			labels: ['Current', 'Best'],
			guide: {
				visible: false,
			},
		},
		scaleY: {
			guide: {
				visible: false,
			},
			visible: false,
		},
		series: [{ values: [5, 8] }],
	};
	// RENDER CHARTS
	// -----------------------------

	// Chart 1
	zingchart.render({
		id: chart1Id,
		data: chart1Data,
		height: '50%',
		width: '100%',
	});

	// Chart 2
	zingchart.render({
		id: chart2Id,
		data: chart2Data,
		height: '10%',
		width: '100%',
	});
}

module.exports = { createChart };
