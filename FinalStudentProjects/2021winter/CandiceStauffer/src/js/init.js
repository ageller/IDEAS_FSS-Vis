

//this initializes everything needed for the scene

function init(){

	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	var aspect = screenWidth / screenHeight;

	// renderer
	params.renderer = new THREE.WebGLRenderer( {
		antialias:true,
	} );
	params.renderer.setSize(screenWidth, screenHeight);

	params.container = document.getElementById('WebGLContainer');
	params.container.appendChild( params.renderer.domElement );

	// scene
	params.scene = new THREE.Scene();     

	// camera
	params.camera = new THREE.PerspectiveCamera( params.fov, aspect, params.zmin, params.zmax);
	params.camera.up.set(-1,0,1);
	params.camera.position.z = 1;


	// events
	THREEx.WindowResize(params.renderer, params.camera);

	//controls
	params.controls = new THREE.TrackballControls( params.camera, params.renderer.domElement );


}

//this is the animation loop
function animate(Days_Since_Start) {
	requestAnimationFrame( animate );
	params.controls.update();
	params.renderer.render( params.scene, params.camera );
}


//this is called to start everything
function WebGLStart(){

//initialize everything
	init();

//create the UI
	createUI();

// Could draw axes here?

//draw everything
	drawScene();

//begin the animation
	animate();
}



//runs on load
d3.csv('src/data/Cart_Rubin_data.csv')
	.then(function(d) {
		defineParams();
		params.data = d;
		console.log(d);
		WebGLStart();
	})
	.catch(function(error){
		console.log('ERROR:', error)
	})