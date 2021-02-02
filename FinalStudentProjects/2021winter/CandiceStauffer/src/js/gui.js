//this creates the user interface (gui)
//http://workshop.chromeexperiments.com/examples/gui
function createUI(){

	// var timeExtent = d3.extent(params.data, function(d) { return +d.Days_Since_Start; });
	// console.log(timeExtent)
	//redrawing every time is not the fastest, but it works for this number of points
	
	params.gui = new dat.GUI();
	params.gui.add( params, 'Days_Since_Start',   0, 3600).onChange(drawScene).name('Days Since Start');
	params.gui.add( params, 'Day_Interval',   1, 3600).onChange(drawScene).name('Days Interval');
	params.gui.add( params, 'colorbyIndex', params.colorbyGUI).onChange(drawScene).name('Color By');
	params.gui.add( params, 'colorMapMin', -50,100).onChange(drawScene);
	params.gui.add( params, 'colorMapMax', -50,100).onChange(drawScene);




}