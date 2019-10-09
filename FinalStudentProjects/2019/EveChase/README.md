# GWposteriors
### A Project for the IDEAS Visualization Focus Summer School
Explore gravitational wave posterior samples from LIGO and Virgo's first gravitational wave transient catalog ([GWTC-1](https://journals.aps.org/prx/pdf/10.1103/PhysRevX.9.031040)).

LIGO and Virgo's first and second observing runs resulted in ten detections of binary black hole systems and one binary neutron star. We measure numerous astrophysical parameters for each gravitational wave detection, resulting in posterior distributions for each parameter.

This tool allows the user to explore relationships between pairs of parameters, by plotting two-dimensional probability density functions of the parameters. All contours correspond to 90% credible regions. The user has the option to click the label ("GWXXXXXX") for each event to toggle the contours on and off. A drop down menu allows for the user to toggle between five different figures:

1. **m1_m2**: secondary component mass (lighter component) vs. primary component mass. Masses are represented in source-frame and in units of solar masses.
2. **af_mf**: final spin vs. final mass in units of solar masses
3. **chieff_q**: the effective spin parameter vs. mass ratio
4. **dist_thetajn**: effective distance vs. inclination angle
5. **mchirp_dist**: source-frame chirp mass vs. effective distance

The project was written in HTML, CSS, and JavaScript supplemented with the D3 library. (Note: this was my first time using JavaScript!)
