//all "global" variables are contained within params object
var params;
function defineParams(){
	params = new function() {
		//to hold the data
		this.data;
		
		this.container = null;
		this.renderer = null;
		this.scene = null;

		//for frustum      
		this.zmax = 5.e10;
		this.zmin = 1;
		this.fov = 45.

		//for gui
		this.gui = null;

		//a texture for the points (from here https://github.com/mrdoob/three.js/blob/master/examples/textures/sprites)
		this.sprite = new THREE.TextureLoader().load( 'src/textures/disc.png' );

		//for the material of the points
		this.size = 2;
		this.alphaTest = 0.1;
		this.sizeAttenuation = true;

		//define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolatePlasma, 
								d3.interpolateViridis,
								d3.interpolateWarm,
								d3.interpolateCool];
		this.colorMapOptionsGUI = {'plasma':0,
				   				  'viridis':1,
				   				  'warm':2,
				   				  'cool':3
								}
		this.colorMapIndex = 0;
		this.colorMap = this.colorMapOptions[this.colorMapIndex];
		this.colorMapMin = 6;
		this.colorMapMax = 11;

	};


}
