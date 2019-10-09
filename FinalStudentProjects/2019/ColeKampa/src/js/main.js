var data_full;
var data;
var i = 0;

function init() {

    // var data = d3Load("../assets/data/r05_sr01_e000.json");
    // d3Load("../assets/data/r05_sr01_e000.json");

    console.log(data_full);


    // listen to the resize events
    window.addEventListener('resize', onResize, false);

    var camera;
    var scene;
    var renderer;

    // initialize stats
    // var stats = initStats();


    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 100000);

    // show axes in the screen
    // var axes = new THREE.AxesHelper(20);
    var axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    // create a render and set the size
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
        
    // create the ground plane
    // var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeGeometry = new THREE.PlaneGeometry(5400, 10900, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -2700.;
    plane.position.z = 8689.; // (14139 + 3239) / 2

    // add the plane to the scene
    scene.add(plane);



    // var element = document.createElement( 'img' );
    // element.src = '../../assets/images/cd3-ce-and-backgrounds.pdf'

    // var cssObject = new THREE.CSS3DObject( element );
    // cssObject.position = plane.position;
    // cssObject.rotation = plane.rotation;
    // scene.add(cssObject);






    // DS Cryo
    var dsGeom = new THREE.CylinderGeometry( 1900., 1900., 10900., 32, 32, true );
    var dsMaterial = new THREE.MeshLambertMaterial({
        color: 0x7a7a7a,
        wireframe: false,
        side:THREE.DoubleSide,
        // metalness: 1.0,
        // roughness: 0.2
    });
    // var dsMaterial = new.THREE.MeshStandardMaterial({ color: 0x353535, metalness: 1.0 });
    // var dsMaterial = new.THREE.MeshLambertMaterial({color: 0xffffff});//side:THREE.DoubleSide});// metalness: 1.0 });
    var ds = new THREE.Mesh( dsGeom, dsMaterial );

    // Rotate and Position DS
    ds.rotation.x = -0.5 * Math.PI;
    ds.position.set(0, 0, 8689.);
    ds.castShadow = true;
    ds.receiveShadow = true;

    scene.add(ds);


    // Tracker Simple
    // var trackerGeom = new THREE.CylinderGeometry( 680, 680, 3270, 64 );
    var trackerGeom = new THREE.CylinderGeometry( 810, 810, 3270, 64 );
    var trackerMaterial = new THREE.MeshLambertMaterial({ color: 0xebcb4d,
        opacity: 0.5, transparent: true});
    var tracker = new THREE.Mesh( trackerGeom, trackerMaterial );

    // tracker.materials.opacity = 0.5;
    // tracker.materials[0].transparent = true;

    // Rotate and Position tracker
    tracker.rotation.x = -0.5 * Math.PI;
    tracker.position.set(0, 0, 10175.);
    tracker.castShadow = true;


    scene.add(tracker);


    // Stopping Target Simple
    var trackerGeom = new THREE.CylinderGeometry( 680, 680, 3270, 64 );
    var stopTargGeom = new THREE.CylinderGeometry( 75, 75, 800, 64 );
    var stopTargMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000,
        opacity: 0.5, transparent: true});
    var stopTarg = new THREE.Mesh( stopTargGeom, stopTargMaterial );

    // Rotate and Position stopTarg
    stopTarg.rotation.x = -0.5 * Math.PI;
    stopTarg.position.set(0, 0, 5871.);
    stopTarg.castShadow = true;

    scene.add(stopTarg);



    // test lathe
    // var pts = [
    //         new THREE.Vector3(75.,0,800.),//top left
    //         new THREE.Vector3(21.5,0,800.),//top right
    //         new THREE.Vector3(21.5,0,0),//bottom right
    //         new THREE.Vector3(75.0,0,0),//bottom left
    //         new THREE.Vector3(75.0,0,800.)//back to top left - close square path
    //        ];
    // var mesh = new THREE.Mesh( new THREE.LatheGeometry( pts, 12 ), new THREE.MeshLambertMaterial( { color: 0x2D303D, wireframe: true, shading: THREE.FlatShading } ));
    // // mesh.position.y = 150;
    // mesh.overdraw = true;
    // mesh.doubleSided = true;

    // scene.add( mesh );


    /*// Stopping target with hole
    var ringST = new THREE.RingGeometry( 21.5, 75.0 );

    var extrudeSettings = {
        steps: 2,
        depth: 800,
        bevelEnabled: false
    };

    var stopTargGeomExtrude = new THREE.ExtrudeGeometry( new THREE.Shape(ringST), extrudeSettings );
    var stopTargMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000,
        opacity: 0.5, transparent: true});

    // var stopTarg = new THREE.Mesh( stopTargGeomExtrude, stopTargMaterial );
    var stopTarg = new THREE.Mesh( ringST, stopTargMaterial );

    // Rotate and Position stopTarg
    // stopTarg.rotation.x = -0.5 * Math.PI;
    stopTarg.position.set(0, 0, 5871.);
    stopTarg.castShadow = true;

    scene.add(stopTarg);
*/

    // electron!
    var electronGeometry = new THREE.SphereGeometry(40, 20, 20);
    var electronMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    var electron = new THREE.Mesh(electronGeometry, electronMaterial);

    // position the electron
    // var pos = data[0];
    // console.log(pos);
    // electron.position.set(pos.X, pos.Y, pos.Z);
    electron.castShadow = true;

    // add the electron to the scene
    scene.add(electron);


    // electron path
    var epathMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var epathGeometry = new THREE.Geometry();
    var j;
    for (j = 0; j < data.length; j++) {
    // for (j = 0; j < 100; j++) {
        epathGeometry.vertices.push(new THREE.Vector3(data[j].X,data[j].Y,data[j].Z))
    }
    var epath = new THREE.Line( epathGeometry, epathMaterial);
    
    var materialParams = {size: 20,
                          //map: params.sprite,
                          transparent: true,
                          alphaTest: 0.9,
                          //sizeAttenuation: params.sizeAttenuation,
                          vertexColors: THREE.VertexColors };
                      // };
    var pointsMaterial = new THREE.PointsMaterial( materialParams );
    var epoints = new THREE.Points(epathGeometry, pointsMaterial);


    epath.name = "epath";
    epoints.name = "epoints";
    // epath.visible = false;
    scene.add(epath);
    scene.add(epoints);


    // Bfield Vector
    var BDir = new THREE.Vector3( data[i].Bx_scaled, data[i].By_scaled, data[i].Bz_scaled );
    var BOrigin = electron.position;
    var BArrowHelper = new THREE.ArrowHelper( BDir.normalize(), BOrigin, BDir.length() * 500, 0xff0000);

    scene.add(BArrowHelper);

    // Force
    var FDir = new THREE.Vector3( data[i].Fx_scaled, data[i].Fy_scaled, data[i].Fz_scaled );
    var FOrigin = electron.position;
    var FArrowHelper = new THREE.ArrowHelper( FDir.normalize(), FOrigin, FDir.length() * 500, 0x00ff00);

    scene.add(FArrowHelper);

    // Velocity
    var VDir = new THREE.Vector3( data[i].Vx_scaled, data[i].Vy_scaled, data[i].Vz_scaled );
    var VOrigin = electron.position;
    var VArrowHelper = new THREE.ArrowHelper( VDir.normalize(), VOrigin, VDir.length() * 500, 0x0000ff);

    scene.add(VArrowHelper);



    // position and point the camera to the center of the scene
    camera.position.x = 0;//1000;//1000;
    camera.position.y = 3000;//2000;
    camera.position.z = 0;//6000;//9000;  
    //camera.position.set(-13500., 850., 8000.)
    
    // camera.position.set(electron.position);
    // camera.translateZ(-50);
    // camera.position.set(0, -2700, 86)

    // camera.lookAt(scene.position);
    // camera.lookAt(plane.position);
    // camera.lookAt(electron.position);
    var camLook = new THREE.Vector3(0,0, electron.position.z);
    // console.log(camLook);
    camera.lookAt(camLook);
    
    // add subtle ambient lighting
    var ambienLight = new THREE.AmbientLight(0x151515);
    scene.add(ambienLight);

    // add spotlight for the shadows
    // var spotLight = new THREE.SpotLight(0xffffff);
    // spotLight.position.set(0, 0, 2000);//8689+1000);
    // spotLight.castShadow = true;
    // scene.add(spotLight);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(0,10,0);
    scene.add( directionalLight );

    var pointLight = new THREE.PointLight();
    pointLight.position.set(0, 0, 0);

    scene.add( pointLight );

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

     // initialize the trackball controls and the clock which is needed
    // var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();
    // trackballControls.target = new THREE.Vector3(0,-2700,8689);
    //trackballControls.target = plane.position
    // trackballControls.target = sphere.position

    // call the render function
    // var step = 0;
    var play = false;
    var flip = false;

    var controls = new function () {
        // this.outputPlanePos = function () {
        //     console.log(plane.position);
        // }
        // this.outputCamPos = function () {
        //     console.log(camera.position);
        // }
        // this.outputBDir = function () {
        //     console.log(BArrowHelper);
        // }
        this.particleOptionsGUI = {'normal':2,
                                   'smallbounce':15,
                                   'bigbounce':6,
                                   'low-pt':12
                                }
        this.particleIndex = 2;
        this.reset = function() {
            i = 0;
        }
        this.play_pause = function () {
            if (play == false){
                play = true;
            } else {
                play = false;
            }
        }

        this.flip_cam = function () {
            if (flip == false) {
                flip = true;
            } else {
                flip = false;
            }
        }
        // this.velocity_x = data.Vx;
        // this.o
        this.camRadius = 3000;
        this.camTheta = 1.2;//Math.PI/2;
        this.camPhi = 0;
    };
    // console.log(controls);

    var monitor = new function () {
        this.X=0;
        this.Y=0;
        this.Z=0;
        this.Vx=0;
        this.Vy=0;
        this.Vz=0;
        this.Bx=0;
        this.By=0;
        this.Bz=0;
        this.Fx=0;
        this.Fy=0;
        this.Fz=0;
        this.time=0;
        this.i = i;
        // this.V = {'Vx': pos.Vx, 'Vy': pos.Vy, 'Vz': pos.Vz};
    };

    var visibility = new function () {
        this.DetectorSolenoid = function () {
            if (ds.visible == true) {
                ds.visible = false;
            } else {
                ds.visible = true;
            }
        }
        this.StoppingTarget = function () {
            if (stopTarg.visible == true) {
                stopTarg.visible = false;
            } else {
                stopTarg.visible = true;
            }
        }
        this.Tracker = function () {
            if (tracker.visible == true) {
                tracker.visible = false;
            } else {
                tracker.visible = true;
            }
        }
        this.Electron = function () {
            if (electron.visible == true) {
                electron.visible = false;
            } else {
                electron.visible = true;
            }
        }
        this.ElectronTrack = function () {
            if (epath.visible == true) {
                epath.visible = false;
            } else {
                epath.visible = true;
            }
        }
        this.ElectronTiming = function () {
            if (epoints.visible == true) {
                epoints.visible = false;
            } else {
                epoints.visible = true;
            }
        }
        this.Plane = function () {
            if (plane.visible == true) {
                plane.visible = false;
            } else {
                plane.visible = true;
            }
        }
        this.OriginAxes = function () {
            if (axes.visible == true) {
                axes.visible = false;
            } else {
                axes.visible = true;
            }
        }
        this.MagneticField = function () {
            if (BArrowHelper.visible == true) {
                BArrowHelper.visible = false;
            } else {
                BArrowHelper.visible = true;
            }
        }
        this.Velocity = function () {
            if (VArrowHelper.visible == true) {
                VArrowHelper.visible = false;
            } else {
                VArrowHelper.visible = true;
            }
        }
        this.Force = function () {
            if (FArrowHelper.visible == true) {
                FArrowHelper.visible = false;
            } else {
                FArrowHelper.visible = true;
            }
        }
    }

    var menu = new function () {
        this.mainmenu = function () {
            var x = document.getElementById("mainmenu");
            console.log(x.style.display);
            if (x.style.display == "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
            console.log(x.style.display);
            // if (MenuHtml.visible == true) {
            //     MenuHtml.visible = false;
            // } else {
            //     MenuHtml.visible = true;
            // }
        }
    }



    var gui = new dat.GUI();

    gui.add(controls, 'particleIndex', controls.particleOptionsGUI).onChange(function() {i=0});

    var f0 = gui.addFolder('Toggle Elements');
    var f00 = f0.addFolder ('Vectors');
    f00.add(visibility, 'MagneticField');
    f00.add(visibility, 'Velocity');
    f00.add(visibility, 'Force');
    f0.add(visibility, 'DetectorSolenoid');
    f0.add(visibility, 'StoppingTarget');
    f0.add(visibility, 'Tracker');
    f0.add(visibility, 'Electron');
    f0.add(visibility, 'ElectronTrack');
    f0.add(visibility, 'ElectronTiming');
    f0.add(visibility, 'Plane');
    f0.add(visibility, 'OriginAxes');

    var f1 = gui.addFolder('Monitor');
    var f10 = f1.addFolder('Position');
    var f11 = f1.addFolder('Velocity');
    var f12 = f1.addFolder('Magnetic Field');
    var f13 = f1.addFolder('Force');

    f10.add(monitor, 'X').listen();
    f10.add(monitor, 'Y').listen();
    f10.add(monitor, 'Z').listen();

    f11.add(monitor, 'Vx').listen();
    f11.add(monitor, 'Vy').listen();
    f11.add(monitor, 'Vz').listen();

    f12.add(monitor, 'Bx').listen();
    f12.add(monitor, 'By').listen();
    f12.add(monitor, 'Bz').listen();

    f13.add(monitor, 'Fx').listen();
    f13.add(monitor, 'Fy').listen();
    f13.add(monitor, 'Fz').listen();

    f1.add(monitor, 'time').listen();
    // f1.add(monitor, 'z', -10, 10);

    var f2 = gui.addFolder("Camera Contols");
    f2.add(controls, 'flip_cam');
    f2.add(controls, 'camRadius', 500, 5000);
    f2.add(controls, 'camTheta', 0, Math.PI);
    f2.add(controls, 'camPhi', -Math.PI, Math.PI);


    // gui.add(controls, 'outputPlanePos');
    // gui.add(controls, 'outputCamPos');
    // gui.add(controls, 'outputBDir');
    // gui.add(i, 'Vx').listen();
    // gui.add(pos, 'Vx').listen();
    // gui.add(monitor, 'Vx').listen();
    // gui.add(monitor, 'time').listen();
    // gui.add(monitor, 'i').listen();
    gui.add(menu, 'mainmenu');
    gui.add(controls, 'reset');
    gui.add(controls, 'play_pause');//, false, true);


    // data = data_full.filter(function(row) {
    //     return row.event == controls.particleIndex;
    // });


/*    var camControls = new THREE.FirstPersonControls(camera);
        camControls.lookSpeed = 0.2;
        camControls.movementSpeed = 500;
        // camControls.noFly = false;
        // camControls.lookVertical = true;
        camControls.target = new THREE.Vector3(1000,0,0);
        // camControls.target = new THREE.Vector3(0,0,1000);
        camControls.object.position.set(0,0,0);
        // camControls.constrainVertical = true;
        // camControls.verticalMin = 1.0;
        // camControls.verticalMax = 2.0;
        // camControls.lon = -150;
        // camControls.lat = 120;
*/

    // function setCamControls() {
    //     }

    render();

    function render() {
        if (play == true) {
            i ++;            
        }
        // update the stats and the controls
        // trackballControls.update(clock.getDelta());
        // stats.update();

        // animate electron
        data = data_full.filter(function(row) {
        return row.event == controls.particleIndex;
        });
        pos = data[i % data.length];
        electron.position.set(pos.X, pos.Y, pos.Z);

        // monitor.V = {'Vx': pos.Vx, 'Vy': pos.Vy, 'Vz': pos.Vz};
        monitor.X = pos.X;
        monitor.Y = pos.Y;
        monitor.Z = pos.Z;
        monitor.Vx = pos.Vx / 3e8;
        monitor.Vy = pos.Vy / 3e8;
        monitor.Vz = pos.Vz / 3e8;
        monitor.Bx = pos.Bx*10000;
        monitor.By = pos.By*10000;
        monitor.Bz = pos.Bz*10000;
        monitor.Fx = pos.Fx;
        monitor.Fy = pos.Fy;
        monitor.Fz = pos.Fz;
        monitor.time = pos.time*1e9;
        // monitor.i = i;
        // var selectedObject = scene.getObjectByName("epath");//epath.name);
        // scene.remove( selectedObject );

        cmap = d3.scaleSequential(d3.interpolateViridis);
        var extent = [0.0, data[data.length-1].time];
        // var extent = [0.0, 8.1e-8];
        cmap.domain(extent).nice();

        epathGeometry = new THREE.Geometry();
        // var j;
        for (j = 0; j < data.length; j++) {
            epathGeometry.vertices.push(new THREE.Vector3(data[j].X,data[j].Y,data[j].Z))
            epathGeometry.colors.push(new THREE.Color(cmap(data[j].time)))
        }
        // epathMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
        // epathMaterial = new THREE.PointsMaterial({ vertexColors: THREE.VertexColors });
        // vertexColors: THREE.VertexColors
        // var epath = new THREE.Line( epathGeometry, epathMaterial);
        // epath.name = "epath";
        // scene.add(epath);
        epath.geometry = epathGeometry;
        epoints.geometry = epathGeometry;
        // epath.material = epathMaterial;

        // epath.visible = true;
        // camera.position.x = pos.X;
        // camera.position.y = pos.Y + 200;
        // camera.position.z = pos.Z - 500;


        // BArrowHelper.origin = electron.position;
        BArrowHelper.position.copy(electron.position);
        var BDir2 = new THREE.Vector3( data[i % data.length].Bx_scaled, data[i % data.length].By_scaled, data[i % data.length].Bz_scaled );
        BArrowHelper.setDirection(BDir2.normalize());

        FArrowHelper.position.copy(electron.position);
        var FDir2 = new THREE.Vector3( data[i % data.length].Fx_scaled, data[i % data.length].Fy_scaled, data[i % data.length].Fz_scaled );
        FArrowHelper.setDirection(FDir2.normalize());

        VArrowHelper.position.copy(electron.position);
        var VDir2 = new THREE.Vector3( data[i % data.length].Vx_scaled, data[i % data.length].Vy_scaled, data[i % data.length].Vz_scaled );
        VArrowHelper.setDirection(VDir2.normalize());
        // BarrowHelper.setLength(BDir2.length());
        // BArrowHelper.dir = new THREE.Vector3( data[i % data.length].Bx_scaled, data[i % data.length].By_scaled, data[i % data.length].Bz_scaled );
    // var BOrigin = electron.position;

        // GOOOOOOOD
        // camera.position.x = 0;
        // camera.position.y = 1000;
        // camera.position.z = pos.Z - 3000;

        camera.position.x = - controls.camRadius * Math.sin(controls.camTheta) * Math.sin(controls.camPhi);
        camera.position.y = controls.camRadius * Math.cos(controls.camTheta); //* Math.sin(controls.camPhi);
        if (flip == false) {
            camera.position.z = pos.Z - controls.camRadius * Math.sin(controls.camTheta) * Math.cos(controls.camPhi);
        } else {
            camera.position.z = pos.Z + controls.camRadius * Math.sin(controls.camTheta) * Math.cos(controls.camPhi);
        };

        // camLook = new THREE.Vector3(0,0, electron.position.z);
        camLook = new THREE.Vector3(data[0].X,data[0].Y, electron.position.z);
        // console.log(camLook);
        camera.lookAt(camLook);



        // var camlook = new THREE.Vector3(0, 1000, electron.position.Z);

        // camera.lookAt(electron.position);
        // camera.lookAt(new THREE.Vector3(0,0,electron.position.Z));
        // camera.lookAt(camlook);

        /*if (moveForward == true) {camera.translateZ(-500)};
        if (moveBackward == true) {camera.translateZ(500)};
        if (moveLeft == true) {camera.translateX(-100)};
        if (moveRight == true) {camera.translateX(100)};
        if (moveUp == true) {camera.translateY(100)};
        if (moveDown == true) {camera.translateY(-100)};*/


        // camControls.update(clock.getDelta());

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }    
}