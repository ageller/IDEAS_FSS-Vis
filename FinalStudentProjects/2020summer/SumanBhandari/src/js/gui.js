//this creates the user interface (gui)
//http://workshop.chromeexperiments.com/examples/gui
function createUI(){


	//redrawing every time is not the fastest, but it works for this number of points
	// ----> Change these
	params.gui = new dat.GUI();
	params.gui.add( params, 'size', 40,500).onChange(drawScene);
	params.gui.add( params, 'alphaTest', 0,1).onChange(drawScene);
	params.gui.add( params, 'sizeAttenuation').onChange(drawScene);
	//params.gui.add( params, 'colorMapMin', -10,10).onChange(drawScene);
	//params.gui.add( params, 'colorMapMax', 55000.,60000).onChange(drawScene);
	params.gui.add( params, 'colorMapIndex', params.colorMapOptionsGUI).onChange(drawScene).name('colorMap');
	params.gui.add( params, 'time', 0.,4.0).step(0.01).onChange(drawScene);
	//params.gui.add( params, 'time', params.timeGUI).onChange(drawScene).name('time');

	params.gui.add( params, 'xVal', -1500,1500).onChange(drawScene);
	params.gui.add( params, 'yVal', -1500,1500).onChange(drawScene);
	params.gui.add( params, 'zVal', -1500,1500).onChange(drawScene);

}
