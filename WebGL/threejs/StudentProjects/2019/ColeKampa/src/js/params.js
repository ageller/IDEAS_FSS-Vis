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
		this.size = 3;
		this.alphaTest = 0.1;
		this.sizeAttenuation = true;

		//define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolateReds,
								d3.interpolateViridis,
                                d3.interpolateRdBu];
		this.colorMapOptionsGUI = {'reds':0,
								   'viridis':1,
                                   'redblue':2
								}
		this.colorMapIndex = 1;
		this.colorMap = this.colorMapOptions[this.colorMapIndex];
		this.colorMapMin = 6;
		this.colorMapMax = 12;
        // add a maximum year
        this.timeMax = 1980.;
        // turn auto animation loop on or off
		this.IncrementOptionsGUI = {'Off':0, 'On':1};
        this.IncrementIndex = 0;
	};


}
