# FSS-Vis_final_project
_Author:_ **Cole Kampa**

## Visual elements:
- Green sphere: electron (converted from stopped muon in Stopping Target)
- Arrows starting at electron:
  - Blue: velocity vector
  - Red: magnetic field vector
  - Green: force vector
- Red cylinder: Stopping Target
- Yellow cylinder: straw tube gas ionization Tracker (momentum measurement)
- Grey open-ended cylinder: Detector Solenoid inner cryostat wall

## How to use:
- Startup begins with menu overlay
  - Navigate to information about the experiment, an interactive plot of the Mu2e magnetic field, and README pages using the purple buttons in the footer
  - Toggle menu overlay by pressing the "mainmenu" button in the GUI in the upper-right of the window
  
- GUI (bottom to top)
  - **play_pause**: toggles electron moving through magnetic field
  - **reset**: set electron back to origin (in stopping target)
  - **mainmenu**: toggles menu overlay
  - **Camera Controls**:
    - **flip_cam**: reflect camera over xy-plane of the particle
    - **camRadius**: zoom in (decrease radius) or zoom out (increase radius) to electron
    - **camTheta**: "vertical" angle of camera
    - **camPhi**: "horizontal" angle of camera
  - **Monitor**: updates metrics of electron at any point in track (see **Units**)
    - **Postion**: X, Y, Z
    - **Velocity**: Vx, Vy, Vz
    - **Magnetic Field**: Bx, By, Bz
    - **Force**: Fx, Fy, Fz
  - **Toggle Elements**: folder containing toggle buttons for visibility of each element in the scene
  - **particleIndex**: dropdown to select from 4 different tracks with distinct features
    - normal
    - smallbounce:
    - bigbounce:
    - low-pT: low transverse-momentum. Particle track has a very small radius that is difficult to detect with the Tracker

## Units:
- Position: mm
- Velocity: v / c * 1000 (* 1000 so GUI displays more than "0" and "1")
- Magnetic Field: Gauss (1 Gauss = 1e-4 Tesla)
- Force: mN

## Discussion:
For my FSS-Vis 2019 final project I have created a visualization with the three.js JavaScript library to view a simulated event in the Mu2e detector. The is a dataset that I've been working on for several months, so I have been looking for interesting ways to visualize it. The files that generate the data randomly sample locations of stopped muons in the stopping target (found in Mu2e simulations) and generate an initial velocity direction. The momentum is fixed at 105 MeV/c, which is the characteristic momentum of a true muon-to-electon conversion. The output of this is track information including position, timing, velocity, momentum, and energy at each point in the track.

Since the data is inherently positional in 3-space (cartesian coordinates), I decided to use three.js, which is a nice library for using WebGL with JavaScript. While the learning curve is steep, the general structure of an "animation loop" seemed very intuitive to me. With position and time visualized in the 3D scene by design, I was able to add in other visual tools to give further insights (e.g. vector arrows). In addition to this being a good tool for the job, I wanted to learn something new! :smile:

The development of this software went roughly as follows: worked example of three.js in class; worked through first several chapters of "Learn Three.js - Third Edition" by Jos Dirksen; adapted a simple example/structure from "Learn Three.js" to form the basic scene for my visualization; slowly added features until current state (This timeline ignores the bits in between of trying something and failing). There were many struggles in creating this visualization, but the most difficult part was realizing geometries. I attempted to use preexisting 3D models of the experiment, but that did not come to fruition (but I spent half a day struggling on this). Luckily the main components were easily approximated by spheres and cylinders, but I was surprised how difficult it was to get anything much more complex than this in three.js. I plan to work on this more in the future.

I hope this visualization is useful for people in and out of the Mu2e experiment. For the former: I hope this demonstrates some of the general principles of the experiment, and sparks an interest in the science. For the latter: this may be used now or later to inspect specific particle tracks and see fine details or larger structures.
