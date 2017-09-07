define([
	'd3',
    	'mod/linegraph',
    	'mod/networkgraph',
    	'mod/bargraph'
],
function(d3, line_graph, network_graph, bar_graph) {

	function module() {

		var main_controller = {};
		var linegraph = line_graph();
		var bargraph = bar_graph();
		var networkgraph = network_graph();
		var current = 0;
		var partition;
		var maxLength;

		function bindTabs() {
			d3.selectAll(".tab").on("click", function(){
				if (!(d3.select(this).classed("selected_tab"))){
					var selector = "#" + this.id + "_page";
					d3.selectAll(".tab").classed("selected_tab", false);
					d3.select(this).classed("selected_tab", true);
					d3.selectAll(".page").classed("hidden_element", true);
					d3.select(selector).classed("hidden_element", false);
				}
			})
		}

		function setPartition(direction) {
			if (direction === "partition_up" && current-25 >= 0){
				current -= 25;
			} else if (direction === "partition_down" && current+25 <= maxLength) {
				current += 25;
			} else if (direction === "partition_up" && current-25 < 0) {
				current = 0;
			} else if (direction === "partition_down" && current+25 > maxLength) {
				current = maxLength;
			}
			partition = traffic_bytes.slice(current, current+25);
		}

		function bindPartitionButtons() {
			d3.selectAll(".btn").on("click", function() {
				setPartition(this.id);
				bargraph.draw(partition, bindPartitionButtons);
			})
		}

		main_controller.init = function(datamanager) {
			time_data = datamanager.prepTimeData(time_data);
			linegraph.draw(time_data);

			traffic_bytes = datamanager.prepTrafficData(traffic_bytes);
			maxLength = traffic_bytes.length;
			partition = traffic_bytes.slice(current, current+25);
			bargraph.draw(partition, bindPartitionButtons);

			followed_by = datamanager.prepFollowedData(followed_by);
			networkgraph
				.timeMin(datamanager.followTimeMin())
				.timeMax(datamanager.followTimeMax())
				.barMax(datamanager.followSuccess())
				.barMin(datamanager.followFail());
			networkgraph.draw(followed_by);

			bindTabs();
		}

		return main_controller;

	}

	return module;

})