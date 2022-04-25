# Visualization of 3D Axisymmetric Jets Produced by Supermassive Black Holes at the Center of Galaxies
  
Aris Lalakos | 04/24/2022 | IDEAS FSS-Vis Final Project

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2022spring/ArisLalakos/index.html)

This is a clone of [Aris's repo](https://github.com/Lalakos/IDEAS_visualization_class_2022).

Note: The data are not included here. 

____________________________________________________________________


The first seeds that led to galaxies in our universe came from the Big Bang. The first galaxies were small in size compared to the gigantic ones we observe today. Supermassive Black Holes (SMBH) reside at the center of such galaxies with masses M ~ 10^6 - 10^10 solar masses. How did the first SMBHs form inside those early-time galaxies, and how did they grow to their current massive size is a big mystery.

I study the evolution of SMBHs and how they grow by accreting gas from their galaxy. During active accretion phases, such systems are classified as Active Galactic Nuclei (AGN). AGN activity is associated with observed relativistic magnetized outflows, which we call jets. Such jets are estimated to carry energy that is comparable to the binding energy of the entire galaxy, and if a small fraction of this was coupled to the gas in the galaxy, it would disrupt start formation and greatly impact the evolution of the galaxy. 
To study this dynamical process, I use 3-dimensional general relativistic magneto-hydrodynamic simulations. When gas is accreted near the SMBH, a disk is formed through which the SMBH feeds and grows. During this, the jets are formed and propagate into the surrounding gas attempting to penetrate through it without breaking down. This process is very messy and results in asymmetric jet structures that are very hard to visualize in 2-dimensional plots. Thus, a volumetric representation of my data is not only visually appealing, but also, necessary when one tries to understand the structure and stability of jets.

On the plot on the right, I show a 3-dimensional representation of my data where the color shows the logarithm of density. The shape of the jets (purple) shows strong deviations from axisymmetry, with significant tilts and bends. The diffuse gas surrounding the jets is shown in orange, while the gas that gets close to the SMBH forms an accretion disk that feeds the SMBH (yellow). A dropdown menu is placed above this plot with multiple overlay choices: streamlines of velocity, magnetic field, and a velocity vector field. Velocities showcase the fastest moving components which are regions that the jets occupy. Since jets are produced by magnetic fields, regions with the strongest magnetic fields are also a sign of jet. At the bottom of the page, I have included animations of 2-dimensional slices in the xy plane (left) and in the xz plane (right). These animations show different slices through the volumetric data, with a slider that can select the position of the slice. The colorbars depict the logarithm of density.

The 3D visualization along with 2D animations were produced using Plotly. I decided to use Plotly for its flexibility to produce all kinds of animations. Moreover, Plotly has vast documentation and many examples in its website/gallery. 
  
