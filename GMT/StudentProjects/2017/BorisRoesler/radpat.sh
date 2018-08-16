#!/bin/bash

ps=radpat.ps
mxmn=(`gmt info -C radpat.txt`)
R="-R${mxmn[0]}/${mxmn[1]}/${mxmn[2]}/${mxmn[3]}"

gmt psbasemap -R-125.278/-105.278/22.297/42.297 -JM4i -Ba:."Radiation Pattern (0.04Hz)": -P -K > $ps

gmt pscoast -R -J -Di -G139/131/120 -S191/239/255 -Lf-120/24/10/1000+l -P -K -O >> $ps

gmt psxy $R -JM2i radpat.txt -W1.0 -X0.98i -Y0.62i -P -K -O >> $ps

pstext -R-125.278/-105.278/22.297/42.297 -JM4i -X-0.98i -Y-0.62i -P -K -O -W1 -Gwhite <<END>> $ps
-111 34.25 Mw = 7.2 (April 4, 2010)
END

psmeca -R -J -Sc0.3i -h1 -P -O <<END>> $ps
lon     lat   depth str  dip slip st  dip slip mant exp plon plat
-115.39 32.31 12.8  223  84  -2   313 88  -174 7.2  0   0    0
END