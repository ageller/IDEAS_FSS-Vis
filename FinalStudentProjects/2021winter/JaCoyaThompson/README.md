# Communicating Data Analysis Through Visualizations for K-12 

JaCoya Thompson | 02/01/2021 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2021winter/JaCoyaThompson/index.html)

____________________________________________________________________


The ability to communicate findings while exploring and interpret data relies generally on the use of data visualizations. As data visualizations are now regularly encountered in the news and social media, knowing how to find insights and communicate data visualizations becomes as important as the ability to read and write text. DEV provides a learning environment for users to interact with data visualizations to gain insights, normally hidden in static data visuals, providing explorations that promotes richer discussions for the benefit of more meaningful understanding of data. 

Learning to form insights from data visualizations and creating a data driven story can be a challenging task for younger learners. For example, younger learners find data visualizations easy to create, but have relatively low supports in gaining insight beyond general observations. This difficulty could be attributed to a lack of instruction, as teacher’s may believe visualizations are intuitive, they do not explicitly teach ways to gain deeper insights and constructing a story around data visualizations. Therefore, data visualizations are treated as simple illustrations by younger learners, rather than as tools for gaining and communicating insights. 

K-12 mathematics curricula customarily emphasize conventional, static data displays, usually to illustrate simple patterns in small data sets, which does not prepare learners for interactive and story driven types of data visualizations that are seen online, or in television based media . Having limited skills to understand data visualization can lead to an individual being misled if they can only trust what others say about visualization. This lack of skills may prevent access to valuable information, which could help them learn, solve problems, and/or make informed decisions. This presents a need and opportunity for efforts that prepare young learners with skills to understand data visualizations. 
	
For this project I created a web based learning environment called DEV, Data Exploration using Visualizations using D3, plotly, html, css and javascript. The environment aims to assist younger learner with understanding data visualizations and creating a story around the insight gained from the data visualization. DEV currently has three interactive data visualizations for users to explore a dataset about the top 6 players in the NBA (https://www.lineups.com/articles/top-10-nba-players-in-the-2019-2020-season-kawhi-leonard-at-1/). The goal is to add more middle school student relatable data sets such as social media and food related topics. 

## Histogram

Histograms are used to depict the distribution of a dataset or how often values fall into ranges. I used D3 to create the histogram and the features. I chose D3 because I'm making a web-based learning environment and D3 has many built in interactive data visualizations features. The histogram feature allows users to adjust bin width because bin sizes reveal information could have been hidden, to click the up/down arrows or input a number to immediately update the graph with the new bins. Questions are asked to aid the user in interpreting the histogram.  

## Box-Plot

In descriptive statistics, a box-plot is a convenient way of graphically depicting groups of numerical data through their quartiles. I used Plotly for the box plot because it was a-lot easier to build than in D3 took less commands to develop. Most of the features on the box-plot one automatically with Plotly. Plotly also has integrated download option so students can download the visualizations instead of screenshots. The box-plot feature include using legend to add and remove players information from the plot. Using the mouse to hover over box-plot to reveal the 5-number summary and data points used to create the box plot. The data points are plotted with the box plot so students can make connections between data points and visualizations. Questions are asked to aid the user in interpreting the box plot.  

## Bar Chart

A bar chart is a chart with rectangular bars with lengths equal to the values that they represent. One axis of the chart shows the specific categories being compared, and the other axis represents a value. I used D3 to build this because Plotly didn't have built-in features for what I wanted and D3 provided the interactive capability I needed. Users have the option to create their own bar chart by dragging the columns. Questions are asked to aid the user in creating a bar chart. Students are also asked to use information from the box plot to create a bar chart. Allowing them to make connections to data and data visualizations.   

## Data Driven Story 

Is a structured approach for communicating data insights, and it involves elements of data, visuals, and narrative working together. After exploring each data visuals students with some prompts users begin to develop a story about the data based to their interactions with the data visualizations. Highlighting interesting patterns, trends, and findings then giving explanations for the things they highlight. They are also given the option to upload a data visuals that supports their story. 

Young learners encounter data visualizations in one form or another throughout their lives. The more fluent they are with gaining insights from them, the better prepared they will be to contribute to society as citizens and to advocate for themselves and their communities. Working with data visualizations should be an integral part of young learners learning experience. DEV attempts to provide a learning environment, appropriate for younger learners to visualize data, gain insight from the data visualization, and create a story around the insight gained from the data visualization. Providing explorations that promotes richer discussions for the benefit of more meaningful understanding of data by younger learners.



