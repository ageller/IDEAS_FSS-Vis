# SN2019ehk-Bokeh-Visual

Visualization of SN blackbody radius/temperature + bolometric luminosity

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2020summer/WynnJacobson-Galan)

Here, I have utilized the interactive python package Bokeh to visualize physical properties of a pecular supernova (SN) 2019ehk that belongs to the calcium-rich supernova class. The main parameters of the supernova that are shown here are the luminoisity as a function of time (i.e., light curve) as well as the radius and temperature, both of which were derived from blackbody modeling of SN 2019ehk's spectral energy distribution (SED). Additionally, in this visualization, I have shown false-color RBG images of SN 2019ehk in its host galaxy Messier 100 at different phases of its evolution.

Well sampled SNe such as 2019ehk are perfect targets for visualizations such as this because the high cadence observations allows for astronomers to understand the dynamic and physical evolution of the explosion on ~day timescales. The Bokeh python package is ideal for turning observations into tangible tools that can map the evolution of stellar explosions. Bokeh allows for dynamic mobility such as sliders and play buttons, in addition to inactive plots that have zoom features. It is an easy package to convert to HTML, which then allows for some custom editing of presentation. 

The data behind this project was already avilable to me be because of a paper I recently published on this specific SN. However, the challenges were incorportating the data not only into Bokeh, but also with internal javascript that allows for some of the dynamics within the visualization. Coding in callbacks and slider functions, as well as a play button, was the most challenging part of the project because there is little online documentation. 

This visualization is not just limited to a particular type of supernova or even cosmic explosion. The Bokeh structure I have created can be adapted to any transient that has well-sampled imaging and modeling of its radius and temperature evolution. This can be a great alternative to presenting static plots during lectures or talks because it allows the audience to see firsthand how the SN is evolving in time. 
