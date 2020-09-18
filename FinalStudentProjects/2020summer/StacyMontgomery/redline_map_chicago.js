var margin_c = {top: 20, right: 20, bottom: 20, left: 20};
	width_c = 400 - margin_c.left - margin_c.right,
	height_c = 400 - margin_c.top - margin_c.bottom,
	formatPercent_c = d3.format(".1%");

var svg_c = d3.select("#redline_map_chicago").append("svg")
	.attr("width", width_c + margin_c.left + margin_c.right)
	.attr("height", height_c + margin_c.top + margin_c.bottom)
	.append("g")
		.attr("transform", "translate(" + margin_c.left + "," + margin_c.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.json, "chicago.geojson")
	.defer(d3.json, "counties-10m.json")
	.await(ready);

var legendText_c = ["A", "B", "C", "D", "E","F"];
var legendColors_c = ["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"];


function ready(error, data, us) {
    
    // Read in data 
    console.log(data)

	data.features.forEach(function(d) {
		//console.log(d.properties.White)
		d.properties.holc_int = +d.properties.holc_int;
		d.properties.holc_grade = d.properties.holc_grade;
		d.properties.city = d.properties.city;

	});

	var color = d3.scale.threshold()
		.domain([1,2,3,4,5,6])
		.range(["#fef0d9","#fdd49e","#fdbb84","#fc8d59","#e34a33","#b30000"]);

	// Set up map

	var projection = d3.geo.albersUsa()
		.scale(25000)
		.translate([width_c / 2 - 2850, height_c / 2 + 1520]);

	var path = d3.geo.path()
		.projection(projection);


	var blockShapes = svg_c.selectAll(".block")
		.data(data.features)
		.enter()
		.append("path")
			.attr("class", "block")
			.attr("d", path);


	blockShapes
		.on("mouseover", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 1);
			tooltip.html(
			"<p><strong>" + d.properties.city + ", " + d.properties.state+ "</strong></p>" +
			"<table><tbody><tr><td class='wide'>Redline Grade:</td><td>" + d.properties.holc_grade + "</td></tr></tbody></table>"
			)			
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});
		

	// Add state outlines

	svg_c.append("path")
		.datum(topojson.feature(us, us.objects.counties, function(a, b) { return a !== b; }))
			.attr("class", "counties")
			.attr("d", path);
		
	// Make a legend

	var legend = svg_c.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(6))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width_c - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors_c[i]; });

	legenditem.append("text")
		.attr("x", width_c - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText_c[i]; });


	// Color by given input data
	blockShapes.style("fill", function(d) {
			//console.log(+d.properties.White)
			return color(d.properties.holc_int)
	})
	

}

//d3.select(self.frameElement).style("height", "685px");