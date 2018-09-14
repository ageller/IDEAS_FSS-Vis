# Alice Lucas's Final Project


Images, while being highly visual by nature, can actually be represented in many different ways. There exists many types of information in a given image, for example regarding the frequency, color, or greyscale intensities. In this project, we aim to look into some of these properties, more specifically focusing on the color distributions of natural images. We ask questions such as, do the different color channels correlate with one another? Is there a lot of variation between the image channels? How do color distributions differ given different images? 


This project was built using html and javascript. The plotly.js library was used to plot the histogram and 2d scatter plots. The d3.js library was used to allow for "brushing" capabilities, i.e., letting the user select different regions in the image. The choice of the use of these two higher level libraries was a natural one, as these allow to (relatively) effortlessly plot data, in addition to enabling interaction with the user.


Given a selected image by the user, three scatterplots are shown. Each point in the scatterplot corresponds to a pixel in the image, where the color of the point corresponds to the color of the pixel. Three different scatterplots are shown, one for each pair combination of colors red, green, and blue. The data to plot these scatterplots is read from different .csv files, where each .csv file contains a table of pixels and corresponding intensity values in the RGB space. This csv file was obtained using MATLAB, and the pixels were extracted from the original image downsampled by 8 (as to minimize the number of points shown in the scatter plot). These scatterplots show the correlations between different colors, as well as provide an idea as to the distribution of colors in a selected frame.


Similarly, given a selected image, a bar plot which corresponds to the histogram of the greyscale intensity is shown. The data to make this scatterplot was obtained from a csv file, which again was created through MATLAB, using the corresponding image, this time downsampled by four. The values in the csv file correspond to the 'y' channel of the image, the luminance channel. This luminance channel may be seen as a way to measure the "intensity" content of the image. Looking at the histogram provides an idea regarding the ranges and variance in intensity in the whole image.


The main html file is index.html. When opened in an appropriate browser, a selection of multiple images will appear. The user can click on one of these images. Given the selected image, the images will appear on the left side of the screen, and the corresponding scatter plots and bar charts appear on the right side of the screen. The user also has the option to click anywhere in the image, and drag the mouse to form a rectangular window. The data present in this rectangular window is then plotted in the plots. To extract the data in the region selected by the data and plot it accordingly, we use a home-made formula for translating the selected pixels in the screen to the data points of the csv file. Special consideration must be taken given that the original image does not have the same dimensions as the image shown on the screen, therefore the pixels of the screen do not translate directly to the pixels of the image. Furthermore, a conversion from the pixels of the image to the indices of the flattened array in the csv file must be done. 


When updating the scatterplot data, an animated transition is used to have the data points slowly re-order in their new position for the next plot. Unfortunately this was not achievable for the histogram, as plotly does not allow such animating functionality for bar plots yet. 


Experimenting with this visualization allows for multiple conclusions:
1. Colors in natural images are highly correlated in the RGB space. 
2. Different objects in an image appear as different "clusters" in the color space. Similarly where there is a clear background/foreground in the image, two distinct "clusters" may be seen in the color space. 
3. Flat regions in an image have low intensity variance, whereas sharp regions have higher variance in intensity. 