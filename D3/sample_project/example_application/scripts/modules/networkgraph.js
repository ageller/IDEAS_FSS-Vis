define([
	'd3'
],
function(d3) {

	function module() {

		var network_graph = {};
		var time_min, time_max, bar_min, bar_max;
		var tooltip = d3.select("body").append("div").attr("class", "toolTip");
		var formatTime = d3.timeFormat("%X");

		function checkActionType(action) {
			if (action > 0) {
				return " successful attempts.";
			}
			return " failed attempts."
		}

		function mousemove(d) {
		    	tooltip
			        .style("left", d3.event.pageX - 50 + "px")
			        .style("top", d3.event.pageY - 80 + "px")
			        .style("display", "inline-block")
			        .html((d.user) + " had:" + "<br>" + (Math.abs(d.count)) + checkActionType(d.count) + "<br>Logged: " + formatTime(d.time));
		};

		function mouseout(d) {
	        	tooltip
	        		.style("display", "none");
		};

		network_graph.draw = function(input_data) {
			var svg = d3.select("#followed_graph_svg"),
				margin = {top: 20, right: 30, bottom: 40, left: 125},
				width = +svg.attr("width") - margin.left - margin.right,
				height = +svg.attr("height") - margin.top - margin.bottom,
				bigXMargin = 0;
			
			if (Math.abs(bar_min) > bar_max) {
				bar_max = Math.abs(bar_min);
			}

			var x = d3.scaleTime()
				.range([0, width])
				.domain([time_min, time_max]);

			var y = d3.scaleBand()
				.range([height, 0])
				.domain(input_data.map(function(d) { return d.user; })).padding(0.05);

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			g.append("g")
			    	.attr("class", "x axis")
				.attr("transform", "translate(" + bigXMargin + "," + height + ")")
			    	.call(d3.axisBottom(x).ticks(d3.timeHour.every(2)));

			g.append("g")
				.attr("class", "y net_y axis")
				.call(d3.axisLeft(y));

			d3.selectAll(".net_y").selectAll(".tick").classed("net_y_tick", true);

			function make_y_gridlines() {		
    				return d3.axisLeft(y);
			}

			g.append("svg")		
      				.attr("class", "grid")
      				.call(make_y_gridlines()
          				.tickSize(-width)
          				.tickFormat("")
      			)

			g.selectAll(".bar")
			    .data(input_data)
			    .enter().append("svg")
			    .attr("x", 0)
			    .attr("height", y.bandwidth())
			    .attr("y", function(d) { return y(d.user) })
			    .attr("width", width )
				.attr("class", function(d) {
					return d.user + "_row";
				})

			var halfWidth = y.bandwidth()/2,
				small_y = d3.scaleLinear()
					.range([0, halfWidth])
					.domain([0, bar_max]).nice();

			var j = input_data.length,
				i;
			for (i = 0; i < j; i++) {
				var row_selector = "." + input_data[i].user + "_row",
					row = svg.select(row_selector);

				row.selectAll(".follow_chart")
					.data(input_data[i].result)
					.enter().append("rect")
					.attr("class", function(d) { return "bar bar--" + (d.count < 0 ? "negative" : "positive"); })
					.attr("width", 8)
					.attr("height",function(d) { return 3+small_y(Math.abs(d.count)) })
					.attr("x", function(d) { return x(d.time) })
					.attr("y", function(d) { 
						if (d.count > 0) {
							return halfWidth-3-small_y(d.count);
						}
						return halfWidth+1;
					})
					.on("mousemove", mousemove)
		        		.on("mouseout", mouseout);
			}    
		}

		network_graph.timeMin = function(_x) {
			if (!arguments.length) {
				return time_min;
			}
			time_min = _x;
			return this;
		}

		network_graph.timeMax = function(_x) {
			if (!arguments.length) {
				return time_max;
			}
			time_max = _x;
			return this;
		}

		network_graph.barMax = function(_x) {
			if (!arguments.length) {
				return bar_max;
			}
			bar_max = _x;
			return this;
		}

		network_graph.barMin = function(_x) {
			if (!arguments.length) {
				return bar_min;
			}
			bar_min = _x;
			return this;
		}

		return network_graph;

	}

	return module;

})