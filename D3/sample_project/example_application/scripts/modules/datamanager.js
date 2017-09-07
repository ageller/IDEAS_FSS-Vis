define([
	"d3"
],
function(d3) {

	function module() {

		var data_manager = {};

		var timeFormat = d3.timeFormat("%Y-%m-%dT%H:%M:%SZ");

		var followed_time_min = null,
			followed_time_max = 0,
			followed_success = 0,
			followed_fail = 0;

		data_manager.load = function(path, callback) {
		    var httpRequest = new XMLHttpRequest();
		    httpRequest.onreadystatechange = function() {
		        if (httpRequest.readyState === 4) {
		            if (httpRequest.status === 200) {
		                var data = JSON.parse(httpRequest.responseText);
		                if (callback) callback(data);
		            }
		        }
		    };
		    httpRequest.open('GET', path);
		    httpRequest.send(); 
		}

		// O(N log N)
		data_manager.prepTimeData = function(input_data) {
			var output = [],
				tkeys = Object.keys(input_data[0]["result"]),
				j = input_data.length,
				l = tkeys.length,
				i, k;
			for (k = 1; k < l; k++) {
				var item = {};
				item.user = tkeys[k];
				item.values = [];
				for (i = 0; i < j; i++) {
					var entry = {};
					entry.user = tkeys[k];
					entry.date = new Date(input_data[i]["result"]["_time"]);
					entry.value = Number(input_data[i]["result"][tkeys[k]]);
					item.values.push(entry);
				}
				output.push(item);
			}
			return output;
		}

		// O(N) + sort()
		data_manager.prepTrafficData = function(input_data) {
			var j = input_data.length,
		    		i;
		    	for (i = 0; i < j; i++) {
		        	input_data[i].result.sum_bytes = +input_data[i].result.sum_bytes;
		    	}
		    input_data.sort(function(a, b) { return b.result.sum_bytes - a.result.sum_bytes; });
		    return input_data;
		}

		// O(N log (N + sort())) + sort(), yikes! Heavy lifting here (open to feedback on a better way to nested-sort this)
		data_manager.prepFollowedData = function(input_data) {
			var output = [],
				check_hash = {},
				j = input_data.length,
				i;
			for (i = 0; i < j; i++) {
				var d = input_data[i].result,
					user = d["Authentication.user"],
					item = {};
				function addEntry() {
					item.user = user;
					item.time = new Date(d["_time"]);
					if (followed_time_min === null) {
						followed_time_min = item.time;
					}
					if (item.time > followed_time_max) {
						followed_time_max = item.time;
					} else if (!(followed_time_min === null) && item.time < followed_time_min) {
						followed_time_min = item.time;
					}
					if (d["Authentication.action"] === "failure") {
						item.count = -d["count_failure"];
						if (item.count < followed_fail) {
							followed_fail = item.count;
						}
					} else {
						item.count = +d["count_success"];
						if (item.count > followed_success) {
							followed_success = item.count;
						}
					}
					check_hash[user].result.push(item);
				}
				if (!(check_hash[user] === undefined)) {
					addEntry();
				} else {
					check_hash[user] = {};
					check_hash[user].user = user;
					check_hash[user].result = [];
					addEntry();
				}
			}
			var hash_keys = Object.keys(check_hash);
			j = hash_keys.length;
			for (i = 0; i < j; i++) {
				output.push(check_hash[hash_keys[i]]);
				output[i].result.sort(function(a, b) { return a.count - b.count; })
			}
			output.sort(function(a, b) { return b.result[0].count - a.result[0].count; });
			return output;
		}

		data_manager.followTimeMin = function(_x) {
			if (!arguments.length) {
				return followed_time_min;
			}
			followed_time_min = _x;
			return this;
		}

		data_manager.followTimeMax = function(_x) {
			if (!arguments.length) {
				return followed_time_max;
			}
			followed_time_max = _x;
			return this;
		}

		data_manager.followSuccess = function(_x) {
			if (!arguments.length) {
				return followed_success;
			}
			followed_success = _x;
			return this;
		}

		data_manager.followFail = function(_x) {
			if (!arguments.length) {
				return followed_fail;
			}
			followed_fail = _x;
			return this;
		}

		return data_manager;

	}

	return module;

})