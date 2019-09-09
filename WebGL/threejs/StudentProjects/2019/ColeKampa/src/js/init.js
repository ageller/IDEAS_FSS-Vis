

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
	params.camera.up.set(-.914, -0.406, -0.022);
	params.camera.position.set(-4720, 10800, -3000);
	params.scene.add(params.camera);

	// events
	THREEx.WindowResize(params.renderer, params.camera);

	//controls
	params.controls = new THREE.TrackballControls( params.camera, params.renderer.domElement );


}

//this is the animation loop
var i = 0;
var start_year = 1980.;
function animate(time) {
	requestAnimationFrame( animate );
    if (params.IncrementIndex == 1) {
        i = i + 1;
        params.timeMax = start_year + (i % 400) / 10. ;
        drawScene();
    };
	params.controls.update();
	params.renderer.render( params.scene, params.camera );
}


//this is called to start everything
function WebGLStart(){

//initialize everything
	init();

//create the UI
	createUI();

//draw everything
	drawScene();

//begin the animation
	animate();
}

//runs on load
d3.csv('src/data/OpenSNCatConverted.csv')
	.then(function(d) {
		defineParams();
		params.data = d;
		console.log(d);
		WebGLStart();
	})
	.catch(function(error){
		console.log('ERROR:', error)
	})
