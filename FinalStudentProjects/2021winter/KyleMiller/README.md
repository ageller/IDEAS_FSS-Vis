# High-Dimensional Materials Data Explorer 

KyleMiller | 02/01/2021 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2021winter/KyleMiller/index.html)

____________________________________________________________________


Applied to a set of compounds scraped from the [Inorganic Crystal Structure Database](https://icsd.products.fiz-karlsruhe.de/) and the [Materials Project](https://materialsproject.org/) using [Pymatgen](https://pymatgen.org/).<br> 

## Motivation

As in many fields, the amount of freely-available data in the field of materials science is rapidly overtaking the ability of our current tools to provide meaningful analysis. The obvious upside to this phenomenon is the potential wealth of new knowledge to be gained by processing and analyzing all of these data. With this new knowledge, we might answer questions such as these:

1. Where are we lacking materials data?
2. How do materials properties vary by their atomic components?
3. Where should we look for new compounds with X characteristic?
4. What can we learn from the relationships between known materials properties?
5. What can we learn from the distributions of materials properties?

The downside is that we cannot answer these questions without first inventing new strategies for efficiently digesting many observations of many materials. These new strategies inevitably require new tools which offer broader perspectives on the massive datasets. This visualization tool provides a way for materials researchers to visually explore datasets which are too large to process in traditional formats. Furthermore, the interactivity of this tool allows researchers to simultaneously visualize the relationships between different material families and those between different material properties. In short, the tool provides a canvas on which researchers can project their existing chemical and physical intuition onto an organized trove of observations.    

## Software Choice

Given the robustness of existing Python libraries for materials data manipulation and integration into materials science databases, I chose to maintain a Python pipeline from data import to visualization by developing this visualization tool with the Python package [Bokeh](https://docs.bokeh.org/en/latest/index.html). By avoiding Python callbacks, using JavaScript callbacks instead, I ensured that all of the visualization's functionality persists into the standalone HTML output file. The final product is therefore fully portable and requires only a web browser to work. Portability and minimal system requirements enables researchers to easily share their visualizations and thereby leverage the materials intuition and feedback of a wider community.


## Usage

Below, we summarize the most important functionalities of this visualization tool.

| Functionality&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description |
| :-- | :-- |
| Linked Brushing    | Using the *Lasso Select* and *Box Select* tools, the user can highlight data on one scatter plot and the same data points will automatically be highlighted on the other scatter plot. |
| Configurable Axes  | Using the drop-down menus labeled 'X Axis' and 'Y Axis', the user can choose which material property is plotted on the axes of each scatter-KDE combo plot.                            |
| Linked KDE Plots   | The scatter plots are framed by min-max-normalized kernel density estimations which provide the user with an idea of the distribution of data along each scatter plot axis.            |
| Interactive Legend | By clicking on the legend items, the user can hide data from select anions to focus on or compare materials families.                                                                  |
