//this will draw the scene (with lighting)
function drawScene(){

	//clear everything first
	while (params.scene.children.length > 0){ 
		params.scene.remove(params.scene.children[0]); 
	}



	var geometry = new THREE.Geometry();




    params.drawAxesSphere(); // Every time you slide the slider, it deletes the axes and draws them back. Could move it to a new function and call it in init
        	// would havet to go up to the "clear everything" while loop and not clear the axes. 
        	// If the object doesn't equal the "axes" object, then clear everything. 
        	// (something to save until the end)

	

/////////////////////////////////////////////////
	
	//define the colormap
	params.colorMap = params.colorMapOptions[params.colorMapIndex]; // Allows you to change the color map. GUI matches up with color change. 
	cmap = d3.scaleSequential(params.colorMap);
	var extent = [params.colorMapMin, params.colorMapMax];
	cmap.domain(extent).nice();



// 
params.data.forEach(function(d){

		// Color By Options
		colorbyoptions = [d.filter,
						  d.skybrightness, 
			              d.moonphase,
			              d.cloud,
			              d.airmass];

		colorby = colorbyoptions[params.colorbyIndex];


		if (d.Days_Since_Start < params.Days_Since_Start  + params.Day_Interval && d.Days_Since_Start > params.Days_Since_Start - params.Day_Interval ){ // could be a slider? allow user to change 1 to a different value

			geometry.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			// color sprites by color by options

			geometry.colors.push(new THREE.Color(cmap(colorby)));

		} 

		
	});


	var materialParams = {size: params.size,
						  map: params.sprite, 
						  transparent: true,
						  alphaTest: params.alphaTest,
						  sizeAttenuation: params.sizeAttenuation,
						  vertexColors: THREE.VertexColors };
	var material = new THREE.PointsMaterial( materialParams );
	var mesh = new THREE.Points( geometry, material );

	params.scene.add( mesh );

}

