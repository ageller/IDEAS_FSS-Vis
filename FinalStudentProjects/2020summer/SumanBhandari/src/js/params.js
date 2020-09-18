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
		this.sprite = new THREE.TextureLoader().load( 'src/textures/sprite.png' );

		//for the material of the points
		this.size = 200;
		this.alphaTest = 0.1;
		this.sizeAttenuation = true;

		//define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolateReds,
								d3.interpolateViridis,
								d3.interpolateRdBu];
		this.colorMapOptionsGUI = {'Reds':0,
								   'viridis':1,
									 'RdBu':2
								}
		this.colorMapIndex = 0;
		this.colorMap = this.colorMapOptions[this.colorMapIndex];
		this.colorMapMin = 12302.86;
		this.colorMapMax = 40000;

		//time
		this.time = 0.1;

		// Value of x coordinates
		this.xVal = 1500;
		this.yVal = 1500;
		this.zVal = 1500;

	};


}
