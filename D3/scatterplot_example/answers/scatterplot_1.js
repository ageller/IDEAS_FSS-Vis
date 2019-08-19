
//some global variables (not the best style, but will work for us)
var data;

// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 500;// - margin.left - margin.right,
	height = 500;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleSequential(d3.interpolatePlasma).domain([100, 500]);

function init(inputData){

	data = inputData;

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
	x.domain(d3.extent(data, function(d) { return +d.x_dimension; })).nice();
	y.domain(d3.extent(data, function(d) { return +d.alt_dimension; })).nice();

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -20)
		.attr("y", 30)
		.style("text-anchor", "end")
		.text("x_dimension");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -40)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("alt_dimension")

	//add the data and the legend to the scatter plot
	populateScatter(x, y);


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
			.attr("cx", function(d) { return x(+d.x_dimension); })
			.attr("cy", function(d) { return y(+d.alt_dimension); })
			.style("fill", function(d) { 
				//for the legend
				if(!colors.includes(+d.party_code)) {
					colors.push(+d.party_code);
				}
				return colorMap(+d.party_code);
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

//runs on load
d3.csv('data/congress_data114.csv')
	.then(function(d) {
		init(d)
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})
