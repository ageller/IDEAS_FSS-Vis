# Molecular Dynamics Visualization 

This is a copy of [Dale's GitHub repo](https://github.com/dgaines2/fss-vis).

[A live version is available here.]()

## Scientific Background

Molecular dynamics (MD) is a computational method to simulation the behavior of atoms and molecules.
We first start by defining what types of atoms or molecules we want to simulate, along with some method of calculating forces, and then set the conditions of the simulation. 
Once we have the positions and forces for a single timestep, we can integrate Newton's equations of motion to find the positions and forces at the next timestep, which we repeat for the entirity of the simulation.
This allows us to see how the system evolves over a period of time, giving us useful information about the dynamics of the system. 

In this specific simulation, we are watching the evolution of a few chains of a simple polymer called polyethylene (C<sub>100</sub>H<sub>202</sub>).
We are using the united-atom model, so each repeating CH2 unit is represented by a single point within the chain.
In this PVT ensemble, we set the temperature to 400K and the timestep to be 1 femptosecond (fs), or 10<sup>-15</sup> seconds, and the entire simulation runs for 10,000 timesteps, which means we are only simulating about a hundreth of a nanosecond of activity.
The simulation starts with the polymers aligned within a box, and the goal of this simulation is to generate physically-reasonable conformations starting from this initial state.
As time progresses, the thermal energy is distributed throughout the system, and the polymers explore various conformational states.
By the end  of this simulation, the polymers have reached a randomized equilibrium configuration, as shown by the convergence of the total energy, and are ready to be used in an MD run where we can measure their properties.  

## Software Choice
I chose to use WebGL and D3 tools along with HTML, CSS and Javascript to create this visualization.
The main portion of this project is the visualization of the MD run itself.
Since my data is mostly in the form of x,y,z positons as a function of time, I wanted to create a way to visualize each molecule's movement in 3D. 
Other tools allow users to visualize a single snapshot in time, or sometimes make a video from a single perspective, but I wanted a more interactive experience.
WebGL provides an excellent interactive 3D visualization and animation environment along with a nice control panel, making it easy to see what is going on in my system.
The canvas can be zoomed and panned at any point in time, and the user can turn on an animation loop to watch the entire system evolve over time.
I also utilized D3 to create a live-updating plot of the energy at the bottom of the screen, which allows users to easily understand the value of the energy at any specific point in time.
Finally, I used an HTML overlay that features a title and an information box that can be hidden, which should allow users of this standalone website to understand what this simulation shows without needed to look for information elsewhere.
The code is also made available, so with minor tweaks, the website would allow for easy visualization of other MD runs.


