//this will draw the scene (with lighting)
function drawScene(){

	//clear everything first
	while (params.scene.children.length > 0){ 
		params.scene.remove(params.scene.children[0]); 
	}


	var geometry_Ia = new THREE.Geometry();
	var geometry_Ib = new THREE.Geometry();
	var geometry_Ic = new THREE.Geometry();
	var geometry_Ibc = new THREE.Geometry();
	var geometry_IIb = new THREE.Geometry();
	var geometry_IIn = new THREE.Geometry();
	var geometry_IIL = new THREE.Geometry();
	
	//define the colormap
	params.colorMap = params.colorMapOptions[params.colorMapIndex];
	cmap = d3.scaleSequential(params.colorMap);
	var extent = [params.colorMapMin, params.colorMapMax];
	cmap.domain(extent).nice();

	params.data.forEach(function(d){

// Ia 
		if (d.t < params.time & d.type == 'Ia' & params.checkbox_Ia == true){
			geometry_Ia.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_Ia.colors.push(new THREE.Color(cmap(d.log10lum)));		
		}


// Ib
		if (d.t < params.time & d.type == 'Ib' & params.checkbox_Ib == true){
			geometry_Ib.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_Ib.colors.push(new THREE.Color(cmap(d.log10lum)));		
		}

// Ic
		if (d.t < params.time & d.type == 'Ic' & params.checkbox_Ic == true){
			geometry_Ic.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_Ic.colors.push(new THREE.Color(cmap(d.log10lum)));
		}

// Ibc
		if (d.t < params.time & d.type == 'Ib/c' & params.checkbox_Ibc == true){
			geometry_Ibc.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_Ibc.colors.push(new THREE.Color(cmap(d.log10lum)));
		}
		
// IIb
		if (d.t < params.time & d.type == 'IIb' & params.checkbox_IIb == true){
			geometry_IIb.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_IIb.colors.push(new THREE.Color(cmap(d.log10lum)));		
		}


// IIn		
		if (d.t < params.time & d.type == 'IIn' & params.checkbox_IIn == true){
			geometry_IIn.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_IIn.colors.push(new THREE.Color(cmap(d.log10lum)));
		}

// IIL
		if (d.t < params.time & d.type == 'II L' & params.checkbox_IIL == true){
			geometry_IIL.vertices.push( new THREE.Vector3( d.x, d.y, d.z ) );

			//color by distance
			//dist = Math.sqrt(d.x*d.x + d.y*d.y + d.z*d.z);

			//color by luminosity
			geometry_IIL.colors.push(new THREE.Color(cmap(d.log10lum)));
		}
	});

// Ia 
	var materialParams_Ia = {size: params.size_Ia,
				  map: params.sprite_Ia_Options[params.sprite_Ia_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_Ia = new THREE.PointsMaterial(materialParams_Ia);
	var mesh_Ia = new THREE.Points(geometry_Ia, material_Ia );

// Ib 
	var materialParams_Ib = {size: params.size_Ib,
				  map: params.sprite_Ib_Options[params.sprite_Ib_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_Ib = new THREE.PointsMaterial(materialParams_Ib);
	var mesh_Ib = new THREE.Points(geometry_Ib, material_Ib );

// Ic
	var materialParams_Ic = {size: params.size_Ic,
				  map: params.sprite_Ic_Options[params.sprite_Ic_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_Ic = new THREE.PointsMaterial(materialParams_Ic);
	var mesh_Ic = new THREE.Points(geometry_Ic, material_Ic );

// Ibc
	var materialParams_Ibc = {size: params.size_Ibc,
				  map: params.sprite_Ibc_Options[params.sprite_Ibc_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_Ibc = new THREE.PointsMaterial(materialParams_Ibc);
	var mesh_Ibc = new THREE.Points(geometry_Ibc, material_Ibc );

// IIb
	var materialParams_IIb = {size: params.size_IIb,
				  map: params.sprite_IIb_Options[params.sprite_IIb_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_IIb = new THREE.PointsMaterial(materialParams_IIb);
	var mesh_IIb = new THREE.Points(geometry_IIb, material_IIb );

// IIn
	var materialParams_IIn = {size: params.size_IIn,
				  map: params.sprite_IIn_Options[params.sprite_IIn_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_IIn = new THREE.PointsMaterial(materialParams_IIn);
	var mesh_IIn = new THREE.Points(geometry_IIn, material_IIn );

// IIL
	var materialParams_IIL = {size: params.size_IIL,
				  map: params.sprite_IIL_Options[params.sprite_IIL_index], 
				  transparent: true,
				  alphaTest: params.alphaTest,
				  sizeAttenuation: params.sizeAttenuation,
				  vertexColors: THREE.VertexColors };
	var material_IIL = new THREE.PointsMaterial(materialParams_IIL);
	var mesh_IIL = new THREE.Points(geometry_IIL, material_IIL );

// mesh all the things!

	params.scene.add(mesh_Ia)
	params.scene.add(mesh_Ib)
	params.scene.add(mesh_Ic)
	params.scene.add(mesh_Ibc)
	params.scene.add(mesh_IIb)
	params.scene.add(mesh_IIn)
	params.scene.add(mesh_IIL)

}

