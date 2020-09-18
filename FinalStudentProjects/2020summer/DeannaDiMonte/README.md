# Deanna DiMonte

2020

## BACKGROUND

The goal of this model is to have a simple, all-in one interface for analyzing biomedical segmentation model result details. This was designed to be an easy way to see how a segmentation model is performing on a specific subject by showing the ground truth hand labeled segmentations side by side next to the model's predicted segmentations. The interface allows for an animated view scrolling through the 3d volume slice by slice as well as manual selection of layers to view. My specific project focuses on segmenting different types of brains tissue that are predictors of neurological diseases. The automatic segmentation model I am working on can be used to generate larger annotated dataset to perform further medical research on. This interface allows me to more easily display my algorithm results to research associates in radiology and get their input on our model's performance at a detail level.

## SOFTWARE

This is developed using matplotlib. Originally I had planned to use plotly or bokeh for their more modern and interactive features, but ultimately I decided to use matplotlib for performance reasons since it needed to be able to load large volumes of brain data. IN such a way the methods of running and viewing the results of this script are geared more towards research groups analyzing their data rather than a general public tool.

## DEVELOPMENT PROCESS

The development process started as an exploration of interactive visualization tools, both 2D and 3D, but ultimately I decided that my particular information was more understandable when viewed in 2D so I narrowed my range to exclude tools such as webgl and d3 which would be a bit over powered for the kind of interface I wanted to create. I had a working prototype in plotly but suffered a lot of performance issues that I worried would make further features impossible to implement. So I called an audible and rewrote it in matplotlib after learning about the interactive features that matplotlib does have. For it's current purpose, I think matplotlib was the best choice for an interface. Eventually I would like to develop a web interface as well once my research is further progressed, maybe also incorporating 3D animations.


### HOW TO USE THIS CODE
In terminal, change to director containing script and config file.


### HOW TO RUN
Run the following line of code in the terminal:
python viewsegresultsfromfileopen.py config2.txt


### HOW TO EDIT
Change the parameters in the config file. There is minimal file handing currently so it will need to be exactly in the same format as previously. In the config file you can specify were your data file are located


## RESULTS
Overall this visualization is a huge help in analyzing my own dataset and I also believe it can generally be useful to anyone working on biomedical ai segmentation tasks. It is a great tool to get a more in-depth picture of how your model is processing the data. There are a lot more features I plan to implement yet to make it even more robust and easy to use but already it's been a useful interface in quickly being able to visualize different model segmentation results.

