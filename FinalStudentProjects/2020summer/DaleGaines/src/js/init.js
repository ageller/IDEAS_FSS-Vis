//this initializes everything needed for the scene
function init(){

	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	var aspect = screenWidth / screenHeight;

	// renderer
	params.renderer = new THREE.WebGLRenderer( {
		antialias: true,
        premultipliedAlpha: false 
	} );
	params.renderer.setSize(screenWidth, screenHeight);

	params.container = document.getElementById('WebGLContainer');
	params.container.appendChild( params.renderer.domElement );

	// scene
	params.scene = new THREE.Scene();     

	// camera
	params.camera = new THREE.PerspectiveCamera( params.fov, aspect, params.zmin, params.zmax);
	params.camera.position.z = 150;
	params.scene.add(params.camera);  

	// events
	THREEx.WindowResize(params.renderer, params.camera);

	//controls
	params.controls = new THREE.TrackballControls( params.camera, params.renderer.domElement );
}

//this is the animation loop
var i = 0
function animate(time) {
	requestAnimationFrame(animate);
    if (params.incrementIndex == 1) {
        i = i + 1 
        if (params.time <= 49000) {
            params.time = params.time + 50;
        } else {
            params.time = 0;
        };
        drawScene();
        populateScatter(params.scatterx, params.scattery, params.time)
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

//draw scatter
    makeScatter();
}

//runs on load
Promise.all([
    d3.csv('src/data/medium.csv'),
    d3.csv('src/data/stats.csv')
]).then(function(files) {
    defineParams();
    params.data = files[0];
    params.stats = files[1];
    console.log(files[0]);
    console.log(files[1]);
    WebGLStart();
}).catch(function(error){
    console.log('ERROR:', error)
})
