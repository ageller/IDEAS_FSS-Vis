#add the library
add_library('video')

#define some variables that will be used later (as globals)
video = None
show_fps = False
x = None
y = None
scl = 2 #scale, to speed up capture
lsize = 50
iWidth = 320
iHeight = 240
fRate = 12

iG = 1. #graviational constanc
ic = 1. #speed of light
iM = 2. #mass of BH

#setup the video
def setup():
    global video, x, y
    size(iWidth, iHeight)
    #start x and y in the center
    x = width/2./scl
    y = height/2./scl
    #start the video capture process
    video = Capture(this, iWidth/scl, iHeight/scl)
    video.start()
    frameRate(fRate)

#An event for when a new frame is available
def captureEvent(c):
    c.read()

#display the video
def draw():
    global video, x, y
    scale(scl)
    video.loadPixels()
    
    rs = 2.*iG*iM/ic**2. #sChwarzschild radius
    xmid = video.width/2.
    ymid = video.height/2.
    dimension = video.width * video.height
    #Loop through every pixel column
    for x in range(int(width/scl)):
    #Loop through every pixel row
        for y in range(int(height/scl)):
            #Use this formula to find the 1D location
            loc = x + y * width/scl;

            r = sqrt((x-xmid)**2. + (y-ymid)**2.)
            if (r <= rs):
                video.pixels[loc] = color(0)
            else:
                theta = atan2(y,x)
                thetaNew = constrain(theta + 4.*iG*iM/(r*ic**2.), 0, 2.*PI)
                
                #r = sqrt(x**2. + y**2.)
                #off center for some reason
                xnew = int(r * cos(thetaNew))
                ynew = int(r * sin(thetaNew))
                locnew = xnew + ynew * width/scl;
                #change some pixels
                video.pixels[loc] = video.pixels[locnew]

    image(video, 0, 0)


#if you press the mouse, do this
# def mousePressed():
#     global show_fps
#     show_fps = not show_fps
