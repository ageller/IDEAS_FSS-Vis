# Diatomic Spring-Mass Lattice Visualization
Interactive dispersion and wave propagation visualization of the diatomic spring-mass lattice with tunable mass ratio and excitation frequency.
https://ziwei-wang.github.io/lattice/
## Introduction
Diatomic spring-mass lattice is a simple 1D model describing the dynamics of periodic bi-material/bi-layer structures. In this model, the traveling wave speed is dependent on the frequency. Thus, the dispersion relation between frequency and wave number (spatial periodicity of the wave) is often used to study the wave propagation behavior.  

An interesting feature of the diatomic lattice is that, when the mass ratio is not 1, a gap will appear between two dispersion branches. This gap is known as phononic bandgap and within which the elastic wave will be attenuated fast. Thus researchers are interested in designing structures to have phononic bandgaps to isolate the elastic wave at certain frequencies.   

Though there are a lot of pages ([example](http://users.aber.ac.uk/ruw/teach/334/disprel.php)) showing details of this topic, none of them visualize how the mass ratio and excitation frequency change the behavior of the dispersion and wave propagation. I made this demo intended for people outside or entering this field to help them quickly understand how this works.  

## Resources used
D3.js: plotting graphs  
math.js: manipulate complex numbers in dispersion calculation  
MathJax: display equations
