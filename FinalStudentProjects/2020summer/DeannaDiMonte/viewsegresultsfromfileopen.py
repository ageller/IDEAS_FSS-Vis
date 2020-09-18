# Deanna DiMonte 2020
# For IDEAS Visualization project
# To easily display biomedical segmentations and compare to
# machine learning predicted results
# used many sources including deepmedic github plotting function
# https://stackoverflow.com/questions/47084179/how-to-calculate-multi-class-dice-coefficient-for-multiclass-image-segmentation

from __future__ import absolute_import, print_function
from six.moves import xrange
import os
import sys
import argparse
import re
import numpy as np
import matplotlib.mlab as mlab
import matplotlib as mpl
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button
from math import pi
import matplotlib.animation as animation
from collections import deque
import time
from skimage import io
import nibabel as nib
import os.path
from os import path
import scipy
import math
import pandas as pd
import matplotlib.patches as mpatches
import fileinput
import copy as cp

#TODO
#Fix resizing
#Drop down for multiple model comparison with dynamic dice score
#Drop down for choosing different brain
#overall statistics
#toggle outlines for mask
#save figure as gif
#change play/pause button into toggle
#add forwards/backwards button to sift through
#play backwards?
#reset?
#do more sophisticated file handling

class AnalogPlot:
    def __init__(self, data, display_len, mask, maskc, tone, flair,numCats,colors,catNames):
        self.buff = deque(np.zeros(display_len))
        #self.buff_mask = deque(np.zeros(mask[0].shape))
        self.display_len = display_len
        self.data = data
        self.mask = mask
        self.maskc = maskc
        self.mri = tone
        self.numCats = mask.flatten().max()
        self.T1 = True
        self.tone=tone
        self.flair=flair
        self.dice=calcDice(mask,maskc,numCats)
        t_max = display_len
        self.alph = 1
        alphaColor = cp.deepcopy(colors)
        alphaColor.insert(0,(1,0,0,0))
        self.cmap = mpl.colors.ListedColormap(alphaColor)
        bounds = np.linspace(-.5,numCats+.5,num=numCats+2)
        norm = mpl.colors.BoundaryNorm(bounds,self.cmap.N)
        
        self.fig, (self.ax,self.ax2,self.ax3) = plt.subplots(1, 3, sharex=False, sharey=False,figsize=(10,8))
        self.fig.subplots_adjust(left=0,right=1,wspace=0)
        self.ax.get_xaxis().set_visible(False)
        self.ax.get_yaxis().set_visible(False)
        self.ax2.get_xaxis().set_visible(False)
        self.ax2.get_yaxis().set_visible(False)
        self.ax3.get_xaxis().set_visible(False)
        #self.ax3.get_yaxis().set_visible(False)
        self.ax3.set_aspect(.02)
        self.ax.set_xlabel('Segementation 1')
        self.ax2.set_title('Segmentation 2')
        self.ax3.set_title('Dice Scores per Tissue Category')
        self.lines=self.ax.imshow(self.mri[0],cmap='gray',vmin=0,vmax=255)
        self.lines2=self.ax2.imshow(self.mri[0],cmap='gray',vmin=0,vmax=255)
        self.lines=self.ax.imshow(self.mask[0],cmap=self.cmap,vmin=0,vmax=self.numCats,alpha = self.alph)
        self.lines2=self.ax2.imshow(self.maskc[0],cmap=self.cmap,vmin=0,vmax=self.numCats,alpha = self.alph)
        ind = np.arange(len(self.dice))
        dicedata = pd.DataFrame(self.dice, columns = ['value'])
        dicedata['names']=catNames
        self.rects=self.ax3.barh(ind,dicedata['value'],color=colors)
        #self.ax3.set_ylim = 1
        
        PG = mpatches.Patch(color='blue',label='periinfarct gliosis')
        PWM = mpatches.Patch(color='orange',label='periventricular white matter disease')
        RLI = mpatches.Patch(color='green',label='right sided lacunar infarcts and gliosis')
        LLI = mpatches.Patch(color='red', label='left sided lacunar infarcts')
        CI = mpatches.Patch(color='purple',label='core infarct')
        LWM = mpatches.Patch(color='yellow',label='left sided white matter')
        RWM = mpatches.Patch(color='pink', label='right-sided white matter')
        
        hands = []
        for i in range(numCats):
            hands.append(mpatches.Patch(color=colors[i],label=catNames[i]))
            
        
        self.ax3.legend(handles=hands,bbox_to_anchor=(0., 1.25, 0.6, 0.), loc='lower right',ncol=4, borderaxespad=0.)
        
        count = 0
        for rect in self.rects:
            height = rect.get_height()
            width = rect.get_width()
            y = rect.get_y()
            x = rect.get_x()
            if count == 0:
                x = x - .01
            self.ax3.text(x+width+.01,y+.01,'%.2f' % width, ha='center',va='bottom',zorder=3,fontsize=12)
            count = count + 1
            
        self.cur_frame = 0
        self.anim = animation.FuncAnimation(self.fig, self._update,
                                            interval=1.0)

        # setup the animation control
        self.anim_running = True

    def _update(self, frame):
        frame = self.cur_frame
        self.ax.images.remove(self.lines)
        self.ax2.images.remove(self.lines2)
        self.ax.clear()
        self.ax2.clear()
        self.lines=self.ax.imshow(self.mri[frame],cmap='gray',vmin=0,vmax=255)
        self.lines2=self.ax2.imshow(self.mri[frame],cmap='gray',vmin=0,vmax=255)
        self.lines=self.ax.imshow(self.mask[frame],cmap=self.cmap,vmin=0,vmax=self.numCats,alpha=self.alph)
        self.lines2=self.ax2.imshow(self.maskc[frame],cmap=self.cmap,vmin=0,vmax=self.numCats,alpha=self.alph)
        self.ax.set_title('Segmentation 1')
        self.ax2.set_title('Segmentation 2')

        self.time_slider.eventson = False
        self.time_slider.set_val(frame)
        self.time_slider.eventson = True
        if self.anim_running==False:
            self._pause(self)
        elif self.cur_frame>=self.data.shape[0]:
            self._pause(self)
        else:
            self.cur_frame += 1

        return self.lines
            
    def _pause(self, event):
        self.anim.event_source.stop()
        self.anim_running = False
    def _play(self, event):
        self.anim.event_source.start()
        self.anim_running = True

    def _reset(self, event):
        self._set_val(0)

    def _set_val(self, frame=0):
        frame = int(frame)
        self.cur_frame = frame

        self.anim.event_source.stop()
        self.anim = animation.FuncAnimation(self.fig, self._update,interval=1.0)
        self.anim_running = False
    
    def _set_alph(self, val=0):
        self.alph = val
        self.anim = animation.FuncAnimation(self.fig, self._update,interval=1.0)

    def _toggle(self,event):
        if self.T1 == True:
            self.T1 = False
            self.toggle_button.label.set_text("FLAIR")
            self.mri = self.flair
        else:
            self.T1 = True
            self.toggle_button.label.set_text("T1")
            self.mri = self.tone
        self.anim = animation.FuncAnimation(self.fig, self._update,interval=1.0)
        

    def animate(self):
        pause_ax = self.fig.add_axes((0.8, 0.06, 0.1, 0.04))
        pause_button = Button(pause_ax, 'pause', hovercolor='0.975')
        pause_button.on_clicked(self._pause)
        
        self.toggle_ax = self.fig.add_axes((0.8, 0.02, 0.1, 0.04))
        self.toggle_button = Button(self.toggle_ax, 'T1', hovercolor='0.975')
        self.toggle_button.on_clicked(self._toggle)
        
        play_ax = self.fig.add_axes((0.7, 0.06, 0.1, 0.04))
        play_button = Button(play_ax, 'play', hovercolor='0.975')
        play_button.on_clicked(self._play)


        slider_ax = self.fig.add_axes((0.1, 0.06, 0.5, 0.04))
        self.time_slider = Slider(slider_ax, label='Slice',
                                  valmin=0, valmax=self.data.shape[0],
                                  valinit=0.0,valstep = 1)
        self.time_slider.on_changed(self._set_val)
        
        slider_ax2 = self.fig.add_axes((0.1, 0.02, 0.5, 0.04))
        self.alpha_slider = Slider(slider_ax2, label='Mask',
                                  valmin=0, valmax=1,
                                  valinit=1.0,valstep = .01)
        self.alpha_slider.on_changed(self._set_alph)
        
        plt.show()


def dice_coef(y_true, y_pred, epsilon=1e-6):
    y_true_flatten = np.array(y_true).flatten().astype(np.bool)
    y_pred_flatten = np.array(y_pred).flatten().astype(np.bool)

    if not np.sum(y_true_flatten) + np.sum(y_pred_flatten):
      return 1.0

    return (2. * np.sum(y_true_flatten * y_pred_flatten)) /\
         (np.sum(y_true_flatten) + np.sum(y_pred_flatten) + epsilon)

def calcDice(mask1,mask2,numCats):
    dice=np.zeros(numCats)
    for i in range(1,8):
        dice[i-1] = dice_coef(mask1==i,mask2==i)
    return dice

def plottest(numCats,colors,catNames,tonep,flairp,maskp,maskcp):
    t_max = 100
    
    
    #maskp = "files/mask.nii"
    mask = nib.load(maskp)
    maskdata = mask.get_fdata()
    maskdata = maskdata*numCats/np.array(maskdata).flatten().max()
    masknp = np.array(maskdata).astype(int)
    volm = masknp.T
    
    lin_sig = np.linspace(0, 1, masknp.shape[0]-4)
    #print(masknp.shape)
    
    #maskcp = "files/JH02out_Segmnew9amid.nii.gz"
    maskc = nib.load(maskcp)
    maskcdata = maskc.get_fdata()
    maskcdata = maskcdata*numCats/np.array(maskcdata).flatten().max()
    maskcnp = np.array(maskcdata).astype(int)
    volmc = maskcnp.T
    
    #tonep = "files/t1.nii"
    tone = nib.load(tonep)
    tonedata = tone.get_fdata()
    tonenp = np.array(tonedata)
    tonenp = ((tonenp - tonenp.min()) * (1/(tonenp.max() - tonenp.min()) * 255)).astype('uint8')
    vol = tonenp.T
    
    #flairp = "files/flair.nii"
    flair = nib.load(flairp)
    flairdata = flair.get_fdata()
    flairnp = np.array(flairdata)
    flairnp = ((flairnp - flairnp.min()) * (1/(flairnp.max() - flairnp.min()) * 255)).astype('uint8')
    volf = flairnp.T
    
    analog_plot = AnalogPlot(lin_sig, t_max, volm, volmc, vol, volf,numCats,colors,catNames)
    analog_plot.animate()

if __name__ == '__main__':
    instr = ""
    count = 0
    for line in fileinput.input():
        if '[' in line:
            setting = line.split('[')[1]
            setting = setting.split(']')[0]
            count = count + 1
            if count == 1:
                numCats = int(setting)
            elif count == 2:
                colors = setting.split('|')
            elif count == 3:
                catNames = setting.split('|')
            elif count == 4:
                tonefp = setting
            elif count == 5:
                flairfp = setting
            elif count == 6:
                maskp = setting
            elif count ==7:
                maskcp = setting
            
    plottest(numCats,colors,catNames,tonefp,flairfp,maskp,maskcp)
