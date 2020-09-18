// this creates the user interface (gui)
// http://workshop.chromeexperiments.com/examples/gui
//
function redraw() {
    drawScene();
    populateScatter(params.scatterx, params.scattery, params.time);
}

function createUI(){

    timeExtent = d3.extent(params, function(d) { return +d.time })
	// redrawing every time is not the fastest, but it works for this number of points
	
	params.gui = new dat.GUI();
	params.gui.add( params, 'colorMapMin', 0, params.maxChains-1).onChange(redraw);
	params.gui.add( params, 'colorMapMax', 0, params.maxChains-1).onChange(redraw);
	params.gui.add( params, 'colorMapIndex', params.colorMapOptionsGUI).onChange(redraw).name('colorMap');
	params.gui.add( params, 'time', 0, 50000).step(50).onChange(redraw).listen().name('Time');
    params.gui.add( params, 'incrementIndex', params.incrementOptionsGUI).onChange(redraw).name('Play');
    
}
