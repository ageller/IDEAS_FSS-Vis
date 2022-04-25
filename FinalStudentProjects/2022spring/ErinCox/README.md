# Plotting Protoplanetary Disk Parameters

Erin Cox | 4/25/2022 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2022spring/ErinCox/index.html)

____________________________________________________________________


## About

Protoplanetary disks are the sites of active planet formation. Using high-resolution/sensitivity observations of these disks, we are able to better understand the initial physical and chemical conditions in which planets form. By obtaining statistics on a large sample of disks we are able to begin to link the current exoplanet demographics to their natal environments. In the last decade there has been a huge advance in the study of protoplanetary disks. With the Atacama Large Millimeter Array (ALMA) telescope coming online, highly detailed maps of these disks have been produced. With these exquisite maps, we have been able to measure their physical quantities, such as surface brightness and size. ALMA is able to perform snapshot surveys of entire molecular clouds, the home to these disks, in less than an hour (depending on the sensitivity of the observations). We now have data on numerous protoplanetary disks in multiple molecular clouds. This visualization attempts to organize ~900 of these disks, spanning 7 molecular clouds to start to understand any trends seen in the data.

## Gathering the data

I retrieved the data table from http://ppvii.org/chapter/15/ (Manara et al. 2022). The table contains data for 900 disks, including disk coordinates, the 0.89 mm and 1.3 mm flux, disk classification (how far in the evolution the source is), and the distance to the star. In a handful of targets the star's mass is known as is the accretion rate of the star. Due to the way the surveys are done, the targets often either have only one value of flux, and in hindsight it likely would have made more sense to try to combine these into one column. The images of the subset of disks shown are from Cox et al. 2017 and van der Marel 2022.

## Software Choice

I opted to use Bokeh for this data visualization project. The reason for this is that Bokeh uses Python, which has the capabilities to easily manipulate data tables and read in images. Bokeh has the functionality of changing which variables are plotted and showing the accompanying table of values, which was key to the story I wanted to tell with this data. To test my learning, I used JavaScript callbacks and implemented the image showing in html. One functionality that I was unable to complete due to the sheer number of targets in the database, is to compile a library of images of all the disks and when the user clicks through the images, the particular disk is shown in a larger dot on the accompanying plot. 

