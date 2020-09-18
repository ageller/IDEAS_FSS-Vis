var margin_epa = {top: 20, right: 20, bottom: 20, left: 20};
	width_epa = 1000 - margin_epa.left - margin_epa.right,
	height_epa = 600 - margin_epa.top - margin_epa.bottom,
	formatPercent = d3.format(".2");

var svg_epa = d3.select("#epa_map").append("svg")
	.attr("width", width_epa + margin_epa.left + margin_epa.right)
	.attr("height", height_epa + margin_epa.top + margin_epa.bottom)
	.append("g")
		.attr("transform", "translate(" + margin_epa.left + "," + margin_epa.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

queue()
	.defer(d3.json, "pm25.geojson")
	.defer(d3.json, "o3.geojson")
	.defer(d3.json, "counties-10m.json")
	.await(ready);

var legendText_epa = ["", "3", "", "9", "", "12 ug/m3", ""];
var legendColors_epa = ['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b'];


function ready(error, data, data2, us) {
    console.log(data)
    console.log(data2)
    // Read in data 

    // read in pm data
	data.features.forEach(function(d) {
		d.properties.mean = +d.properties.mean;
		d.properties.pt_b = +d.properties.n99th;
		d.properties.pt_b = +d.properties.n10th;
		d.properties.county = d.properties.county;
		d.properties.state= d.properties.state;
		d.properties.type= d.properties.type;

	});

	// read in o3 data
	data2.features.forEach(function(d2) {
		d2.properties.mean = +d2.properties.mean;
		d2.properties.pt_b = +d2.properties.n99th;
		d2.properties.pt_b = +d2.properties.n10th;
		d2.properties.county = d2.properties.county;
		d2.properties.state= d2.properties.state;

	});

	var color = d3.scale.threshold()
		.domain([0, 3, 6, 9, 12, 15, 18])
		.range(['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#6e016b']);

	// Set up map

	var projection = d3.geo.albersUsa()
		//.scale(25000)
		.translate([width_epa / 2 , height_epa / 2 ]);

	var path = d3.geo.path()
		.projection(projection);

	// Add state outlines

	svg_epa.append("path")
		.datum(topojson.feature(us, us.objects.counties, function(a, b) { return a !== b; }))
			.attr("class", "counties")
			.attr("d", path);

	var blockShapes =svg_epa.selectAll("path")
   		.data(data.features)
   		.enter()
   		.append('path')
   		.attr('d',path)
   		.attr('class', 'data')
   		.attr("fill", function(d) {
			return color(d.properties.mean)
	})


	blockShapes
		.on("mouseover", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 1);
			tooltip.html(
			"<p><strong>" +d.properties.type+ " Concentrations: " + "</strong></p>" + 
			"<table><tbody><tr><td class='wide'>Location:</td><td>"  + d.properties.county + ", " + d.properties.state+ "</td></tr>" +
			"<tr><td>10th %ile:</td><td>" + formatPercent(d.properties.n10th)+ "</td></tr>" +
			"<tr><td>Mean:</td><td>" + formatPercent(d.properties.mean)+ "</td></tr>" +
			"<tr><td>99th %ile:</td><td>" + formatPercent(d.properties.n99th) + "</td></tr></tbody></table>"
			)
			.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function(d) {
			tooltip.transition()
			.duration(250)
			.style("opacity", 0);
		});
		
	// Make a legend

	var legend = svg_epa.append("g")
		.attr("id", "legend");

	var legenditem = legend.selectAll(".legenditem")
		.data(d3.range(6))
		.enter()
		.append("g")
			.attr("class", "legenditem")
			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

	legenditem.append("rect")
		.attr("x", width_epa - 240)
		.attr("y", -7)
		.attr("width", 30)
		.attr("height", 6)
		.attr("class", "rect")
		.style("fill", function(d, i) { return legendColors_epa[i]; });

	legenditem.append("text")
		.attr("x", width_epa - 240)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text(function(d, i) { return legendText_epa[i]; });

	


/*
	function update(demo){
		blockShapes.style("fill", function(d) {
			if (demo == "O3") {
				  return color(d2.properties.mean);
			}
			else if (demo == "PM2.5") {
				  return color(d.properties.mean);
			}
		});
	}
*/
	d3.select("select")
	  .on("change",function(d){
	    var selected = d3.select("#d3-dropdown").node().value;
	    //
	    var year = this.value;
	    update(selected);
	})
/*
update("O3");
*/

}
