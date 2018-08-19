##############
## Somehow I need to account for the different aspect ratio of the video
## It seems to work best if I send a square to the shader

#add the video library
add_library('video')

#see the list of resolutions of the webcam
### YOU NEED TO CHOOSE A RESOLUTION AND FRAMERATE FROM THIS LIST
#print(Capture.list())

#define some variables that will be used later (as globals)
video = None
scl = 1 #scale, to speed up capture (not needed on my laptop)
aspect = 9./16. #this is the  aspect (y/x) of my webcam and cannot be changed 
iSize = 720 #height of the image
fRate = 30 #frame rate 

#for BHs
NBH = 100 #maximum number of BHs
iMBH = [-1. for x in range(NBH)] #BH masses (if < 1, no BH will be drawn)
ixBH = [0. for x in range(NBH)] #BH x positionx, in fraction of the screen size, origin in upper left
iyBH = [0. for x in range(NBH)] #BH y positionx, in fraction of the screen size, origin in upper left
ipos = 0
maxBHmass = 0.2

#for the shaders
sh = None
img = None

#for mouse events
locked = False
addBH = False
mcount = None

def setup():
    global sh, img, video
    size(iSize*scl, iSize*scl, P2D)
    #canvas = createGraphics(width, height, P2D)
    frameRate(fRate)
    noStroke()
    

    
    #load the shaders
    sh = loadShader("fragment.glsl", "vertex.glsl")

    #for the video
    #start the video capture process
    video = Capture(this, int(round(iSize/aspect)), iSize, fRate)
    video.start()
    #create an image to hold the current frame of the webcam 
    img = createImage(width, height, ARGB);

    
#An event for when a new frame is available
def captureEvent(c):
    c.read()
    if (ipos == 0):
        diffx = int(round( (video.width - width/scl)/2. ))
        img.copy(video, diffx, 0, video.width-diffx*2, video.height, 0, 0, img.width, img.height);

        
def draw():
    #check for keyboard input
    if( keyPressed):
        handleKeys()

    #define the shader and all uniforms
    if (iMBH[ipos] > 0 or ipos == 0):
        shader(sh)
        sh.set("MBH", iMBH[ipos])
        sh.set("xBH", ixBH[ipos])
        sh.set("yBH", iyBH[ipos])
        sh.set("xSize", float(video.width))
        sh.set("ySize", float(video.height))
        sh.set("vtex",img)
            
        textureMode(NORMAL)
        translate(width/2., height/2.)
        background(0)
        beginShape(QUADS)
        
        #now define the Quad
        normal(0,0,1)
        vertex(-width/2., height/2., 0, 1)
        vertex(width/2., height/2., 1, 1)
        vertex(width/2., -height/2., 1, 0)
        vertex(-width/2., -height/2., 0, 0)
        endShape()
        
    resetShader()
    
#keyboard 
def handleKeys():
    global mcount, addBH
    #reset the BH array if "r" is pressed
    if (key == "r"):
        resetBH()
        
    #increase the mass of the BH when mouse+"m" is pressed
    if(locked and key == "m"):
        if (mcount == None):
            mcount = millis()
        setBHmass(min(max((millis() - mcount)/500., 1.), maxBHmass/0.01))

    #add more BHs (will pause the image)
    if (key == "a"):
        addBH = True
        
    #save the image
    if (key == "s"):
        c = get()
        c.save("outputImage.jpg")
        
#set the BH parameters
def setBHpos():
    global ixBH, iyBH
    ixBH[ipos] = float(mouseX)/float(width)
    iyBH[ipos] = float(mouseY)/float(height)  

def setBHmass(dur):
    global iMBH
    if (dur != None):
        iMBH[ipos] = dur*0.01;
        
def resetBH():
    global ixBH, iyBH, iMBH, ipos, addBH
    iMBH = [-1. for x in range(NBH)] 
    ixBH = [0. for x in range(NBH)]
    iyBH = [0. for x in range(NBH)] 
    ipos = 0
    addBH = False
    resetShader()

#mouse events
def mousePressed():
    global locked, mcount
    locked = True 
    mcount = None
    setBHpos()
    setBHmass(1.)
    
def mouseDragged():
    if(locked):
        mcount = millis()
        setBHpos()
    
def mouseReleased():
    global locked, mcount, ipos, img
    locked = False
    mcount = None
    if (addBH):
        ipos += 1
        if (ipos > 0 and ipos < NBH):
            img = get()
        ipos = min(ipos, NBH-1)
