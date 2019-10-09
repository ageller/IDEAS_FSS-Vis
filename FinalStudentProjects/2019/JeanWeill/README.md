# Jean Weill

### My research currently focuses on neutrino oscillations in matter. 

*Technical Aside Start:*

Neutrinos have a very small but nonzero mass, meaning that they must be mass eigenstates (eigenstates of the Hamiltonian). This mass basis is made of three neutrino: v1 , v2 , v3 . The neutrinos we are familiar with (electron, muon, and tau) are not eigenstates of the Hamiltonian, instead they make a basis called the flavor basis. Neutrinos travel in their mass basis but are detected and interact in their flavor basis. We can express one basis in terms of the other through a 3x3 mixing matrix, which means that each flavor neutrino is made of a superposition of mass neutrinos (and vice versa). As a flavor neutrino propagates, the coefficients in front of each mass eigenstate is going to change, and thus the flavor neutrino is going to change. In the language of quantum mechanics, this means that if, for example, an electron neutrino is produced by the Sun, it will transform during its journey to the Earth and have a probability of order 1 to be detected as a muon or tau neutrino. 

*### Technical Aside End.*


To make it more concrete, we know that the Sun produces electron neutrino through nuclear fusion, and we know how to detect them on Earth. Suppose that the Sun produces 10 electron neutrinos but we only detect 4 of them. If we improve our detector to also detect muon and tau neutrinos, then we also detect 3 muon and 3 tau neutrinos, giving us a total of 10 neutrinos. Thus, during their journey to Earth, the 10 electrons transformed in the way explained in the technical aside, so that around 1/3 of them were detected as electron neutrinos, 1/3 of them were detected as muon neutrinos, and 1/3 of them were detected as tau neutrinos.

This oscillation depends on how far the neutrino propagates, its energy, and the matter density profile it is going through. I am more interested in the latter, especially the castle wall density profile. As its name indicates, this periodic matter profile is made of two constant, alternating densities, and therefore looks like a castle wall. In this project I wanted to explore different ways to efficiently show how this density affects the neutrino oscillations for two flavors (electron and muon).

I needed to create a 2-dimensional visualization, and so Bokeh seemed to be the best fit. Bokeh can be implemented with Python and is very interactive. It allows you to use sliders which you can use to transform your graphs, both in shape and color. 

The entire coding process was challenging because Bokeh was completely new to me, and an important part of it had to be done in JavaScript which I only knew the basics of. I am truly grateful to our professor Aaron M Geller for all his help and patience.

My project is easy to use since it is self-contained. You can load it with a jupyter notebook, and that should do it. I put a lot of comments to make the code easier to read. It is made of four graphs:

Top Left: A fictitious 2-dimensional planet made out of a chosen (using 'number of circles' slider) number of alternating constant-density layers. By moving the 'time' slider, you can see the neutrino changing flavor between an electron and muon neutrino while going through this planet.

Top Right: The common probability curve which shows the probability of an electron neutrino turning into a muon neutrino as a function of distance. I added color and a moving particle to make it easier to understand at a glance and to make it livelier.

Bottom Left: The planet's density function.

Bottom Right: A pie chart that shows the neutrino's probability to be measured as an electron or muon neutrino. 

In my research, I have been mostly looking at static probability curve plots. This summer school gave me the tools to create a visualization that encompasses this information in a much more lively, simple, and efficient way.
 

