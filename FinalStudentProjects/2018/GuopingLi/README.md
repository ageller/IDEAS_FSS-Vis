# Guoping Li's Final Project


Block copolymers are polymers that consist of two or more different homopolymers. Research on block copolymers has played a critical role in the development of polymer chemistry, with numerous pivotal contributions that have advanced our ability to prepare, characterize, theoretically model, and technologically exploit this class of materials in a myriad of ways in the fields of chemistry, physics, material sciences, and biological and medical sciences. The phase transition behavior of block copolymers is one of the most critical scientific questions for researchers. Because many applications of block copolymers rely on the unique phase transition properties of block copolymers. But there are few effective methods to characterize the phase transition properties. During the FSS-Vis course, I tried to use the D3.js to visualize a kinetics process of a block copolymer’s phase transition. The data I used for visualization was obtained from a fluorescence spectrometer at Northwestern University. The polymerization reaction was conducted in a UV-permeable cuvette. The cuvette containing the reactants was exposed under a 36W UV lamp for certain time intervals to trigger the polymerization and then was tested by the fluorescence spectrometer to obtain the fluorescence intensity. As the time of exposure increases, the fluorescence intensity starts to decrease and then increase after 1-hour exposure. This is evidence of the process of micelle disassociation and micelle polymerization.
 

In this project, D3.js was chosen to visualize these datasets. D3.js has an advantage of creating animation. And the chemical reaction is a dynamic process as well. So D3.js is suitable for visualizing the kinetics of the reaction process.
 

There are two challenges when I was working on this project. The first challenge is to use D3.js to parse multiple CSV files into a single element. The second challenge is to update the legend bar simultaneously when the data is updating. The innovation here is to combine the two elements (legend bar and plotting) into a single updating function.
 

Using this visualization is easy. The user should first host a local server in their PC/MAC because the script involves loading local data files. When the local server is hosting, the user should navigate to the folder where the scripts and data files are stored. Then simply open the index.html in a web browser, then the user can watch the plotting. There is only one button for animation, which is the ‘Next Time Point’ button. When the user clicks this button, the plotting of next time interval should appear and then replace the plotting of last time interval.
 

The result of this visualization provides users a straightforward understanding of this block copolymer’s phase transition process. The fluorescence intensity jumping at 75 min is a strong evidence that this block copolymer is precipitating out of the solution and forming micelles.


*Note: the data files have been removed.*
