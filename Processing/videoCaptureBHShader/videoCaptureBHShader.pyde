#add the library
add_library('video')

#define some variables that will be used later (as globals)
video = None
scl = 8 #scale, to speed up capture
#I *think* this is the default aspect of my webcam and cannot be changed (otherwise image is stretched)
aspect = 3/4.
#seems like anything over 80 pixels here doesn't work (maybe too slow?)
iWidth = 80 #width of the image
iHeight = int(round(iWidth*aspect)) #height of the image
fRate = 6 #frame rate (anything higher than 6 here doesn't seem to work either)


iMBH = [0.01] #mass of BH(s)
ixBH = [0.5] #BH x position(s), in fraction of the screen size, origin in upper left
iyBH = [0.5] #BH y position(s), in fraction of the screen size, origin in upper left
iLscale = 1. #length scale

#for the shaders
sh = None
img = None

#for mouse events
locked = False
mcount = None

def setup():
    global sh, img, video
    size(iWidth*scl, iHeight*scl, P2D)
    frameRate(fRate)
    noStroke()
    
    #load the shaders
    sh = loadShader("fragment.glsl", "vertex.glsl")

    #for the video
    #start the video capture process
    video = Capture(this, iWidth, iHeight, fRate)
    video.start()
    #create an image to hold the current frame of the webcam 
    img = createImage(video.width, video.height, ARGB);
    
#An event for when a new frame is available
def captureEvent(c):
    c.read()

def draw():
    global mcount
    background(0)
    translate(width/2., height/2.)
    i=0
    
    #increase the mass of the BH when mouse+"m" is pressed
    if(locked and keyPressed):
        if (key == "m"):
            if (mcount == None):
                mcount = millis()
            resetBHmass(min(max((millis() - mcount)/500., 1.), 20))
           
    #define the shader and all variables
    shader(sh)
    sh.set("MBH", iMBH[i])
    sh.set("xBH", ixBH[i])
    sh.set("yBH", iyBH[i])
    sh.set("xSize", float(video.width))
    sh.set("ySize", float(video.height))
    
    textureMode(NORMAL)
    beginShape(QUADS)
    #send the current video fram to the shader as a texture
    if (video.available()):
        video.read()
        img.copy(video, 0, 0, video.width, video.height, 0, 0, img.width, img.height);
        texture(img)
        
    #now define the Quad
    normal(0,0,1)
    vertex(-width/2., height/2., 0, 1)
    vertex(width/2., height/2., 1, 1)
    vertex(width/2., -height/2., 1, 0)
    vertex(-width/2., -height/2., 0, 0)

    endShape()
                 

def resetBHpos(i=0):
    global ixBH, iyBH
    ixBH[i] = float(mouseX)/float(width)
    iyBH[i] = float(mouseY)/float(height)  

def resetBHmass(dur, i=0):
    global iMBH
    if (dur != None):
        iMBH[i] = dur*0.01;
        
#mouse events
def mousePressed():
    global locked, mcount
    locked = True 
    mcount = None
    resetBHpos()
    resetBHmass(1.)
    
def mouseDragged():
    if(locked):
        mcount = millis()
        resetBHpos()
    
def mouseReleased():
    global locked, mcount
    locked = False
    mcount = None
