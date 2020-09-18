var margin_cd = {top: 20, right: 20, bottom: 20, left: 20};
	width_cd = 400 - margin_cd.left - margin_cd.right,
	height_cd = 400 - margin_cd.top - margin_cd.bottom,
	formatPercentDemo = d3.format(".1%");

var svg_cd = d3.select("#demo_map_chicago").append("svg")
	.attr("width", width_cd + margin_cd.left + margin_cd.right)
	.attr("height", height_cd + margin_cd.top + margin_cd.bottom)
	.append("g")
		.attr("transform", "translate(" + margin_cd.left + "," + margin_cd.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.json, "gradedblocks_holc_cook.geojson")
	.defer(d3.json, "counties-10m.json")
	.await(ready);

var legendText_cd = ["", "10%", "25%", "40%", "60%", "80%"];
var legendColors_cd = ['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b'];


function ready(error, data, us) {
    console.log(data)
    // Read in data 

	data.features.forEach(function(d) {
		d.properties.pt_wt = +d.properties.pt_wt;
		d.properties.pt_b = +d.properties.pt_b;
		d.properties.pt_nbnw = +d.properties.pt_nbnw;
		d.properties.county = d.properties.county;
		d.properties.state= d.properties.state;

	});

	var color = d3.scale.threshold()
		.domain([0, 10, 25, 40, 60, 80, 100])
		.range(['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b']);

	// Set up map

	var projection = d3.geo.albersUsa()
		.scale(25000)
		.translate([width_cd / 2 - 2850, height_cd / 2 + 1520]);

	var path = d3.geo.path()
		.projection(projection);


	var blockShapes = svg_cd.selectAll(".block")
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
			"<p><strong>" + d.properties.county + ", " + d.properties.state+ "</strong></p>" +
			"<table><tbody><tr><td class='wide'>Percent White:</td><td>" + formatPercentDemo(d.properties.pt_wt/100) + "</td></tr>" +
			"<tr><td>Percent Black:</td><td>" + formatPercentDemo(d.properties.pt_b/100)+ "</td></tr>" +
			"<tr><td>Percent Non-White, Non-Black:</td><td>" + formatPercentDemo(d.properties.pt_nbnw/100) + "</td></tr></tbody></table>"
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

	svg_cd.append("path")
		.datum(topojson.feature(us, us.objects.counties, function(a, b) { return a !== b; }))
			.attr("class", "counties")
			.attr("d", path);
		
	// Make a legend

	var legend = svg_cd.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(6))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width_cd - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors_cd[i]; });

	legenditem.append("text")
		.attr("x", width_cd - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText_cd[i]; });


	// Color by given input data
	blockShapes.style("fill", function(d) {
			//console.log(+d.properties.White)
			return color(d.properties.pt_wt)
	})
	



	function update(demo){
		blockShapes.style("fill", function(d) {
			if (demo == "White") {
				  return color(d.properties.pt_wt);
			}
			else if (demo == "Black") {
				  return color(d.properties.pt_b);
			}
			else if (demo == "Non-Black, Non-White") {
				  return color(d.properties.pt_nbnw);
			}
			
		});
	}


	d3.select("select")
	  .on("change",function(d){
	    var selected = d3.select("#d3-dropdown").node().value;
	    //
	    var year = this.value;
	    update(selected);
	})

/*
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
*/
update("White");

}
