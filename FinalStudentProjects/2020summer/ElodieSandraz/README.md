# Elodie Sandraz

This project investigates the relationships between atomic properties and nanoparticle shapes using surface properties from http://crystalium.materialsvirtuallab.org/.

## Background:

Spherical two-phase nanoparticles can form two shapes: a core-shell and a heterodimer. The core-shell shape has one “core” shape that is completely surrounded by a “shell.” The heterodimer shape consists of each phase in a half-spherical shape, joined to form a complete sphere with segregated phases.

The interaction energy between a phase and vacuum, which occurs at the surface of a material, is called the surface energy. The interaction energy between two unlike phases occurs when both phases share a side, or interface, and is called the interfacial energy.

An assumption is that surface energies dictate the shape of nanoparticle formed, however it seems that is not always true. This project aims to create a visualization that will explore the validity of this assumption.

For this project, the interfacial energies and observed nanoparticle shapes have been generated randomly, and thus do not reflect actual data.  Some additional limitations include:

-	A material can have different “directions” which affect which atomic plane is interacting. To simplify our analysis, we will use weighted surface energies to ignore the direction-dependence of surface and interfacial energies.

-	If two different species of atoms mix, they form a phase. To ignore these effects, we are only considering elemental compositions, in which each phase is only composed of one atomic species. The possibility of two elemental phases mixing not specifically considered.

## Software/Language: 

This project is written in Python, with interactivity achieved using Bokeh. The interactive tools available through Bokeh are useful for exploring datasets and can be particularly revealing when used to analyze datasets with yet-unknown correlations. For example, the lasso can be helpful for tracing data points between various plots and focus on certain groups of datapoints. In addition, as this is such a large dataset, the ability to zoom in on parts of the plot can help with this analysis.

## Methodology:

I used a static Bokeh plot to plot all of the data in grey. Updating plots that showed the selected core-shell pairings were plotted on top of the Bokeh plot in color. Vertical and sloped dashed lines were added for ease of comparison. Likewise, a multipolygon object was used to shade in the background color of the top-right plot.

I initially struggled using JavaScript to write the interactive functions I desired to implement, particularly with filtering the data so that not all 10,000 points were shown at once. In addition, I struggled to have an updating title for the right-hand column, which I would have liked to update with the name of the core being analyzed, which would make it easier for the user to see which core elemental composition they are looking at.

## Usage:

On the left-hand side, we observe a comparison of the surface energies of selected shell elemental compositions versus the surface energies of selected core elemental compositions, color-coded by nanoparticle shape. In the top-right, we observe a comparison of the difference in surface energies between core and shell elemental compositions with the atomic number of the shell element. The dotted lines represent the end of a period in the periodic table. In the bottom-right, we compare the same difference in surface energy with the interfacial energy between the pair of elemental compositions. The slider on the top right allows the user to select the elemental composition they would like to explore as a core. Likewise, the multi-selection tool below allows the user to select as many elemental compositions as they would like to explore as a shell option. The points highlighted on each plot are the pairs of elemental compositions that satisfy the constraints posed by both the slider and the multi-selection tool. Additionally, the user can see the name of the pair and the corresponding plotted properties by mousing over a data point.

Please note: to run the notebook or use the html file, the user must first unzip the doi_10.5061_dryad.f2n6f__v1.zip file.

## Results:

This visualization hopes to challenge common assumptions about which properties influence nanoparticle shape formation and to provide the tools for further exploring correlations in other datasets. The tool currently operates under simplifying assumptions but can be readily adapted to accommodate more complex analysis of other materials properties and their correlation to nanoparticle shapes.

