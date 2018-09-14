# Srutarshi Banerjee's Final Project


The FSS - Visualization project has been developed based on the concept of Image Compression, depending on quad tree structure. The work is done with the help of **d3 javascript library** and **html**. *Initially*, the image is loaded and subsampled in random manner. Based on the subsampled image pixels, the quad tree structure is selected. The **image** is stored in **canvas data format**. However, the **quad tree** is stored in the form of **svg data format**. The quad tree structure is loaded on top of the image in translucent appearance.


Now, for each of the **subsampling levels**, level 0 - 8, the number of sampled pixels changes. The higher the subsampling level, the lower the number of pixels selected. Based on the number of image pixels randomly selected in the image, the quad tree structure is drawn. Thus, the higher the number of image pixels, the finer is the quad tree structure. The challenging part is to take the image pixel values from canvas data type and associate with the quad tree. We map this by coping RGB data from the image and storing it as an array. The array is referenced by the quad tree in order to access the subsampled pixels selected randomly. For each node in the quad tree, the data corresponds to the subsampled RGB pixel values.


The **interactive visualization** allows the User to select a region in the image. Once, an image is selected, the selection shows the pixels randomly subsampled in that region and shows as **5 times magnified**. Corresponding to the subsampled points inside the selected region, the **RGB data** of each pixel is extracted and forms a histogram in the bottom of the canvas for each of R, G and B pixels corresponding to the subsampled pixels.


The brief instructions of operation of this interactive visualization is also shown in the html webpage. This work also highlights the quad tree based image acquire. This is important for the purpose of our Research as we are able to find out the pixels corresponding to the subsampled image according to quad tree structure. We can also visually see what happens when the subsampling level changes.
