import os
from numpy import *
from numpy.linalg import *
import pandas as pd

infile = "dump.txt"
outfile = "medium.out"
outfile2 = "medium.csv"

timesteps = []
boxes = []
atoms = []
next_tstep = False
next_natoms = False
next_atoms = False
next_box = 0
new_box = []
new_atoms = []
atom_rem = 0

### Read in the dump file
f = open(infile,'r')
for line in f.readlines():
    if next_tstep:
        next_tstep = False
        timesteps.append(float(line))
        continue
    if next_box:
        next_box -= 1
        l,u = line.split()
        new_box.append(float(u) - float(l))
        if next_box == 0:
            boxes.append(array(new_box))
            new_box = []
        continue
    if next_natoms:
        next_natoms = False
        atom_rem = int(line)
        continue
    if next_atoms and atom_rem:
        atom_rem -= 1
        new_atoms.append(map(float,line.split()))
        if atom_rem == 0:
            atoms.append(array(new_atoms))
            new_atoms = []
            next_atoms = False
        continue
    if 'ITEM: TIMESTEP' in line:
        next_tstep = True
        continue
    if 'ITEM: BOX BOUNDS' in line:
        next_box = 3
        continue
    if 'ITEM: NUMBER OF ATOMS' in line:
        next_natoms = True
        continue
    if 'ITEM: ATOMS' in line:
        next_atoms = True
        continue

f.close()

out=open(outfile,'w')
out.write('time,group,atom,x,y,z\n')
# ### Analyze the data
R2_array = []
for timestep,box,atoms in zip(timesteps,boxes,atoms):
    ## Sort the atoms according to their ID number
    atoms = array(sorted(atoms, key=lambda x: x[0]))
    coords = array([ atom[2:] for atom in atoms]).reshape(len(atoms)/100,100,3)

    for i, coord in enumerate(coords):
        for j, pos in enumerate(coord):
            x, y, z = pos
            out.write('%s, %s, %s, %s, %s, %s\n' % (timestep, i, j, x, y, z))

out.close()

df = pd.read_csv(outfile)
if "medium" in outfile2:
    df = df[(df['group'].isin([0,1,25,26]))]
    df['group'] = df['group'].replace([25,26], [2,3])
if "large" in outfile2:
    df = df[(df['group'].isin([0,1,2,25,26,27,50,51,52]))]
    df['group'] = df['group'].replace([25,26,27,50,51,52], [3,4,5,6,7,8])
df['time'] = (df['time']).astype(int)
df['x'] = df['x'] - mean(df['x'])
df['y'] = df['y'] - mean(df['y'])
df['z'] = df['z'] - mean(df['z'])
df.to_csv(outfile2)

os.remove(outfile)
