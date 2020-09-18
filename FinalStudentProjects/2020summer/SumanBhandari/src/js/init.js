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
	params.camera.up.set(0, -1, 0);
	params.camera.position.z = 30;
	params.scene.add(params.camera);

	// events
	THREEx.WindowResize(params.renderer, params.camera);

	//controls
	params.controls = new THREE.TrackballControls( params.camera, params.renderer.domElement );


}

//this is the animation loop
function animate(time) {
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

//draw everything
	drawScene();

//begin the animation
	animate();

}


Promise.all([
    d3.csv("src/data/PlasmaTemp.csv"),
    d3.csv("src/data/PlasmaPlot.csv"),
]).then(function(d) {
	defineParams();
	params.data = d[0];
	console.log(d[0]);
	WebGLStart();
	scatterPlot(d[1]);
})
.catch(function(error){
	console.log('ERROR:', error)
})


//runs on load
/*
d3.csv('src/data/PlasmaTemp.csv') //--->Add the data location
	.then(function(d) {
		defineParams();
		params.data = d;
		console.log(d);
		WebGLStart();
		scatterPlot(d);
	})
	.catch(function(error){
		console.log('ERROR:', error)
	})
	*/
