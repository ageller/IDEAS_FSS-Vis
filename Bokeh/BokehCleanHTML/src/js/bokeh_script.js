(function() {
	var fn = function() {
		Bokeh.safely(function() {
			(function(root) {
				function embed_document(root) {
					
				// we don't need this line anymore because we define the variable in bokeh_data.js
				//var docs_json = document.getElementById('1876').textContent;
				var render_items = [{"docid":"6a85a80a-62fc-48fc-955f-9abbfbfb703d","root_ids":["1547"],"roots":{"1547":"1d529cc0-58d9-4759-8921-870865eba0ad"}}];
				root.Bokeh.embed.embed_items(docs_json, render_items);
			
				}
				if (root.Bokeh !== undefined) {
					embed_document(root);
				} else {
					var attempts = 0;
					var timer = setInterval(function(root) {
						if (root.Bokeh !== undefined) {
							clearInterval(timer);
							embed_document(root);
						} else {
							attempts++;
							if (attempts > 100) {
								clearInterval(timer);
								console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
							}
						}
					}, 10, root)
				}
			})(window);
		});
	};
	if (document.readyState != "loading") fn();
	else document.addEventListener("DOMContentLoaded", fn);
})();