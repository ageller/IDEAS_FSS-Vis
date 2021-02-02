# Operations Simulator for the Rubin Observatory 

Candice Stauffer | 02/01/2021 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2021winter/CandiceStauffer/index.html)

____________________________________________________________________


## About

This simulation shows a field selection and image acquisition of the Rubin Observatory of the 1-year life of its planned survey. Each image shows a different date and the user can chose different maps to color the data by (e.g. sky brightness, moon phase, etc.). The user can also change the interval between which they want to show data. For example, one could chose to show image acquisitions 10 days before and 10 days after since the given start date of the survey.

## Gathering the data

I downloaded the data from http://astro-lsst-01.astro.washington.edu:8082/. The position of the points were given in sky coordinates, which were then converted in to cartesian coordinates for the purpose of running in WebGL. Along with the position of the points, the data sets here also include other variables mentioned above. The can revise the code to include other information not included in this simulation (filters, etc) as well. 
A legend of the color map is not explicitly show, however, lighter colors indicate higher values while dimmer colors indicate lower values. 


## How to run

In the terminal, go to the directory VIS_Proj and cd into src. Then run, python -m http.server and type localhost:8000 in an incognito window of Google Chrome or Firefox (other browsers may work, but these two seem to work the best). 
