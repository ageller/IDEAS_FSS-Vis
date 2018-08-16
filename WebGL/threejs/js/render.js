//all "global" variables are contained within params object
var params;
function defineParams(){
	params = new function() {

		this.container = null;
		this.renderer = null;
		this.scene = null;

		//for frustum      
		this.zmax = 5.e10;
		this.zmin = 1;
		this.fov = 45.

		//for gui
		this.gui = null;


		//for sphere
		this.sphere = null
		this.radius = 5.;
		this.widthSegments = 32;
		this.heightSegments = 32;
		this.phiStart = 0;
		this.phiLength = 2.*Math.PI;
		this.thetaStart = 0;
		this.thetaLength = Math.PI;
		this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

		this.drawSphere = function(){
			//sphere geometry
			if (params.sphere != null){
				params.scene.remove(params.sphere);
			}
			var geometry = new THREE.SphereGeometry(params.radius, params.widthSegments, params.heightSegments, params.phiStart, params.phiLength, params.thetaStart, params.thetaLength)
			params.sphere = new THREE.Mesh( geometry, params.material );
			params.scene.add( params.sphere );
		}
	};


}

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
	params.camera.position.z = 30;
	params.scene.add(params.camera);  

	// events
	THREEx.WindowResize(params.renderer, params.camera);

	//controls
	params.controls = new THREE.TrackballControls( params.camera, params.renderer.domElement );


}

//this creates the user interface (gui)
function createUI(){

	params.gui = new dat.GUI();
	params.gui.add( params, 'radius', 1,30).onChange(params.drawSphere);
	params.gui.add( params, 'widthSegments', 3,32).onChange(params.drawSphere);
	params.gui.add( params, 'heightSegments', 3,32).onChange(params.drawSphere);
	params.gui.add( params, 'phiStart', 0.,2.*Math.PI).onChange(params.drawSphere);
	params.gui.add( params, 'phiLength', 0.,2.*Math.PI).onChange(params.drawSphere);
	params.gui.add( params, 'thetaStart', 0.,2.*Math.PI).onChange(params.drawSphere);
	params.gui.add( params, 'thetaLength', 0.,2.*Math.PI).onChange(params.drawSphere);

}

//this will draw the scene (with lighting)
function drawScene(){

	//draw the sphere
	params.material = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
	params.drawSphere();

	//lights
	var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	// lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	// lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

	lights[ 0 ].position.set( 0, 200, 0 );
	// lights[ 1 ].position.set( 100, 200, 100 );
	// lights[ 2 ].position.set( - 100, - 200, - 100 );

	lights.forEach(function(element){
		params.scene.add(element);
	})


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



//called upon loading
WebGLStart();

