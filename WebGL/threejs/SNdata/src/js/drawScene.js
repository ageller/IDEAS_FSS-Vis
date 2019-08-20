//this will draw the scene (with lighting)
function drawScene(){

	//clear everything first
	while (params.scene.children.length > 0){ 
		params.scene.remove(params.scene.children[0]); 
	}


	var geometry = new THREE.Geometry();
	
	//range of luminosities
	//var extent = d3.extent(params.data, function(d) { return +d.log10lum; });
	params.colorMap = params.colorMapOptions[params.colorMapIndex];
	cmap = d3.scaleSequential(params.colorMap);
	var extent = [params.colorMapMin, params.colorMapMax];
	cmap.domain(extent).nice();

	params.data.forEach(function(d){
		geometry.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

		//color by SN luminosity
		geometry.colors.push(new THREE.Color(cmap(d.log10lum)));

		
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

