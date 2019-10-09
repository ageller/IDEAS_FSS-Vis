//this initializes everything needed for the scene
function init(){
	defineParams()

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
	params.camera.position.z = 0.00001;
	params.scene.add(params.camera);  

	// events
	THREEx.WindowResize(params.renderer, params.camera);

	//controls
	params.controls = new THREE.TrackballControls( params.camera, params.renderer.domElement );

	params.controls.noZoom = true;


}


//this is the animation loop
function animate(time) {
	requestAnimationFrame( animate );
	params.controls.update();
	params.renderer.render( params.scene, params.camera );
}



function startAll(){

	return new Promise(function (resolve, reject){

                console.log("Initializing");
                
		init();

		resolve();

        });
	
}


//this is called to start everything
function WebGLStart(){
	
	let start = startAll();

	start.then(function() {
		console.log("loading data");
		loadData();
	}).then(function(){
		console.log("creating UI");
		createUI();
		
	}).then(function(){ 
	
		console.log("drawing everything");
		drawAll();
		animate();

	});

};


WebGLStart();

