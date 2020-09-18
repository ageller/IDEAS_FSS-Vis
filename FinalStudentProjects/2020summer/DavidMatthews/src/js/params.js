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


		// Ia Sprite
		this.sprite_Ia_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')]; 
		this.sprite_Ia_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_Ia_index = 0


		// Ib Sprite		
		this.sprite_Ib_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')];  
		this.sprite_Ib_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_Ib_index = 0


		// Ic Sprite
		this.sprite_Ic_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')]; 
		this.sprite_Ic_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_Ic_index = 0


		// Ib/c Sprite
		this.sprite_Ibc_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')];  
		this.sprite_Ibc_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_Ibc_index = 0


		// IIb Sprite
		this.sprite_IIb_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')];  
		this.sprite_IIb_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_IIb_index = 0


		// IIn Sprite
		this.sprite_IIn_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')];  
		this.sprite_IIn_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_IIn_index = 0


		// II L Sprite
		this.sprite_IIL_Options = [new THREE.TextureLoader().load('src/textures/disc.png'),
							  	  new THREE.TextureLoader().load('src/textures/square.png'),
							  	  new THREE.TextureLoader().load('src/textures/triangle.png'),
							  	  new THREE.TextureLoader().load('src/textures/star.png')];  
		this.sprite_IIL_OptionsGUI = {'Circle':0,
								 	 'Square':1,
								 	 'Triangle':2,
								 	 'Star':3}
		this.sprite_IIL_index = 0


		//for the material of the points
		this.size_Ia = 2;
		this.size_Ib = 2;
		this.size_Ic = 2;
		this.size_Ibc = 2;
		this.size_IIb = 2;
		this.size_IIn = 2;
		this.size_IIL = 2;

		this.alphaTest = 0.1;
		this.sizeAttenuation = true;

		//define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolateReds,
								d3.interpolateViridis,
								d3.interpolatePlasma,
								d3.interpolateRainbow];
		this.colorMapOptionsGUI = {'reds':0,
								   'viridis':1,
								   'plasma':2,
								   'rainbow':3}
		this.colorMapIndex = 0;
		this.colorMap = this.colorMapOptions[this.colorMapIndex];
		this.colorMapMin = 0;
		this.colorMapMax = 15;

		this.time = 2020;

		this.checkbox_Ia = true;
		this.checkbox_Ib = true;
		this.checkbox_Ic = true;
		this.checkbox_Ibc = true;
		this.checkbox_IIb = true;
		this.checkbox_IIn = true;
		this.checkbox_IIL = true;

	};


}
