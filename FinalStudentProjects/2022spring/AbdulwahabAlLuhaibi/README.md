# Visualizing Vortices in Artificial Pinning site 
  
Abdulwahab Al Luhaibi | 04/24/2022 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2022spring/AbdulwahabAlLuhaibi/index.html)

Note: The data are not included here. 

____________________________________________________________________


My work focus on understanding the behavior of vortices in materials with artificial defects put on specified positions. The data is obtained by simulating the order parameter in Time Dependent Ginzburg Landau equations with defects in the meddle of the sample. In order to see the resultant order parameter it required an interactive 3D plot. 

The final project is an html page with 3 plots: one for the defects without applied magnetic field, the second one shows the vortices resulting after applying the sufficient magnetic field, and the last one is a snapshot of the vortices after applying current greater than the critical current. 

Each plot is an interactive volume plot made by Plotly package in python ( see 3D_Interactive_Plot.ipynb file ). The colormap choice is  viridis, which is not only linearly scaled, but also works very well with most types of colorblindness.  Also, the opacity is scaled to be 1 for values from 0 to 0.6 and 0.3 for values from 0.6 to 1. That allows the user to see through the volume density plot, most of which has order parameter equal to 1. 

The figures are saved as html files then imported into one html file called index.html which has a small explanation of figures and presents the figures in clearer way.

