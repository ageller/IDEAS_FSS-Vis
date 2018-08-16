#!/bin/bash

gmt pscoast -N1/0.5p,black -N2/0.01p,black,- -Bag -B+t"LIGO" -W1 -Y5i -R-130/-50/20/50 -JM6i -Dc -Glightbrown -Slightblue -P -K > map.ps
gmt psxy line.txt -W1p -Gblack -R-130/-50/20/50 -JM6i -P -K -O >> map.ps
gmt psxy coordH.txt -Gblue -Sa0.125i -R-130/-50/20/50 -JM6i -P -K -O >> map.ps
gmt psxy coordL.txt -Gred -Sa0.125i -R-130/-50/20/50 -JM6i -P -K -O >> map.ps
gmt pstext textH.txt -D0.4i/-1.25i -F+fblue -R-130/-50/2/50 -JM6i -P -K -O >> map.ps
gmt pstext textL.txt -D0.4i/-1.25i -F+fred -R-130/-50/2/50 -JM6i -P -K -O >> map.ps
gmt psxy H1.txt -X3.5i -Y1.5i -Bag -B+gwhite -R0.2/0.5/-1.2/1.5 -JX2i/1i -Gblue -P -K -O >> map.ps
gmt psxy L1.txt -R0.2/0.5/-1.2/1.5 -JX2i/1i -Gred -P -O >> map.ps

gs map.ps
