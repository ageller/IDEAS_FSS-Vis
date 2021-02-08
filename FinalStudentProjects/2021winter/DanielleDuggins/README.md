# Droplet Recognition and Analysis with Bokeh

Danielle Duggins | 1 February 2021 | IDEAS FSS-Vis Final Project

Please see Danielle's GitHub repo for the files: https://github.com/dduggins1/FSS-Vis_FinalProject 

## Introduction

I created this application to help me analyze timelapse image data of crystallization experiments. I use polarized light imaging to observe the birefringence associated with crystallization in anisotropic minerals. I use microfluidics to create supersaturated aqueous droplets and record the time when I first observe birefringence (a bright spot in the image) as the time to nucleation for that crystal. Given enough of these times, I can fit a distribution to the data that will tell us more about the crystallization behavior.

My goal with this project was to bring together a range of image processing tools so that I can view my data more easily and perform some data analysis all in one place.


## The Design and Software

Since I wanted to perform calculations and image processing in addition to visualization, I chose to use the Bokeh library to run a server inside a Jupyter Notebook from a Python script. The Bokeh library is good for creating interactive visualizations within a web browser while being able to utilize functions and processing tools through Python.

The Python script bkapp.py contains the entire application and can be run in a Jupyter Notebook using the command ```%run bkapp.py``` (assuming you have all necessary packages installed on your system).

To perform the operations on the dataset, the script relies on functions from NumPy, Pandas, the Scikit-Image Python package, FFMPEG run in the command line through Python's subprocess module, the SciPy library and the OpenCV package for Python, in addition to a few other python libraries. Bokeh is the link between the behind-the-scenes computations and the visual representations and user interactions.

The purpose of the application was to be able to more easily *access* my data by visualizing it. It's much easier to understand your dataset when you can see and interact with it. I included a display range slider to adjust the brightness/contrast apparent to the user, while leaving the underlying data untouched to preserve data integrity for processing and analysis. I chose bright orange lines to overlay contours onto the gray image for contrast. In the statistics plots, I decided to add a multi-select tool in order to compare plots for different regions through an overlay or to focus on one curve in particular. Each curve is a different color to add at least some contrast between the curves, but there is additionally a hover tool that will display information about the datapoint that is moused over by the use. This can be used to identify a specific region that has an interesting featuring in the statistical plots. The user can then display a video of the region to connect the feature to a visual observation.

## Results and Insights

I think this application could be useful for deciding which parameters to use for segmentation and identification of features within a dataset before performing these operations on the entire dataset. It's particularly helpful for large datasets where the important information is restricted to several regions of interest, which can be viewed much faster than the entire dataset. Additionally, using the statistics plots, I think this application could help with deciding how to perform automated tasks on a datasets or be used as a method to assess how well an automated task is performing.

It could be useful to get a better sense at what information can be obtained from an image dataset and help decide whether certain image analysis could be automated.

## How to use this Application

This GUI takes an mp4 file as input and reads in the first frame.

1. Load in any grayscale mp4 file (only the first frame will be loaded) and select a save directory.
2. Apply a filter to use for thresholding the image.
3. Click **Find Contours** to search the image for closed shapes.
4. Repeat steps 2 and 3 until satisfied with the ROIs identified.
5. **Export ROIs**: This will write the ROI coordinates and the thresholding parameters used to find them in two separate files.
6. **Create ROI Movies**: This will use the ROI coordinates file to create mp4 files for each region in the image.
7. **Calculate ROI Stats**: This performs calculations for each frame of each of the mp4 files that were created.
8. **Load ROI Files**: This will load in the statistics that were just calculated and initialize the first region's mp4 file.
9. Make observations. Statistics over time for each ROI can be plotted either alone or overlapping. A hover tool shows the name of the ROI and the x-y values for each plot. Any ROI's mp4 can be viewed and played on the left for the user to correlate the statistical plots with visual observations.

Notes: warnings and messages are displayed underneath the GUI.

### Required Software Packages
Python 3 (made with Python v3.7.5)<br>
FFMPEG

Python Libraries:
- Bokeh
- NumPy
- Pandas
- SciPy
- SciKit-Image
- OpenCV-Python
- TQDM
- Jupyter (and jupyter-lab if you use JupyterLab)
- IPython widgets (ipywidgets)
- PyYAML

If you use pipenv, you can use the included Pipfile to replicate the virtual environment for this program.
