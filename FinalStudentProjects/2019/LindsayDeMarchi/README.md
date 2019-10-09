# Lindsay DeMarchi


### The coding: 

This project has much of the science happening behind the scenes in python, but the interactive is done in html, css, and the d3 package of javascript. 

### The science:

This project is designed to investigate the modelling of synchrotron radiation of radio data of Type IIb Supernovae. In a separate python script, I have uploaded individual points of radio data and fit the points, separating them per day, using a broken power law. Each individual curve is called an SED, for Spectral Energy Distribution. The modelling I use includes a power-law method of time evolution. As the SEDs progress (their labelled number increases), we are moving forward in time. You'll see all SEDs, together, and including time evolution, are included in the top-left hand panel.

In my research, I need to investigate if applying this time evolution is an accurate representation of the data, or if I am forcing my data to look this way. In my python script, I take individual days of data (otherwise what has already been grouped into a specific SED) and run a fit on them individually with a broken power-law. My hope is to uncover if the slopes and peaks of this individualized method resemble that of the joint-fit. The collection of inidividual fits is provided in the top-right plot. The positive and negative slopes in these individual plots are just underneath them in the bottom-left plot, where "alpha" is the name of the slope. 

Some of the points on this plot are hollow, while others are filled in. Those that are hollow were not able to be fit in my python code using a broken power-law. Most times, they only had enough points for one side of the curve, but not the other. In this case, I held constant the positive or negative slope, and fit the other to a 1st degree polynomial (a line). 

In the future, I would like the bottom-right hand plot to represent the peaks of these individual curves. However, I do not have this data yet on the python side of things, so for now it is just the time-evolved peak of the joint fitting. Here, it is clear to see I imposed a power-law peak in time, since the log-log plot follows a straight line. 

Oftentimes in my research I need to investigate a particular SED, or something looks funny and I need to discover the culprit. The way my python code is written, I need many print statements to discover something is acting strange, and then more to locate it. I have inclded a functionality in my dashboard to have a mouseover effect that highlights the SED I have selected, and when I click on it I can view it isolated on the plot to the far right. When I do this, both available fits will plot. If this SED has been fit individually (meaning it belongs to the subset in the far-right) both the time-evolved plot as well as the individualized plot will appear, so I can directly compare their slopes and shapes. Thi is the most helpful when a particular fit looks ugly or out of place, so I can identify which SED is causing the issue. 
