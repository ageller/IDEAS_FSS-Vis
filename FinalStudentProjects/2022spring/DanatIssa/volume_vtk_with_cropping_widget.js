var vtkGenericRenderWindow = vtk.Rendering.Misc.vtkGenericRenderWindow;
var vtkVolume = vtk.Rendering.Core.vtkVolume;
var vtkVolumeMapper = vtk.Rendering.Core.vtkVolumeMapper;
var vtkPiecewiseFunction = vtk.Common.DataModel.vtkPiecewiseFunction;
var vtkColorTransferFunction = vtk.Rendering.Core.vtkColorTransferFunction;
var vtkColorMaps = vtk.Rendering.Core.vtkColorTransferFunction.vtkColorMaps;
// Sphere 
var vtkActor = vtk.Rendering.Core.vtkActor;
var vtkMapper = vtk.Rendering.Core.vtkMapper;
var vtkSphereSource = vtk.Filters.Sources.vtkSphereSource;
// For reading in data
var vtkHttpDataSetReader = vtk.IO.Core.vtkHttpDataSetReader;
var vtkXMLImageDataReader = vtk.IO.XML.vtkXMLImageDataReader;
// Image cropping widget
var vtkImageCroppingWidget = vtk.Widgets.Widgets3D.vtkImageCroppingWidget;
var vtkImageCropFilter = vtk.Filters.General.vtkImageCropFilter;
var vtkWidgetManager = vtk.Widgets.Core.vtkWidgetManager;

// --- Set up a simple linear opacity function
const piecewiseFun = vtkPiecewiseFunction.newInstance();
var rhomin, rhomax;
rhomax = -1;
rhomin = -5.5;
piecewiseFun.addPoint(rhomin, 0.0);
piecewiseFun.addPoint(rhomin+1, 0.10);
piecewiseFun.addPoint(rhomin+2, 0.12);
piecewiseFun.addPoint(rhomin+3, 0.15);
piecewiseFun.addPoint(rhomin+4, 0.5);
piecewiseFun.addPoint(rhomin+5, 1.0);
const lookupTable = vtkColorTransferFunction.newInstance();

function setCMap () {
  lookupTable.applyColorMap(vtkColorMaps.getPresetByName(document.getElementById("colormaps").value));
  lookupTable.setMappingRange(rhomin, rhomax);
  lookupTable.updateRange();
}

function setSlice (cropFilter) {
  if (document.getElementById("slices").value == "None") {
    cropFilter.setCroppingPlanes([0, 100, 0, 100, 0, 100]);
  } else if (document.getElementById("slices").value == "Eq") {
    cropFilter.setCroppingPlanes([0, 100, 0, 100, 0, 50]);
  } else if (document.getElementById("slices").value == "Polar") {
    cropFilter.setCroppingPlanes([0, 50, 0, 100, 0, 100]);
  } else if (document.getElementById("slices").value == "Both") {
    cropFilter.setCroppingPlanes([0, 50, 0, 100, 0, 50]);
  }
}

document.getElementById("colormaps").addEventListener("change", (event) => {
  setCMap();
});

function set_vtk_viz(fname, div_id) {
    // --- Set up our renderer ---
    const container = document.querySelector(div_id);

    // We use the wrapper here to abstract out manual RenderWindow/Renderer/OpenGLRenderWindow setup
    const genericRenderWindow = vtkGenericRenderWindow.newInstance();
    genericRenderWindow.setContainer(container);
    genericRenderWindow.resize();
    genericRenderWindow.setBackground(0, 0, 0);

    const renderer = genericRenderWindow.getRenderer();
    const renderWindow = genericRenderWindow.getRenderWindow();
    const reader = vtkXMLImageDataReader.newInstance();

    // --- Set up the volume actor ---
    const actor = vtkVolume.newInstance();
    const mapper = vtkVolumeMapper.newInstance();

    // tell the actor which mapper to use
    actor.setMapper(mapper);

    // wire up the reader to the mapper
    mapper.setInputConnection(reader.getOutputPort());

    // sphere
    const sphereSource = vtkSphereSource.newInstance();
    const sphereActor = vtkActor.newInstance();
    const sphereMapper = vtkMapper.newInstance();

    sphereActor.getProperty().setEdgeVisibility(false);
    sphereMapper.setInputConnection(sphereSource.getOutputPort());
    sphereActor.setMapper(sphereMapper);
    
    sphereActor.getProperty().setColor(0, 0, 0); // set BH color to black
    sphereSource.set({ 
      'radius': 3.2, 
      'thetaResolution': 32,
      'phiResolution': 32,   
      'center': [50, 50, 50]
    });
    
    renderer.addActor(sphereActor);

    // --- setup our widget manager and widget ---
    const widgetManager = vtkWidgetManager.newInstance();
    widgetManager.setRenderer(renderer);
    // this is a widget factory
    const widget = vtkImageCroppingWidget.newInstance();
    // --- set up crop filter
    const cropFilter = vtkImageCropFilter.newInstance();
    // we listen to cropping widget state to inform the crop filter
    const cropState = widget.getWidgetState().getCroppingPlanes();

    // wire up the reader, crop filter, and mapper
    cropFilter.setInputConnection(reader.getOutputPort());
    mapper.setInputConnection(cropFilter.getOutputPort());

    actor.getProperty().setScalarOpacity(0, piecewiseFun);
    actor.getProperty().setRGBTransferFunction(0, lookupTable);

    
    fetch(fname)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {  
      setCMap();
      reader.parseAsArrayBuffer(arrayBuffer);
      
      // widget setup
      const image = reader.getOutputData();
      cropFilter.setCroppingPlanes(...image.getExtent());
      
      document.getElementById("slices").addEventListener("change", (event) => {
        setSlice(cropFilter);
      });

      lookupTable.onModified(() => {
        renderWindow.render();
      });

      renderer.addVolume(actor);
      // renderer.addActor(sphereActor);

      renderer.resetCamera();
      renderWindow.render();
    });
    return [renderer, genericRenderWindow];
}

var render_left = set_vtk_viz('density_no_nu_101_0.vti', '#container_left');
var render_right = set_vtk_viz('density_with_nu_101_0.vti', '#container_right');
// split view with linked camera!
render_left[1].getInteractor().bindEvents(render_right[1].getContainer());
render_right[1].getInteractor().bindEvents(render_left[1].getContainer());