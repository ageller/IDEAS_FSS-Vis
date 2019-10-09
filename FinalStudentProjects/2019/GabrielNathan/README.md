# Gabriel Nathan

### a. WHY THIS DATASET/SCIENTIFIC BACKGROUND

The research I do with my advisor, Professor Seth Jacobson, is on cosmochemistry and planet formation.
We use numerical simulations of the physics of planet formation coupled with simulations of the 
chemistry of the core-mantle differentiation process to model the formation of terrestrial planets. 

To oversimplify, our model takes an input of an N body simulation of the Grand Tack Solar System formation
scenario and then applies a chemistry simluation to each collision. We then run a regression, adjusting 
initial conditions of the planet-forming disk until we get a best-fit composition of either Earth or Mars. 
(Earth and Mars have different mantle compositions. ex: Mars' mantle is more rich in FeO (more "oxidized") 
than Earth's mantle (which is richer in Fe, more "reduced").)

When we use the same N-body simulation but fit to a different composition (i.e. fit to Mars instead of to the Earth)
we get different predicted initial conditions. Among these predicted initial conditions includes the percent of Fe and Si 
in metal as opposed to as an oxide as a function of heliocentric distance. 

The dataset I am using contains data on where each planet-building block comes from in our simulation, the masses of each 
building block, the characteristics of the disk where they came from, and the chemical composition of the planet forming embryos 
as they evolve. 

### b. WHY THIS SOFTWARE/LANGUAGE 

I made my visualization using Dash by Plotly. Dash is effectively a Python wraparound of css, html, and javascript.
Dash made sense to use because I am more familiar with Python than any other coding language, and I would be able to 
make my visualizations without having to jump over additional hurdles. It turns out that the way Dash hosts their 
packages, it is not simple to export a finished Dash project to .html format. In retrospect I wish I had not used Dash
because I would like to have made a project that is more easily shareable. However, Dash is quite powerful if all you 
need to do is make a visualization for personal use (or if you are willing to subscribe to the commercial publishing 
that Dash is promoting).

### c. HOW I DEVELOPED THE SOFTWARE (LANGUAGE, TECHNIQUES, CHALLENGES)

Although Dash is Python based, I still encountered some hurdles. Dash takes concepts from html for building a page layout
and uses callbacks in a similar fashion to javascript. (Most of the css is handled on an external style sheet.) I was completely 
unfamiliar with html and javascript and it took me a while to just wrap my head around html-style layouts and using callbacks.

I probably spent as much time preparing my data as I did interacting with the visualization aspect. I had to reformat the data from its initial state and 
do a little analysis of it to get it into a format that would be useful to use in Dash. 

Another challenge is that Dash does not allow you to export your finished project to a .html format, so it can't be hosted on 
GitHub. This is frustrating because it makes it significantly more difficult to share a finished project with a collaborator if
you cannot simply share a webpage. 

### d. HOW TO USE THE VISUALIZATION

My program is a python script that calls the Plotly Dash library (https://plot.ly/dash/).
To run it, you must install Dash on your local machine. Dash is compatible with Python 2 and 3. 
This is done via Terminal using the following commands (from https://dash.plot.ly/installation): 

```	
	$ pip install dash==1.2.0  # The core dash backend
	$ pip install dash-daq==0.1.0  # DAQ components
```

With Dash installed, execute the script embryo_history_visualization.py via the command: 

```	
	$ python embryo_history_visualization.py
```

Then, in your web browser, navigate to the url:

```	
	http://127.0.0.1:8050/
```

The webpage will be interactive. From here, you can adjust several input parameters. 
From the top these options and what they change are:

- Choose Simulation: Choose which of the 10 inner solar system formation N-body simulations you are examining.
- Choose Plot Type: Display Embryo History plot (lower left side) as a line plot or scatter plot
- X-axis controls:
	- linear/log: button toggles whether x-axis is linear or log scale
- Y1-axis controls:Control which variable for the earth embryo (in blue) is plotted on y-axis
	- linear/log: button toggles whether x-axis is linear or log scale
- Y2-axis controls: Control which variable for the mars embryo (in red) is plotted on y-axis
- Mantle History Display: Control which embryo mantle composition history (earth's or mars') is displayed

Intersting things compare: 

- heliocentric_origin (x) vs exFeO (y1) and mxFeO (y2). This shows the Fe oxidation state for the disk that best produces Earth (exFeO) and Mars (mxFeO) respectively for each given simulation. 
- time (x) vs mass accumulated (y1,y2). This shows how quickly each embryo grew
- heliocentric_origin (x) vs mass accumulated (y1,y2). This shows from where in the disk the Earth and Mars embryos grew. 

### e. RESULTS (WHAT SHOULD USER GAIN FROM VISUALIZATION)

My visualization helps a user (i.e. myself or my advisor, Seth) see and compare results from different simulations without having to 
look at multiple saved images or printouts. 
As far as a scientific takeaway from what I have produced, it is clear that disks that create a body with accurate Earth compositions are 
distinct from those that produce an accurate Mars planet. We can also see where in the disk the Mars embryos grew, and can see their mantle composition history. 
In many of the simulations, Mars grows from significantly fewer planetesimals than does Earth, which is consistent with Mars being a stranded planetary embryo. 
 
