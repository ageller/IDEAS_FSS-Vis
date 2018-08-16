import numpy as np
import matplotlib.pyplot as plt
import pdb


def return_func(x,y,t):
	r = np.sqrt(x**2.+y**2)
	#pdb.set_trace()
	check = np.sin(5*r-2*np.pi*t)
	keep = np.where(check == check.max())
	return x[keep],y[keep]

num = 5000
x_arr = np.linspace(-5.0,5.0,num)
y_arr = np.linspace(-5.0,5.0,num)
t_arr = np.linspace(0,1,50)
length = len(t_arr)
print(t_arr)

x_arr,y_arr = np.meshgrid(x_arr,y_arr)

i=0
for t in t_arr:
	xout,yout = return_func(x_arr,y_arr,t)
	print(i)
	np.savetxt('wave%i.txt'%i, np.transpose(np.array([xout.ravel(),yout.ravel()])), delimiter = '\t',fmt = '%.4e')
	i+=1

