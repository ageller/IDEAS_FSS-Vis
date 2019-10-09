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

                //data
		this.GWEventOptions = ['GW150914', 'GW170608', 'GW170814'];
		this.event_name = 'GW150914';

		this.rd_axes = false;	

		this.ci = 90;
		//this.contour_file = this.event_name+"_"+this.ci+"_contour.png";
                this.x_data;
		this.y_data;
                this.z_data;


		this.smap_contour;
		this.contour_uri;


		this.integral_x;
		this.integral;

                //for sphere
                this.sphere = null;
                this.contour_sphere = null;
		this.axes_sphere = null;
	

                this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
                this.contour_material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
             	this.axes_material = new THREE.MeshBasicMaterial( {transparent: true, opacity: 0.9} );



		this.drawContourSphere = function(){
                        //sphere geometry
                        if (params.contour_sphere != null){
                                params.scene.remove(params.contour_sphere);
                        }
                        var contour_geometry = new THREE.SphereGeometry(50., 64, 64, 0., 2.*Math.PI, 0., Math.PI)
                        params.contour_sphere = new THREE.Mesh( contour_geometry, params.contour_material );
                    
			params.contour_sphere.scale.set(-1, 1, 1);
			
				
			params.scene.add( params.contour_sphere );
			params.contour_sphere.position.set(0, 0, 0);
                };

		this.drawAxesSphere = function(){
                        //sphere geometry
                        if (params.axes_sphere != null){
                                params.scene.remove(params.axes_sphere);
                        }
                        var axes_geometry = new THREE.SphereGeometry(50., 64, 64, 0., 2.*Math.PI, 0., Math.PI)
                        params.axes_sphere = new THREE.Mesh( axes_geometry, params.axes_material );


                        params.axes_sphere.scale.set(-1, 1, 1);

                        params.scene.add( params.axes_sphere );

                        params.axes_sphere.position.set(0, 0, 0);

                }

                this.drawSphere = function(){
                        //sphere geometry
                        if (params.sphere != null){
                                params.scene.remove(params.sphere);
                        }
                        var geometry = new THREE.SphereGeometry(50., 64, 64, 0., 2.*Math.PI, 0., Math.PI)
                        params.sphere = new THREE.Mesh( geometry, params.material );
               

			params.sphere.scale.set(-1, 1, 1);

			params.scene.add( params.sphere );

			params.sphere.position.set(0, 0, 0);

                }
        };


}

