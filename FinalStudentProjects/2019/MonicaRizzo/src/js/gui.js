function createUI(){

      params.gui = new dat.GUI();
      params.gui.add( params, 'event_name', params.GWEventOptions).onChange(function(){loadData();  drawAll();}).name("Event Name");
      params.gui.add( params, 'ci', 15, 99).onChange(redrawContour).name("CI");
      params.gui.add( params, 'rd_axes').onChange(redrawAxes).name("Axes");	

}

