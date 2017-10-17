# Jimmy Kim's Final Project

## Head Direction Cells

This project is an interactive visual demonstration of the data collection process for my research on neural decoding. In order to facilitate visualization, I chose a tangible real-life example.  Head direction cells, as the name suggests, encode the direction (in a 2D plane) towards which the head is pointing. As each neuron has a preferred direction for which it is most responsive, a sensible approach was to have them organized in a ring. The color of the neurons was then used to represent their expected amount of activity, determined by both the input direction as well as the tuning curve parameter. With the view of allowing the user to gain a sense of this relationship, both factors have been set to be adjustable. Finally, the user can also run a graphical simulation of sampling actual neural responses with Poisson statistics, which are then decoded with a simple population vector method (where the decoded direction is given by the vector sum of the preferred directions, weighed by the corresponding neuronal activity). The resulting mean squared error, once it converges with enough number of trials, constitutes a data point for the actual research.

The project was written entirely in HTML, CSS, and JavaScript supplemented with the D3 library.

A working version can be found here:

https://hjjimmykim.github.io/HeadDirectionCells/
