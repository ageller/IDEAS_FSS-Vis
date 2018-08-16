#!/bin/bash

for i in {0..49};
do
	gmt psxy wave$i.txt -R-6/6/-6/6 -Jx1.25c -Sc0.2i -Gblack > ex.ps
	gmt psconvert ex.ps -Tt -Fwave_out$i.tif
done




