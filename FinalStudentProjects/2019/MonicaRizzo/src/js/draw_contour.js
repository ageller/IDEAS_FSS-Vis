
function linInterp(x, x_vals, y_vals) {

	for (var i = 0; i < x_vals.length-1; i++){
		if (x > x_vals[i+1]) {
			var m = (y_vals[i+1] - y_vals[i]) / (x_vals[i+1] - x_vals[i])
			var b = y_vals[i+1] - m * x_vals[i+1]	
			
			return m*x + b
		}
	}

}


function saveFile(strData, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
                document.body.appendChild(link); //Firefox requires the link to be in the body
                link.download = filename;
                link.href = strData;
                link.click();
                document.body.removeChild(link); //remove the link when done
        } else {
                console.log("can't save file");
                return;
                //location.replace(uri);
        }

};


function calcCI() {


	var level = linInterp(params.ci/100., params.integral, params.integral_x);


	var data = [{
	
		z: params.z_data, 
		x: params.x_data,
		y: params.y_data, 
		type: 'contour', 
		showscale: false,
		colorscale: 'Electric', 
		line: {
			width: 8,
		},
		contours: {
			coloring: 'lines',
			start: level, 
			end: level,
			size: level
		}
	
	}];


	var layout = {
		xaxis: {range: [2.*Math.PI, 0.], 
			zeroline: false,
			showgrid: false},

		yaxis: {range: [-1.*Math.PI, Math.PI],
			showgrid:false, 
			zeroline:false},

 		 paper_bgcolor: 'rgba(0,0,0,0)',
 		 plot_bgcolor: 'rgba(0,0,0,0)',

  		margin: {
    		l: 0,
    		r: 0,
    		b: 0,
    		t: 0,
    		pad: 0
  		}
	};


	var gd = Plotly.newPlot('plotlyChart', data, layout);
	return gd;
};





//this will draw the scene (with lighting)
function drawScene(uri){


	smap_contour = new THREE.TextureLoader().load(uri);
	

        smap = new THREE.TextureLoader().load("src/textures/shifted_star_map.jpg");

        
	//draw the sphere
        params.material = new THREE.MeshBasicMaterial( {
                side: THREE.DoubleSide,
                map: smap,
                });
        params.drawSphere();


	//draw the sphere
        params.contour_material = new THREE.MeshBasicMaterial( {
                side: THREE.BackSide,
                transparent: true,
                opacity: 0.8,
                map: smap_contour,
                });
        params.drawContourSphere();


	if (params.rd_axes == true) {
		smap_axes = new THREE.TextureLoader().load("src/textures/celestial_grid_shifted.png");
	
		params.axes_material = new THREE.MeshBasicMaterial( {
                	side: THREE.BackSide,
                	transparent: true,
                	opacity: 0.9,
                	map: smap_axes,
                	});
        	params.drawAxesSphere();
	
	} 
	
	else {
	
		params.axes_material = new THREE.MeshBasicMaterial( {
                         transparent: true,
                        opacity: 0.9});
                params.drawAxesSphere();
	
	}

        

}


function drawContour(uri) {

	smap_contour = new THREE.TextureLoader().load(uri);

	//draw contour sphere
        params.contour_material = new THREE.MeshBasicMaterial( {
                side: THREE.BackSide,
                transparent: true,
                opacity: 0.8,
                map: smap_contour,
                });
        params.drawContourSphere();
}

function generateTexture(){

	return new Promise(function (resolve, reject){
	
		console.log("Creating new texture");
		var gd = calcCI();
		resolve(gd);
	});
};


function drawAll(){
	
	let checkPromise = generateTexture();

	checkPromise.then(function (result) {
		console.log(result);
		url = Plotly.toImage(result, {width: 8192., height: 4095.});
		return url;

	}).then(function(result) {

		console.log("drawing");
		console.log(result);
		drawScene(result);
	});

}


//On parameter update, redraw contour
function redrawContour(){

	let checkPromise = generateTexture();
	
	checkPromise.then(function (result) {
                console.log(result);
                url = Plotly.toImage(result, {width: 8192., height: 4095.});
                return url;

        }).then(function(result) {

                console.log("drawing");
                console.log(result);
                drawContour(result);
        });

}


//On parameter update: redraw Ra/Dec axes
function redrawAxes(){

	if (params.rd_axes == true) {
        
		smap_axes = new THREE.TextureLoader().load("src/textures/celestial_grid_shifted.png");

                params.axes_material = new THREE.MeshBasicMaterial( {
                        side: THREE.BackSide,
                        transparent: true,
                        opacity: 0.9,
                        map: smap_axes,
                        });
                params.drawAxesSphere();

        }

        else {

                params.axes_material = new THREE.MeshBasicMaterial( {
                         transparent: true,
                        opacity: 0.9});
                params.drawAxesSphere();

        }

}

