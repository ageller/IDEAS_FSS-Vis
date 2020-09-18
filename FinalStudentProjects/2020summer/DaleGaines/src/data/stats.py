import os
from numpy import *
from numpy.linalg import *
import pandas as pd

infile = "dump.txt"
statsfile = "stats.csv"

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

efile = genfromtxt('log.txt', skip_header=1)
energy = efile[:, 4]

out=open(statsfile,'w')
out.write('time,energy,radius2\n')
# ### Analyze the data
R2_array = []
for timestep,box,atoms,energy in zip(timesteps,boxes,atoms,energy):
## Sort the atoms according to their ID number
    atoms = array(sorted(atoms, key=lambda x: x[0]))
    coords = array([ atom[2:] for atom in atoms]).reshape(len(atoms)/100,100,3)

    ### < R^2 > is the distance between the first and last atoms over all molecules
    R2 = average([ norm(mol[99] - mol[0])**2 for mol in coords ])

    out.write('%s,%s,%s\n' % (timestep,energy,R2))

out.close()
