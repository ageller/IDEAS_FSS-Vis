# Alex Gurvich's Final Project 

## 3D particle viewer in WebGL  

This viewer allows us to explore data from our group's hydrodynamic galaxy formation simulations. One challenge in previous approaches in rendering the full resolution data, because the data sets often contain millions of points.  One novel aspect of my project is that I developed an algorithm for progressively rendering data points as you zoom into an area, allowing the full resolution volume to be explored on small scales. I did this by calculating the rotating geometry of the camera “frustum” (volume probed by the camera) and filtering out particles that lay outside it, choosing to render only particles that would actually appear in the camera. By saving the computational expense of rendering particles outside the camera I was able to increase the number of particles rendered inside the camera. This frugality allows me to progressively render all the gas particles as long as I have zoomed in close enough to a region of interest, making for a more accurate column density estimate.

This project is written in HTML, CSS, and javascript.  We exclude the data set here to save space.  The current working version of the code can be found here : 

https://github.com/agurvich/webglFirefly

https://agurvich.github.io/