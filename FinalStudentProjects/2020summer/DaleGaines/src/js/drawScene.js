// draws line from geometry
function makeLine( geo ) {

        var g = new MeshLine();
        g.setGeometry( geo );

        var material = new MeshLineMaterial( {
                useMap: false,
                color: new THREE.Color( 0xffffff ),
                opacity: 0.2,
                sizeAttenuation: true,
                lineWidth: 0.2
        });
        var mesh = new THREE.Mesh( g.geometry, material );
        
        params.scene.add( mesh );

}

// this will draw the scene (with lighting)
function drawScene(){

    tdata = params.data.filter(d => d.time == params.time) 
	// clear everything first
	while (params.scene.children.length > 0){ 
		params.scene.remove(params.scene.children[0]); 
	}

	
	// define the colormap
	params.colorMap = params.colorMapOptions[params.colorMapIndex];
	cmap = d3.scaleSequential(params.colorMap);
	var extent = [params.colorMapMin, params.colorMapMax];
	cmap.domain(extent).nice();

    // define material
	var materialParams = {size: params.size,
						  map: params.sprite, 
						  transparent: true, 
                          opacity: 0.90,
                          vertexColors: THREE.VertexColors,
                          depthWrite: false, 
                          depthTest: false,
                          alphaTest: 0.2};
	var material = new THREE.PointsMaterial( materialParams );

    // add each molecule to scene
    var group_i;
    for (group_i = 0; group_i < params.maxChains; group_i++) {
        group_data = tdata.filter(d => d.group == group_i);
        console.log(group_i, group_data);
        
        var geometry = new THREE.Geometry();
        var linearray = new THREE.Geometry();
        group_data.forEach(function(g){
            geometry.vertices.push( new THREE.Vector3( g.x, g.y, g.z ) );
            geometry.colors.push(new THREE.Color(cmap(g.group)));

            linearray.vertices.push( new THREE.Vector3( g.x, g.y, g.z ) ); 
        });
        var mesh = new THREE.Points( geometry, material );
        params.scene.add( mesh );
        makeLine( linearray );
    };
}
