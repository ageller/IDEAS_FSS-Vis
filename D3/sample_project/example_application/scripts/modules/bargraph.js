define([
	'd3'
],
function(d3) {

	function module() {

		var bar_graph = {};

		bar_graph.draw = function(input_data, callback_binding) {
			input_data.sort(function(a, b) { return a.result.sum_bytes - b.result.sum_bytes; });
			var svg = d3.select("#bar_graph_svg");
			svg.attr("height", input_data.length*25);    

			var margin = {top: 50, right: 20, bottom: 30, left: 200},
				width = +svg.attr("width") - margin.left - margin.right,
				height = +svg.attr("height") - margin.top - margin.bottom;
			var xDomainMax = d3.max(input_data, function(d) { return d.result.sum_bytes; });

			svg.selectAll("g").remove();

			var tooltip = d3.select("body").append("div").attr("class", "toolTip");

			var x = d3.scaleLinear()
				.range([1, width])
				.domain([0, xDomainMax]);

			var y = d3.scaleBand()
				.range([height, 0])
				.domain(input_data.map(function(d) { return d.result["All_Traffic.src"] + " to " + d.result["All_Traffic.dest"]; })).padding(0.1);

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var color = d3.scaleLinear()
				.domain([0, xDomainMax])
				.range(["#d8bfd8", "#8601af"]);

			g.append("g")
			    .attr("class", "x axis")
			    .call(d3.axisTop(x).ticks(5).tickFormat(function(d) { return parseInt(d / 1000) + "kb"; }).tickSizeInner([-height]));

			g.append("g")
				.attr("class", "y axis")
				.call(d3.axisLeft(y));

			g.selectAll(".bar")
				.data(input_data)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("x", 0)
				.attr("height", y.bandwidth())
				.attr("y", function(d) { return y(d.result["All_Traffic.src"] + " to " + d.result["All_Traffic.dest"]) })
				.attr("width", function(d) { return x(d.result.sum_bytes); })
				.style("fill", function(d) { return color(d.result.sum_bytes); })
				.on("mousemove", mousemove)
		        	.on("mouseout", mouseout);
	        
	        	function mousemove(d) {
		    		tooltip
			        	.style("left", d3.event.pageX - 50 + "px")
			        	.style("top", d3.event.pageY - 70 + "px")
			        	.style("display", "inline-block")
			        	.html((d.result.sum_bytes) + " bytes" + "<br>From " + (d.result["All_Traffic.src"]) + " to " + (d.result["All_Traffic.dest"]));
		};

			function mouseout(d) {
	        		tooltip
	        			.style("display", "none");
			};

	        	if (callback_binding) {
	        		callback_binding();
	        	}
		}

		return bar_graph;

	}

	return module;

})