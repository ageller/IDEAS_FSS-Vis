# Jackson Barnes' Final Project

The theory of gravitational collapse has served as an excellent means to bypass a number of planetesimal growth barriers while limiting
excess growth of pairwise accretion. The process involves having a cloud of very small objects (e.g. asteroids, Kuiper Belt objects, etc.) at a predertimed orbit collapse in on itself to produce a single planetesimal or a planetesimal system.  The main goals of simulating gravitational collapse include observing the resulting morphology of the planetesimal or planetesimal system, noting how pairwise growth proceeds during the collapse process, and noting how efficient pairwise growth is. 


In order to induce gravitational collapse, I have previously set up a spherical cloud of evenly-distributed asteroids with predetermined physical and orbital elements in another python script (not included here). This data was then input as a text file into an N-body integrator running on QUEST.  The N-body integrator in turn generates similar files updating the particles' positions and physical attributes as they are integrated forward in time (in this case, to a final time of 12.2 yr/2pi with a timestep of approximately 3.0E-7 yr/2pi).

As the simulation progresses, binary ss.#.r files are created, which include the updated physical and orbital elements of the particles within the system. These files are converted to text files (ss.#.r.bt files included in the data folder) once the simulation has completed.

For this project, plotly animation and dashboard tools were utilized to best visualize the collapse process. I focused on creating an interactive 3D animation tool, as it is incredibly useful to my future research. The 3D scatter plot I have generated is easy to use, and allows a user to zoom in on individual particles, hover over each of them to obtain a list of relevant physical attributes, and move the animation forward from the beginning of the collapsing process to the end of the simulation. The scatter plot also includes a drop down menu, which colors individual particles by their respective physical and orbital elements (e.g. x-, y-, and z-positions, radius, mass, particle ID number, velocities, etc.). This will be a valuable tool for data analysis of future simulations. I have also included three histograms pertaining to the particles' spherical coordinates -- radial distances away from the center of the collapsing cloud, azimuthal angles, and polar angles from the end of the simulation (my research currently requires only the resulting data). The histograms also include hover menus, which include the particle count for the respective spherical coordinate.

The scatter plot and histograms are all inluded in a dashboard for ease of use.  
	**May require installing dashboard for your system**
				pip install dash==1.2.0
				pip install dash-daq==0.1.0

To run this dashboard, open your terminal and run the "collapsed_dash.py" script. 
This should print out an http address (http://127.0.0.1:8050/), which when opened in your browser, will allow you to use the dashboard.
