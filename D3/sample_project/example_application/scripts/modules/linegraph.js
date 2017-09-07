define([
	'd3'
],
function(d3) {

	function module() {

		var line_graph = {};

		var values_extent = [], 
			dates_extent = [],
			svg = d3.select("#line_graph_svg"),
			margin = {top: 50, right: 125, bottom: 30, left: 100},
			width = svg.attr("width") - margin.left - margin.right,
			height = svg.attr("height") - margin.top - margin.bottom,
			g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		line_graph.draw = function(input_data) {	

			var x = d3.scaleTime()
				.range([0, width]);

			var y = d3.scaleLinear()
				.range([height, 0]);

			var voronoi = d3.voronoi()
				.x(function(d) { 
					return x(d.date); 
				})
				.y(function(d) { 
					return y(d.value); 
				})
				.extent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);

			var line = d3.line()
				.x(function(d) { 
					return x(d.date); 
				})
				.y(function(d) { 
					return y(d.value);
				});

			var j = input_data.length,
				i;
			for (i = 0; i < j ; i++) {
				var item = d3.extent(input_data[i]["values"], function(d) { return d.value });
				values_extent = item.concat(values_extent);
				item = d3.extent(input_data[i]["values"], function(d) { return d.date });
				dates_extent = item.concat(dates_extent);
			}

			x.domain(d3.extent(dates_extent, function(d) { 
				return d;
			}));
			y.domain(d3.extent(values_extent, function(d) { 
				return d;
			}));

			g.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x).ticks(d3.timeMinute.every(60)));

			g.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(10))
				.append("text")
				.attr("x", 4)
				.attr("y", 0.5)
				.attr("dy", "0.32em")
				.style("text-anchor", "start")
				.style("fill", "#000")
				.style("font-weight", "bold")
				.text("Data Usage");

			g.append("g")
				.attr("class", "time_users")
				.selectAll("path")
				.data(input_data)
				.enter()
				.append("svg:path")
				.attr("d", function(d) { 
					var j = d.values.length,
						i;
					for (i = 0; i < j; i++) {
						d.values[i].line = this;
					}
					return line(d["values"]) 
				});

			var focus = g.append("g")
				.attr("transform", "translate(-100,-100)")
				.attr("class", "focus");

			focus.append("circle")
				.attr("r", 3.5);

				console.log(input_data)

			focus.append("text")
				.attr("y", -10);

			var voronoiGroup = g.append("g")
				.attr("class", "voronoi");

			voronoiGroup.selectAll("path")
				.data(voronoi.polygons(
					d3.merge(
						input_data.map(
							function(d) { 
								return d.values; 
							}))))
				.enter().append("path")
				.attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
				.on("mouseover", mouseover)
				.on("mouseout", mouseout);

			function mouseover(d) {
				d3.select(d.data.line).classed("time_user--hover", true);
				d.data.line.parentNode.appendChild(d.data.line);
				focus.attr("transform", "translate(" + x(d.data.date) + "," + y(d.data.value) + ")");
				focus.select("text").text("IP: " + d.data.user + ", Usage: " + d.data.value);
				d3.select(".axis--y").selectAll("text").classed("fade_text", true);
			}

			function mouseout(d) {
				d3.select(d.data.line).classed("time_user--hover", false);
				focus.attr("transform", "translate(-100,-100)");
				d3.select(".axis--y").selectAll("text").classed("fade_text", false);
			}
		};

		return line_graph;

	}

	return module;

})