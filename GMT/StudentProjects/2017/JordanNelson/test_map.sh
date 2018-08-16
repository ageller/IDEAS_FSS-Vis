#!/bin/bash

gmt pscoast -Df -R-130/-80/20/50 -JD-100/35/33/45/6i -Ba -K -Dc -Ggray -W1/0 -P > GMT_US.ps
gmt psxy detector_locations.xy -: -R -J -O -K -P -Gred -St0.25i -V >> GMT_US.ps
gmt psbasemap -R -JX1i/0.5i  -B+gwhite+t"LIGO L1" -P -O -K -X4i -Y1.6i >> GMT_US.ps
gmt psxy -V3 -R0.22/0.5/-0.055/0.25 -J L1_obs.txt -Wred -P -O -K >> GMT_US.ps
gmt psbasemap -R -JX1i/0.5i  -B+gwhite+t"LIGO H1" -P -O -K -X-1.6i -Y1.2i >> GMT_US.ps
gmt psxy -V3 -R0.22/0.5/-0.055/0.25 -J H1.txt -Wred -P -O >> GMT_US.ps


gs GMT_US.ps


