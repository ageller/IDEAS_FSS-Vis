//this creates the user interface (gui)
//http://workshop.chromeexperiments.com/examples/gui
function createUI(){


	//redrawing every time is not the fastest, but it works for this number of points
	
	params.gui = new dat.GUI();
	
	var f1 = params.gui.addFolder('SN Type');
	f1.add(params, 'checkbox_Ia').onChange(drawScene).name('Type Ia');
	f1.add(params, 'sprite_Ia_index', params.sprite_Ia_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_Ia', 1,50).onChange(drawScene).name('Size');
	f1.add(params, 'checkbox_Ib').onChange(drawScene).name('Type Ib');
	f1.add(params, 'sprite_Ib_index', params.sprite_Ib_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_Ib', 1,50).onChange(drawScene).name('Size');	
	f1.add(params, 'checkbox_Ic').onChange(drawScene).name('Type Ic');
	f1.add(params, 'sprite_Ic_index', params.sprite_Ic_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_Ic', 1,50).onChange(drawScene).name('Size');
	f1.add(params, 'checkbox_Ibc').onChange(drawScene).name('Type Ib/c');
	f1.add(params, 'sprite_Ibc_index', params.sprite_Ibc_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_Ibc', 1,50).onChange(drawScene).name('Size');
	f1.add(params, 'checkbox_IIb').onChange(drawScene).name('Type IIb');
	f1.add(params, 'sprite_IIb_index', params.sprite_IIb_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_IIb', 1,50).onChange(drawScene).name('Size');
	f1.add(params, 'checkbox_IIn').onChange(drawScene).name('Type IIn');
	f1.add(params, 'sprite_IIn_index', params.sprite_IIn_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_IIn', 1,50).onChange(drawScene).name('Size');
	f1.add(params, 'checkbox_IIL').onChange(drawScene).name('Type II L');
	f1.add(params, 'sprite_IIL_index', params.sprite_IIL_OptionsGUI).onChange(drawScene).name('Marker');
	f1.add(params, 'size_IIL', 1,50).onChange(drawScene).name('Size');



	var f2 = params.gui.addFolder('Color');
	f2.add( params, 'colorMapMin', 0,5).onChange(drawScene).name('Color Min');
	f2.add( params, 'colorMapMax', 0.,15).onChange(drawScene).name('Color Max');
	f2.add( params, 'colorMapIndex', params.colorMapOptionsGUI).onChange(drawScene).name('Color Map');

	var f3 = params.gui.addFolder('Other');
	f3.add( params, 'sizeAttenuation').onChange(drawScene).name('Size Attenuation');
	f3.add( params, 'alphaTest', 0,1).onChange(drawScene).name('Alpha Test');
	f3.add(params, 'time', 1900,2020).onChange(drawScene).name('Time (Year)');


	
}