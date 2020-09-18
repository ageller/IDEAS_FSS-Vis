// all "global" variables are contained within params object
var params;
function defineParams(){
	params = new function() {
		// to hold the data
		this.data;
        this.stats;
        this.time = 0;
        
        this.maxChains = 4;
		
		this.container = null;
		this.renderer = null;
		this.scene = null;

		// for frustum      
		this.zmax = 1000;
		this.zmin = 0.1;
		this.fov = 45.

		// for gui
		this.gui = null;

		// a texture for the points (from here https://github.com/mrdoob/three.js/blob/master/examples/textures/sprites)
		this.sprite = new THREE.TextureLoader().load( 'src/textures/disc.png' );

		// for the material of the points
		this.size = 3;

		// define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolateViridis,
                                d3.interpolatePlasma];
		this.colorMapOptionsGUI = {'viridis':0,
                                   'plasma':1,
								};
		this.colorMapIndex = 0;
		this.colorMap = this.colorMapOptions[this.colorMapIndex];
		this.colorMapMin = 0;
		this.colorMapMax = this.maxChains-1;

        //  turn auto animation loop on or off
        this.incrementOptionsGUI = {'Off':0, 'On':1};
        this.incrementIndex = 0;

        // holders for populateScatter and updateScatter
        this.scatterx;
        this.scattery;
	};

}
