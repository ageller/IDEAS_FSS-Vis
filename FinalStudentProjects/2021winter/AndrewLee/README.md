# Materials Science Machine Learning Results 

Andrew Lee | 02/01/2021 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2021winter/AndrewLee/index.html)

____________________________________________________________________

## Scientific Background

In the field of computational materials science, predicting the existence of unknown compounds is incredibly important and highly researched on. Traditionally, experimentalists tweak already-published synthesis 'recipes' in hopes of finding new compounds. This trial-and-error approach often leads to far more failures than successes, and is highly expensive in time and money.  

Density functional theory (DFT) changed the way materials discovery can be done by providing a more reliable way to screen materials before experimentalists attempt to synthesize them. DFT calculations involve using supercomputers to find solutions to complex quantum mechanical equations which determine a material's energetics. The energetics can then be compared with those of competing phases in order to assess a material's overall stability. Most of the time (74% for half heuslers), a stabilty of 0 eV/atom indicates a composition is synthesizable.

While being correct 74% of the time is impressive, most materials classes have thousands to tens of thousands of possible candidates, so DFT stability still misclassifies hundreds/thousands of promising materials. My machine learning model aims to improve this accuracy by replacing DFT stability with a synthesizability metric which experimentalists may use to guide their search for new materials.

## Project Background

I chose D3 as my visualization software because of its incredible flexibility for constructing interactive plots. D3 works with javascript, which is universally supported by web browsers, so having the option to publish my work for anyone to view was also important. I work with many collaborators, most of which are not computationalists, so having a tool that requires only a standard web browser to use is quite valuable. Lastly, I have never coded in javascript before, so I  wanted to challenge myself. 

The main purpose of my plot is to show a separation in probability synthesis between the half heusler data points and all other points. Because there are over a thousand points, many of which overlap each other, I added the ability to toggle each data point class' visibility on and off. Each data point has multiple properties, so I display them when the cursor is hovered over the point. The vertical purple bar marks a threshold which determines if a compound is truly synthesizable or not, depending on whether it is above or below this threshold. The threshold in principle can be arbitrarily determined, so it can be adjusted by sliding the bar left and right. Adjusting the threshold also changes the interpretation of the machine learning predictions, so the accuracies in the form of precision and recall are recalculated as the threshold bar is adjusted.

Full instructions on interacting with the plot can be found on the plot itself.

## Insights Gained

Using this tool, I have been able to better identify outliers in the data. For example, LiVBi at (0.44,0.39), NbSnSb at (0.6,0.56), and LiGaGe at (0.69,0) are interesting cases.

