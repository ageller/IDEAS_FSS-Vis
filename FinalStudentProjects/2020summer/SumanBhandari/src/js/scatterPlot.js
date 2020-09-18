//some global variables (not the best style, but will work for us)
var data;

// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 100},
	width = 200;// - margin.left - margin.right,
	height = 200;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleSequential(d3.interpolateViridis).domain([0, 1500]);

function scatterPlot(inputData){

	data = inputData;
	console.log(data);

	// now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr('id','scatterSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	//nice does what it sounds like : gives you nice round values
	x.domain(d3.extent(data, function(d) { return +d.Time; })).nice();
	y.domain(d3.extent(data, function(d) { return +d.Temperature; })).nice();

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.style("stroke","white")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -85)
		.attr("y", 30)
		.style("text-anchor", "end")
		.text("Time (ps)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -55)
		.attr("y", -55)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Temperature (K)")


	//add the data and the legend to the scatter plot
	populateScatter(x, y)


}

function populateScatter(x, y){

	var svg = d3.select('#scatterSVG');

	var colors = []; //for the legend

	//add all the dots
	svg.selectAll(".dot")
		.data(data).enter()
		.append("circle")
			.attr("class", "dot")
			.attr("r", 5)
			.attr("cx", function(d) { return x(+d.Time); })
			.attr("cy", function(d) { return y(+d.Temperature); })
			.style("fill", function(d) {
				//for the legend
				if(!colors.includes(+d.Dist)) {
					colors.push(+d.Dist);
				}
				return colorMap(+d.Dist);
			})
			.style("opacity",0.7);



	//add a legend, using the colors array defined above
	var legend = svg.selectAll(".legend")
		.data(colors).enter()
		.append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate("+margin.right+"," + i * 20 + ")"; });

	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function (d) {return colorMap(d)});

	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d; });

}
