async function createChart(data = true) {
	let chartData = (size, values, color, text) => {
		return {
			size: size,
			values: values,
			backgroundColor: color,
			borderWidth: '46px',
			borderColor: color,
			text: text,
			tooltip: {
				text: "<span style='color:%color'>%plot-text</span><br><span style='font-size:31px;font-weight:bold;color:%color;'>%node-percent-value%</span>",
				align: 'left',
				padding: '30px',
				anchor: 'c',
				backgroundColor: 'none',
				borderWidth: '0px',
				fontFamily: 'Lucida Sans Unicode',
				fontSize: '19px',
				width: '120px',
				x: '365px',
				y: '243px',
			},
		};
	};

	let chartConfig = {
		type: 'pie',
		backgroundColor: '#222',
		plot: {
			valueBox: {
				visible: false,
			},
			angleStart: 270,
			detach: false,
			slice: '100%',
			totals: [100],
			animation: {
				effect: 'ANIMATION_EXPAND_VERTICAL',
				method: 'ANIMATION_LINEAR',
				speed: 'ANIMATION_SLOW',
			},
			hoverState: {
				visible: false,
			},
			refAngle: 270,
		},
		plotarea: {
			margin: '40px',
		},
		scale: {
			sizeFactor: 1,
		},
		shapes: [
			{
				type: 'pie',
				alpha: 0.25,
				backgroundColor: '#F61F64',
				flat: true,
				placement: 'bottom',
				size: '234px',
				slice: 187,
				x: '362px',
				y: '250px',
			},
			{
				type: 'pie', // green done
				alpha: 0.25,
				backgroundColor: '#78ff1b',
				flat: true,
				placement: 'bottom',
				size: '182px',
				slice: 134,
				x: '362px',
				y: '250px',
			},
			{
				type: 'pie', // blue done
				alpha: 0.25,
				backgroundColor: '#0efbe1',
				flat: true,
				placement: 'bottom',
				size: '129px',
				slice: 82,
				x: '362px',
				y: '250px',
			},
			{
				type: 'line',
				lineCap: 'round',
				lineColor: '#000',
				lineWidth: '3px',
				offsetX: '350px',
				offsetY: '42px',
				points: [[0, 0], [22, 0], null, [10, -10], [22, 0], [10, 10]],
			},
			{
				type: 'line',
				lineCap: 'round',
				lineColor: '#000',
				lineWidth: '3px',
				offsetX: '350px',
				offsetY: '95px',
				points: [
					[0, 0],
					[22, 0],
					null,
					[10, -10],
					[22, 0],
					[10, 10],
					null,
					[20, -10],
					[32, 0],
					[20, 10],
				],
			},
			{
				type: 'line',
				lineCap: 'round',
				lineColor: '#000',
				lineWidth: '3px',
				offsetX: '360px',
				offsetY: '135px',
				points: [[0, 0], [0, 22], null, [-10, 12], [0, 0], [10, 12]],
			},
		],
		series: [
			chartData('100%', [84], '#F61F64', 'Move'),
			chartData('75%', [76], '#6fe71c', 'Exercise'),
			chartData('50%', [55], '#19ecd5', 'Stand'),
		],
	};

	zingchart.render({
		id: 'myChart',
		data: chartConfig,
		width: '725px',
		height: '500px',
	});
}

module.exports = { createChart };
