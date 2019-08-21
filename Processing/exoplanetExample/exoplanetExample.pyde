
#read in the csv file, 
#each frame, plot an ellipse for each exoplanet, colored by the mass, 
#sort by either semi-major axis or time
#zoom in by mouse wheel

import math


index = 0

sma = []
ecc = []
mass = []
yr = []

aScale = 2000.

file = '/Users/ageller/Visualizations/FSS_VIZ/onGitHub/IDEAS_FSS-Vis/Processing/exoplanetExample/data/compositepars_2019.08.21_11.02.05.csv'
table = loadTable(file, "header")
    
def setup():
    global table, sma, ecc, mass, yr
    #set up the viewer
    size(1000, 1000);
    frameRate(10);
    
    #print("%i total rows in table" % (table.getRowCount()))

    #read in the data
    a0 = []
    e0 = []
    m0 = []
    y0 = []
    for row in table.rows():
        a = row.getFloat("fpl_smax")
        e = row.getFloat("fpl_eccen")
        m = row.getFloat("fpl_bmasse")
        y = row.getFloat("fpl_disc")
        if (not math.isnan(a) and not math.isnan(e)):
            a0.append(a)
            e0.append(e)
            m0.append(m)
            y0.append(y)

    #sort by semi-major axis
    #isort = [int(i[0]) for i in sorted(enumerate(a0), key=lambda x:x[1])]
    
    #sort by year
    isort = [int(i[0]) for i in sorted(enumerate(y0), key=lambda x:x[1])]
    
    for i in isort:
        sma.append(a0[i])
        ecc.append(e0[i])
        mass.append(m0[i])
        yr.append(y0[i])

        
def draw():
    global sma, ecc, mass, index, aScale
    
    clear()
    background(200, 200, 200);
    translate(width/2, height/2);
    
    #for colors
    c0 = color(75, 0, 130) #indigo
    c1 = color(60, 179, 113) #medium sea green
    cmin = 1. 
    cmax = 3.
    ellipseMode(RADIUS);
    noFill();
    if (index < len(sma)):
        for i in range(index):
            a = aScale*sma[i]
            c = aScale*sma[i]*ecc[i]
            b = math.sqrt(a*a - c*c)
            stroke(lerpColor(c0, c1, (math.log10(mass[i]) - cmin)/(cmax-cmin) ) );
            ellipse(c, 0, a, b);
        print(sma[index], ecc[index], math.log10(mass[index]), aScale)
        index += 1
        
def mouseWheel(event):
    global aScale
    aScale -= event.getAmount()*50.
    aScale = max(aScale, 50)
