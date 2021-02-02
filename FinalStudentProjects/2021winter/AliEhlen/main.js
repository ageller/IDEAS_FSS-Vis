function plot_all(data, grdata) {

    // x, y, svg for tilemap
    plots.tile.x = d3.scaleLinear().range([0, params.tilemargins.width]);
    plots.tile.y = d3.scaleBand().range([ params.tilemargins.height, 0 ]);

    plots.tile.x.domain(pad_value(d3.extent(data, function(d) { return +d.kT; }),0.05,0.15));
    plots.tile.y.domain(params.linkerdomain).padding(0.075);

    var tile_axislabels = ["reduced temperature T*", "number of linkers"]
    plots.tile.svg = plot_axes(plots.tile.x, plots.tile.y, tile_axislabels, "#tilemap", params.tilemargins)

    // x, y, svg for g(r)
    plots.gr.x = d3.scaleLinear().range([0, params.grmargins.width]);
    plots.gr.y = d3.scaleLinear().range([ params.grmargins.height, 0 ]);
    
    plots.gr.x.domain(d3.extent(grdata, function(d) { return +d.r; }));
    plots.gr.y.domain(d3.extent(grdata, function(d) { return +d.g; }));
    plots.gr.y_zoomed = plots.gr.y;

    var gr_axislabels = ["r (R)", "g(r)"]
    plots.gr.svg = plot_axes(plots.gr.x, plots.gr.y, gr_axislabels, "#gr", params.grmargins)

    //add a slider to define the current congress
    add_number_wheel(data);

    // add button to clear g(r)
    add_button(plots.gr.svg);

    // add title to tilemap
    add_title(plots.tile.svg);

    // populate the tilemap plot
    add_rectangles(data, plots.tile.svg, plots.tile.x, plots.tile.y);

    // add zoomability
    add_zoom();

};

//runs on load
Promise.all([
    d3.csv("data/db.csv"),
    d3.csv("data/gr_data.csv"),
    ]).then(function(d) {
        define_params(d);
        define_plots();
		plot_all(params.data, params.grdata);
	})
	.catch(function(error){
		console.log('ERROR:', error)	
	})


