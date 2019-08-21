# Supernovae from the past 135 years 

## Plotted in galactocentric cartesian coordinates

I downloaded the data from The Open Supernova Catalog [https://sne.space](https://sne.space) on Aug. 20, 2019. See [src/data/convertOpenSN.ipynb](https://github.com/ageller/IDEAS_FSS-Vis/blob/master/WebGL/threejs/SNdata/src/data/convertOpenSN.ipynb) for more information on the data contents.  

**Challenge #1:**

1. Add more colormap options to the gui.
2. Color the points instead by the luminosity (using the log10lum key).

**Challenge #2:**

1. Add a new item to gui that controls the time.
2. Only show supernovae with that formed at a time less than the gui time.

Answers to these challenges are in the [src/js/answers](https://github.com/ageller/IDEAS_FSS-Vis/tree/master/WebGL/threejs/SNdata/src/js/answers) directory.
