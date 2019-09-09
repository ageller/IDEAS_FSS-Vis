//this creates the user interface (gui)
//http://workshop.chromeexperiments.com/examples/gui
function createUI(){


	//redrawing every time is not the fastest, but it works for this number of points

	params.gui = new dat.GUI();
	params.gui.add( params, 'size', 0,100).onChange(drawScene);
	params.gui.add( params, 'alphaTest', 0,1).onChange(drawScene);
	params.gui.add( params, 'sizeAttenuation').onChange(drawScene);
	params.gui.add( params, 'colorMapMin', 0,20).onChange(drawScene);
	params.gui.add( params, 'colorMapMax', 0.,50).onChange(drawScene);
	params.gui.add( params, 'colorMapIndex', params.colorMapOptionsGUI).onChange(drawScene).name('colorMap');
    params.gui.add( params, 'IncrementIndex', params.IncrementOptionsGUI).onChange(drawScene);
    params.gui.add( params, 'timeMax', 1980, 2020).onChange(drawScene).listen();

}
