# Simulating Neutron Star Outcomes with Neutrino Transport
  
Danat Issa | 04/24/2022 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2022spring/DanatIssa/index.html)


____________________________________________________________________

## Brief Introduction
Neutron star mergers are the celestial laboratories, where we can study general relativity and nuclear physics in an unusually controlled setting. When we observed a neutron star merger in August 2017, for the first time, we detected both gravitational and electromagnetic waves signal from the same source. Even though many of our predictions turned out to be correct, to maximize the scientific output of the observations, we still need a general first-principle physical model of the merger event. The physical processes involved in the neutron star mergers act on a large range of spacial and temporal separations, and, coupled together, create a highly non-trivial system. With the help of numerical simulations, we can model these beasts in an attempt to derive some general predictions, such as (a) how much matter will be expelled, or (b) how fast this material will move, and (c) what will be its chemical composition. This information will be then used to predict the properties of the emission observed by the telescopes. 


## Methods Used
To simulate the outcome of the neutron star mergers, our group at CIERA uses an in-house developed general relativistic magnetohydrodynamics code H-AMR. I have implemented a neutrino transport scheme, which will help us accurately determine the chemical composition of the matter. Neutrinos are elusive particles, which only weakly interact with the material of the post-merger disk, but greatly influence the chemical composition of the disk. Composition of the material will determine the outcome of the kilonova emission, a ultraviolet-optical-infrared glow, which is powered by the radioactive decay of the heavy nuclei.  

## Visualization Data
These are the results of the two simulations with identical starting conditions: a neutron star-black hole merger, simulated using a numerical relativity code SpEC, by our collaborator Francois Foucart. Simulating the moment of the merger requires solving general relativity equations, which are extremely expensive computationally. Around ~50 milliseconds post-merger, the general relativistic metric becomes more or less time-independent, and we can carry on the simulations using our code, which is significantly faster. Using this hybrid approach, we can simulate the entire evolution of the merger from first principles. The only difference between these simulations is that the snapshot on the right has neutrino transport scheme on (and on the left panel there is no neutrino transport). I ran these two simulations up to 0.22 seconds in physical time. 

## Visualization Software Used
Since our simulations are inherently 3-dimensional, I needed a way to showcase the simulation results via the volumetric rendering. For this project I used VTK.js, a package developed by the creators of Paraview, but rewritten for JavaScript. This makes it straightforward to embed the visualizations into a website, if needed. However, due to lack of extensive documentation and examples, it was very tedious to figure out how to write the code for visualizing data, especially in the language that I was not familiar with. Another visualization was of the 2-dimensional slice generated using Plotly. This type of the visualization is commonly used in our field. I chose the default colormap to be both colorblind-friendly and perceptually uniform (Viridis), but also included a colormap that is commonly used in our field (Jet). Both of the visualizations were designed to be interactive to be able to zoom in and out using the mouse wheel, and rotate using left click (in case of the 3D rendering).