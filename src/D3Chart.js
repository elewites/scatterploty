import * as d3 from 'd3';
import './d3chart.css'

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
let WIDTH = window.screen.width <= 600 ? 300 : 400;
//apply margins to width 
WIDTH = WIDTH - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM

console.log(WIDTH)
class D3Chart {
	constructor(element, data, updateName) {
		let vis = this;
		vis.updateName = updateName;

		//scales
		vis.x = d3.scaleLinear()
			.range([0, WIDTH]);

		vis.y = d3.scaleLinear()
			.range([HEIGHT, 0]);

		vis.g = d3.select(element)
			.append("svg")
			.attr('class', 'svg-canvas')
			.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
			//.attr('class', 'group-container')
			.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

		vis.xAxisGroup = vis.g.append('g').attr('transform', `translate(0, ${HEIGHT})`);
		vis.yAxisGroup = vis.g.append('g');

		vis.g.append('text')
			.attr('x', WIDTH / 2)
			.attr('y', HEIGHT + 40)
			.text('Age')
			.attr('font-size', 'smaller')
			.attr('text-anchor', 'middle')

		vis.g.append('text')
			.attr('x', - HEIGHT / 2)
			.attr('y', -40)
			.attr('text-anchor', 'middle')
			.text('Height (cm)')
			.attr('transform', 'rotate(-90)')
			.attr('font-size', 'smaller')

		vis.update(data)
	}

	update(data) {
		let vis = this;
		vis.data = data

		vis.x.domain([0, d3.max(vis.data, d => Number(d.age))]);
		vis.y.domain([0, d3.max(vis.data, d => Number(d.height))]);

		const xAxisCall = d3.axisBottom(vis.x);
		const yAxisCall = d3.axisLeft(vis.y);
		vis.xAxisGroup.transition(1000).call(xAxisCall);
		vis.yAxisGroup.transition(1000).call(yAxisCall);

		//circles
		const circles = vis.g.selectAll('circle').data(vis.data, d => d.name);

		const joined = circles.join(
			function (enter) {
				return enter
					.append('circle')
					//.attr('cy', vis.y(0))
					.attr('cy', d => vis.y(d.height))
					.attr('cx', d => vis.x(d.age))
					.attr('r', 10)
					.attr('fill', 'red')
					.on('click', d => {
						//vis.updateName(d.name);
					})
					.call(enter => enter.transition(1000)
						//.attr('cy', d => vis.y(d.height))
						.attr('r', 6)
						.attr('fill', 'grey'))
			},

			function (update) {
				return update.transition(1000)
					.attr('cx', d => vis.x(d.age))
					.attr('cy', d => vis.y(d.height))
					.attr('r', 6)
					.attr('fill', 'grey')
			},

			function (exit) {
				return exit
					.transition(1000)
					.attr('cy', vis.y(0))
					.remove();
			}
		)

		console.log(joined)

		joined.on('mouseenter', function (d) {
			console.log(d)
			d3.select(this)
				.style('fill', 'orange')
				.attr('r', 7)
			vis.updateName(d.name);

			//circle.attr('fill', 'orange')
			//circle.style('background-color', 'red')
			//d3.select(this).style('fill', 'orange')
		})
			.on('mouseout', function () {
				d3.select(this).style('fill', 'grey')
					.attr('r', 6)
				vis.updateName(null)
			})


	}
}

export default D3Chart