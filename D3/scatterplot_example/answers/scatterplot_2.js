//NOTE: you could use .nest (http://bl.ocks.org/phoebebright/raw/3176159/)
// to select only certain congress numbers.
// I chose to use .filter (https://bl.ocks.org/d3noob/47b319ec0250b4063063942c64f0f949)


//some global variables (not the best style, but will work for us)
var data;
var party;

// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 500;// - margin.left - margin.right,
	height = 500;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
var colorMap = d3.scaleSequential(d3.interpolateSinebow).domain([Math.log10(100), Math.log10(5000)]);

var x,y;
function init(inputData){

	data = inputData[0];
	party = inputData[1];

	//define the scales for the plot: these will convert from pixels to data units
	x = d3.scaleLinear().range([0, width]);
	y = d3.scaleLinear().range([height, 0]);

	//nice does what it sounds like : gives you nice round values 
	x.domain(d3.extent(data, function(d) { return +d.x_dimension; })).nice();
	y.domain(d3.extent(data, function(d) { return +d.alt_dimension; })).nice();

	//define the axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	//add a slider to define the current congress
	var slider = d3.select("#container").append('div')
	slider.append('input')
		.attr('id','congressN')
		.attr('type','range')
		.attr('min',1)
		.attr('max',114)
		.on("input", function() {
			populateScatter(+this.value);
		})
	slider.append('label')
		.attr('for','congressN')
		.style('display','inline-block')
		.style('width','240px')
		.style('text-align','right')
		.html('Showing Congress Number : <span id="congressN-value"></span>')

	// now create the svg element
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr('id','scatterSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width -20)
		.attr("y", 40)
		.style("text-anchor", "end")
		.text("x_dimension");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -20)
		.attr("y", -50)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("alt_dimension")



	//starting point
	var currentCongress = 114;

	//select the data we want to plot, add the points and legend to the scatter plot
	populateScatter(currentCongress);

}


function populateScatter(currentCongress){

	var svg = d3.select('#scatterSVG');

	//remove the legend 
	svg.selectAll(".legend").remove();

	//remove the dots
	svg.selectAll(".dot").remove();

	// adjust the text on the range slider
	d3.select("#congressN-value").text(currentCongress);
	d3.select("#congressN").property("value", currentCongress);



	var colors = []; //for the legend

	//add all the dots
	svg.selectAll(".dot")
		.data(data).enter()
		.filter(function(d) { return d.congress_number == currentCongress })
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
					return colorMap(Math.log10(+d.party_code));
				})
				.style("opacity",0.7)


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
		.style("fill", function (d) {return colorMap(Math.log10(d))});

	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {			
			var label = "foo"
			party.forEach(function(p){
				if (p.code == d) label = p.party; 
			});
			return label;
		});
}

//runs on load
Promise.all([
    d3.csv("data/congress_data.csv"),
    d3.csv("data/voteView_partyCode.csv"),
]).then(function(d) {
	init(d)
})
.catch(function(error){
	console.log('ERROR:', error)	
})
