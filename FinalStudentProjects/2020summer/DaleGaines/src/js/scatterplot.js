//some global variables (not the best style, but will work for us)
// define the size of the svg
var margin = {top: 50, right: 50, bottom: 50, left: 100},
	width = 500;// - margin.left - margin.right,
	height = 200;// - margin.top - margin.bottom;

//define some colors (https://github.com/d3/d3-scale-chromatic)
cmap = d3.scaleSequential(params.colorMap);
var extent = [params.colorMapMin, params.colorMapMax];
cmap.domain(extent).nice();

function makeScatter() {
    data = params.stats;

	// now create the svg element
	var svg = d3.select("#scatter_container").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr('id','scatterSVG')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//define the scales: these will convert from pixels to data units
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	//nice does what it sounds like : gives you nice round values 
	x.domain(d3.extent(data, function(d) { return +d.time; })).nice();
	// y.domain(d3.extent(data, function(d) { return +d.energy; })).nice();
    y.domain([0, 50000]).nice()

	//define the axes
	var xAxis = d3.axisBottom(x).ticks(5);
	var yAxis = d3.axisLeft(y).ticks(5);

	// add the axes to the SVG element
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width-15)
		.attr("y", 40)
		.style("text-anchor", "middle")
		.text("Time (fs)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("x", -25)
		.attr("y", -80)
		.attr("dy", ".71em")
		.style("text-anchor", "middle")
		.text("Energy");

	//add the data and the legend to the scatter plot
    params.scatterx = x;
    params.scattery = y;
	populateScatter(x, y, params.time);
}

function populateScatter(x, y, t){

    d3.selectAll(".dot").remove();

	var svg = d3.select('#scatterSVG');

	svg.selectAll(".dot")
		.data(data).enter()
		.append("circle")
			.attr("class", "dot")
			.attr("cx", function(d) { return x(+d.time); })
			.attr("cy", function(d) { return y(+d.energy); })
			.style("opacity",function(d) {
                if (d.time <= t) {
                    return 1;
                } else {
                    return 0.1;
                }})
            .style("fill", cmap(params.colorMapMax)) 
            .attr("r", 3);
};

function updateScatter(x, y, t){

	var svg = d3.select('#scatterSVG');

	svg.selectAll(".dot")
		.style("opacity",function(d) {
                if (d.time <= t) {
                    return 1;
                } else {
                    return 0.1;
                }})
};
