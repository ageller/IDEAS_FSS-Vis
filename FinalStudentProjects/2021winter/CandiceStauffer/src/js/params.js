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
		this.zmax = 1e10;
		this.zmin = 1;
		this.fov = 45

		//for gui
		this.gui = null;
		this.nopan = true;

		//a texture for the points (from here https://github.com/mrdoob/three.js/blob/master/examples/textures/sprites)
		this.sprite = new THREE.TextureLoader().load( 'src/textures/spark1.png' );

		//for the material of the points
		this.size = 50;
		this.alphaTest = 0.5;
		this.sizeAttenuation = false; 

		//define some colors (https://github.com/d3/d3-scale-chromatic)
		this.colorMapOptions = [d3.interpolateMagma];

								
		this.colorMapIndex = 0;

		this.colorMap = this.colorMapOptions[this.colorMapIndex];

		this.colorMapMin = 10;
		this.colorMapMax = 15;

		// // Color By Options
	


		this.colorbyGUI = {'None':0,
						   'Sky Brightness':1,
						   'Moon Phase': 2,
						   'Cloud': 3,
						   'Air Mass':4
								} 

		this.colorbyIndex = 0;


		// / Days the slider will start at 
		this.Days_Since_Start = 0 ;

		this.Day_Interval = 10; 


        //for sphere
        this.sphere = null;
        this.contour_sphere = null;
		this.axes_sphere = null;

		this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.contour_material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
     	// this.axes_material = new THREE.MeshBasicMaterial( {transparent: true, opacity: 0.9} );

		     	// Ra/Dec Axes 

		var smap_axes = new THREE.TextureLoader().load("src/textures/shifted_star_map.jpg");
	
		this.axes_material = new THREE.MeshBasicMaterial( {
                	side: THREE.BackSide,
                	transparent: true,
                	opacity: 1,
                	map: smap_axes
                	});

		// params.axes_material.rotation = new THREE.Vector3( 0,0,90); // Change rotation of the axes 

     	// Draw the sphere for the image to be plotted on--- Search equirectangular for background img




                      
		this.drawAxesSphere = function(){
                        //sphere geometry

                 

                        if (params.axes_sphere != null){
                                params.scene.remove(params.axes_sphere);
                        }
                        var axes_geometry = new THREE.SphereGeometry(50., 64, 64, 0., 2.*Math.PI, 0., Math.PI)
                        params.axes_sphere = new THREE.Mesh( axes_geometry, params.axes_material );
                        

                        params.axes_sphere.rotation.set(-5.8,-5.7,-5.7);

                        params.axes_sphere.scale.set(-2.1,2.1,2.1); // Change the size of the sphere so it reaches out to the length of the points

                        params.scene.add( params.axes_sphere );

                        params.axes_sphere.position.set(-1, 0,1); 





                }



	};


}


