//this creates the user interface (gui)
//http://workshop.chromeexperiments.com/examples/gui
function createUI(){

	cmapOptions = 
	params.gui = new dat.GUI();
	params.gui.add( params, 'size', 0,100).onChange(drawScene);
	params.gui.add( params, 'alphaTest', 0,1).onChange(drawScene);
	params.gui.add( params, 'sizeAttenuation').onChange(drawScene);
	params.gui.add( params, 'colorMapMin', -100.,100).onChange(drawScene);
	params.gui.add( params, 'colorMapMax', -100,100).onChange(drawScene);
	params.gui.add( params, 'colorMapIndex', params.colorMapOptionsGUI).onChange(drawScene).name('colorMap');

}