#!/bin/bash
#               GMT EXAMPLE 39
#               $Id: example_39.sh 17711 2017-03-17 20:55:30Z pwessel $
#
# Purpose:      Illustrate evaluation of spherical harmonic coefficients
# GMT modules:  psscale, pstext, makecpt, grdimage, sph2grd
# Unix progs:   rm
#
rm venus.ps
rm *.tif

ps=venus.ps

# Evaluate the first 180, 90, and 30 order/degrees of Venus spherical
# harmonics topography model, skipping the L = 0 term (radial mean).
# File truncated from http://www.ipgp.fr/~wieczor/SH/VenusTopo180.txt.zip
# Wieczorek, M. A., Gravity and topography of the terrestrial planets,
# Treatise on Geophysics, 10, 165-205, doi:10.1016/B978-044452748-6/00156-5, 2007

gmt sph2grd VenusTopo180.txt -I1 -Rg -Ng -Gv3.nc -F1/1/170/180
gmt grd2cpt v3.nc -Crainbow -E > t.cpt

az=0
#while [  $az -lt 360  ]; do
	gmt grdimage v3.nc -JG$az/0/5i -P -K -Bg -Ct.cpt > $ps
	gmt psscale --FORMAT_FLOAT_MAP="%'g" -Ct.cpt -O -P -Dx1.25i/-0.2i+jTC+w5.5i/0.1i+h -X1.2i -Bxaf -By+lm >> $ps
	#echo 3.75 5.4 Venus Topography | gmt pstext -R0/6/0/6 -Jx1i -O -P -F+f24p+jCM -N >> $ps
	gmt psconvert $ps -Tt -Fazimuth$az.tif
#	let az=az+5
#	rm $ps
#done


rm -f v?.nc t.cpt
