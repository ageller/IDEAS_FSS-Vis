var margin_r = {top: 20, right: 20, bottom: 20, left: 20};
	width_r = 400 - margin_r.left - margin_r.right,
	height_r = 400 - margin_r.top - margin_r.bottom,
	formatPercent_r = d3.format(".1%");

var svg_r = d3.select("#redline_map").append("svg")
	.attr("width", width_r + margin_r.left + margin_r.right)
	.attr("height", height_r + margin_r.top + margin_r.bottom)
	.append("g")
		.attr("transform", "translate(" + margin_r.left + "," + margin_r.top + ")");

tooltip_r = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.json, "redlines_only.geojson")
	.defer(d3.json, "counties-10m.json")
	.await(ready);

var legendText_r = ["A", "B", "C", "D", "E","F"];
var legendColors_r = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02"];


function ready(error, data, us) {
    
    // Read in data 
    console.log(data)

	data.features.forEach(function(d) {
		//console.log(d.properties.White)
		d.properties.holc_int = +d.properties.holc_int;

	});

	var color = d3.scale.threshold()
		.domain([1,2,3,4,5,6])
		.range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02"]);

	// Set up map

	var projection = d3.geo.albersUsa()
		.scale(width_r)
		.translate([width_r / 2, height_r / 2]);

	var path = d3.geo.path()
		.projection(projection);


	var blockShapes = svg_r.selectAll(".block")
		.data(data.features)
		.enter()
		.append("path")
			.attr("class", "block")
			.attr("d", path);

/*
	blockShapes
		.on("mouseover", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 1);
			tooltip.html(
			"<p><strong>" + d.properties.years[1996][0].county + ", " + d.properties.years[1996][0].state + "</strong></p>" +
			"<table><tbody><tr><td class='wide'>Smoking rate in 1996:</td><td>" + formatPercent((d.properties.years[1996][0].rate)/100) + "</td></tr>" +
			"<tr><td>Smoking rate in 2012:</td><td>" + formatPercent((d.properties.years[2012][0].rate)/100) + "</td></tr>" +
			"<tr><td>Change:</td><td>" + formatPercent((d.properties.years[2012][0].rate-d.properties.years[1996][0].rate)/100) + "</td></tr></tbody></table>"
			)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});
		*/

	// Add state outlines

	svg_r.append("path")
		.datum(topojson.feature(us, us.objects.states, function(a, b) { return a !== b; }))
			.attr("class", "states")
			.attr("d", path);

			
	// Make a legend

	var legend = svg_r.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(6))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width_r - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors_r[i]; });

	legenditem.append("text")
		.attr("x", width_r - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText_r[i]; });


	// Color by given input data
	blockShapes.style("fill", function(d) {
			//console.log(+d.properties.White)
			return color(d.properties.holc_int)
	})
	


/*
	function update(year){
		slider.property("value", year);
		d3.select(".year").text(year);
		countyShapes.style("fill", function(d) {
			return color(d.properties.years[year][0].rate)
		});
	}

	var slider = d3.select(".slider")
		.append("input")
			.attr("type", "range")
			.attr("min", 1996)
			.attr("max", 2012)
			.attr("step", 1)
			.on("input", function() {
				var year = this.value;
				update(year);
			});

update(1996);
*/

}

//d3.select(self.frameElement).style("height", "685px");