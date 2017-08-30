import numpy

import OpenGL 
OpenGL.ERROR_ON_COPY = True 
from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *

from OpenGL.GL import shaders
from OpenGL.GL.ARB.vertex_buffer_object import *
from OpenGL.arrays import vbo

from matplotlib import pyplot
from PIL import Image 

#for icosophere, from here: http://prideout.net/blog/?p=44
import polyhedra

#grabbed this online somewhere
from eulerangles import euler2mat


class runPyOpenGL(object):
    def __init__(self, *args, **kwargs):


        #vertex and fragment shaders
        self.vertexfile = 'shaders/vertex.glsl' 
        self.fragmentfile = 'shaders/fragment.glsl'

        #apply lighting?
        self.doLighting = False

        #draw only lines between vertices?
        self.drawLine = False
        
        #this will store the shaders
        self.program = None
        
        #this is what will draw the scene, just defined here so that you can choose from the different options below
        self.drawGLScene = self.drawScene
        self.doSphere = True
        self.doBillboard = False

        #sort objects by Z distance? (Important for some transparency)
        self.doSort = False 
        
        #image file for texture
        self.imfile = None 

        #window field of view (degrees)
        self.fov = 60. 

        #amount to move due to arrow pressed
        self.dxy = 0.2

        #rotation
        self.xrot = 0.
        self.yrot = 0.
        self.zrot = 0.
        self.centerX = 0.
        self.centerY = 0.
        self.centerZ = -1.
        self.rotated = True
        
        #camera location
        self.cameraX = 0.
        self.cameraY = 0.
        self.cameraZ = 0.

        #object(s) location
        self.objX = [0.]
        self.objY = [0.]
        self.objZ = [-1.]
        self.radius = [0.5]
        self.color = [ [0.,1.,1.,1.] ]
        
        #light direction and colors
        self.lightX = 0.
        self.lightY = 0.
        self.lightZ = 20.
        self.ambient = [0., 0., 0., 1.]
        self.diffuse = [1., 1., 1., 1.]
        
        #some limits on the camera
        self.cameraZmin = -200.
        self.cameraZmax = 100.
        
        #windows width and height
        self.window = None #will be defined below
        self.WindowWidth = 800
        self.WindowHeight = 800

        #for mouse controls (probably some better way to do this)
        self.mouse_x = 0.
        self.mouse_y = 0.
        self.dx_arr = []
        self.dy_arr = []

        #for the isosophere
        self.Nsubdivisions = 3
        self.verts = []
        self.faces = []

        #can use this to cause changes in shader
        self.time = -1. #currently I am ignoring this if self.time < 0
        self.dt = 0.002
        
    def LoadShaders(self):
        """
        Load in the shaders, called by InitGL
        """
        
        shader_file = open(self.vertexfile, 'r')        # open the file for reading
        vertex_shader_code = shader_file.read()             # read the whole file
        shader_file.close()                                 # close the file

        shader_file = open(self.fragmentfile, 'r')
        fragment_shader_code = shader_file.read()
        shader_file.close()                                 # close the file

        # Compile shaders
        vertex = shaders.compileShader(vertex_shader_code, GL_VERTEX_SHADER)
        fragment = shaders.compileShader(fragment_shader_code, GL_FRAGMENT_SHADER)
        self.program = shaders.compileProgram(vertex, fragment)


    def LoadTexture(self):
        """ 
        Load in a texture
        """
        
        image = Image.open(self.imfile)
	
        ix = image.size[0]
        iy = image.size[1]
        image = image.tobytes("raw", "RGBA", 0, -1)
	
        # Create Texture	
        texture = glGenTextures(1)
        glBindTexture(GL_TEXTURE_2D, texture)   # 2d texture (x and y size)
	
        glPixelStorei(GL_UNPACK_ALIGNMENT,1)
        glTexImage2D(GL_TEXTURE_2D, 0, 4, ix, iy, 0, GL_RGBA, GL_UNSIGNED_BYTE, image)
        glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST)
        glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST)
        glEnable(GL_TEXTURE_2D)


    def setLighting(self):
        """
        Define lighting
        """
        
        # Enable lighting
        glEnable(GL_LIGHTING)
        # Enable light number 0
        glEnable(GL_LIGHT0)
        #Automatically normalize normals
        #glEnable(GL_NORMALIZE)
        
        # Set light model
        ambient_color = numpy.array(self.ambient, 'f')
        glLightfv(GL_LIGHT0, GL_AMBIENT, ambient_color)
        glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambient_color)
    
        
        # Set position and color of light
        direction = numpy.array([self.lightX, self.lightY, self.lightZ, 0.0], 'f')
        glLightfv(GL_LIGHT0, GL_POSITION, direction)
        color = numpy.array(self.diffuse, 'f')
        glLightfv(GL_LIGHT0, GL_DIFFUSE, color)
    
        # Setup the material
        glEnable(GL_COLOR_MATERIAL)
        glColorMaterial(GL_FRONT, GL_AMBIENT_AND_DIFFUSE)
        
        glShadeModel(GL_SMOOTH)


    def drawBillboard(self, cx = 0., cy = 0., cz = 0., r = 1):
        """
        Draw a billboard (rectangle always facing the screen)
        """
        glTranslatef(cx, cy, cz)
        glRotatef( self.zrot, 0.0, 0.0, 1.0)
        glRotatef( self.yrot, 0.0, 1.0, 0.0)
        glRotatef( self.xrot, 1.0, 0.0, 0.0)
        
        vertex_arr = numpy.array([
            [-r, -r,  0.], \
            [ r, -r,  0.], \
            [ r,  r,  0.], \
            [-r,  r,  0.] ], 'f')
        tex_arr = numpy.array([
            [0, 0, 0], \
            [1, 0, 0], \
            [1, 1, 0], \
            [0, 1, 0] ], 'f')
        
        vertex_vbo = vbo.VBO(vertex_arr)
        tex_vbo = vbo.VBO(tex_arr)
        vertex_vbo.bind()
        glEnableClientState(GL_VERTEX_ARRAY)
        glEnableClientState(GL_TEXTURE_COORD_ARRAY)
        glVertexPointerf(vertex_vbo )
        glTexCoordPointerf(tex_vbo)
        glDrawArrays(GL_QUADS, 0, 4)
        
        glTranslatef(-cx, -cy, -cz)
        glRotatef( -self.xrot, 1.0, 0.0, 0.0)
        glRotatef( -self.yrot, 0.0, 1.0, 0.0)
        glRotatef( -self.zrot, 0.0, 0.0, 1.0)
        glDisableClientState(GL_VERTEX_ARRAY)
        glDisableClientState(GL_TEXTURE_COORD_ARRAY)

    #for the icosphere
    def getIsoSphere(self):

        verts, faces = polyhedra.icosahedron()
        for x in xrange(self.Nsubdivisions):
            verts, faces = polyhedra.subdivide(verts, faces)
        self.verts = verts
        self.faces = faces
        
    def drawIsoSphere(self, r = 1.):
        """
        draw an Iso-sphere (I'm not sure that the texture coordinates are quite right)
        """
        
        if (len(self.verts) == 0):
            self.getIsoSphere() #need to populate the isosphere first

#from here : https://www.gamedev.net/topic/116339-request-for-help-texture-mapping-an-icosahedron/
        def GetTextureCoord(normal):
            x = normal[0]
            y = normal[1]
            v = numpy.arcsin( y ) / (numpy.pi/2.)

            if( abs(y) < 1.0 ):
                u = 0.5 + 0.5 * numpy.arctan2(x, y) / numpy.pi
            else:
                u = 0 # Actually undefined.

            return u,v
        
        vertex_arr = numpy.array(numpy.multiply(self.verts, r/2.), 'f')
        fvert = []
        fnorm = []
        ftex = []
        for f in self.faces:
            fvert.append([ vertex_arr[f[0]], vertex_arr[f[1]], vertex_arr[f[2]] ])
            normal = numpy.cross(vertex_arr[f[0]], vertex_arr[f[1]])
            fnorm.append(normal)
            u,v = GetTextureCoord(normal)
            ftex.append([u, v, 0.])

        fnorm = numpy.array(fnorm)                         
        fvert = numpy.array(fvert)
        ftex = numpy.array(ftex)
        vertex_vbo = vbo.VBO(fvert)
        normal_vbo = vbo.VBO(fnorm)
        tex_vbo = vbo.VBO(ftex)

        vertex_vbo.bind()
        glEnableClientState(GL_VERTEX_ARRAY)
        glEnableClientState(GL_NORMAL_ARRAY)
        glEnableClientState(GL_TEXTURE_COORD_ARRAY)
        glVertexPointerf(vertex_vbo )
        glNormalPointerf(normal_vbo)
        glTexCoordPointerf(tex_vbo)
        glDrawArrays(GL_TRIANGLES, 0, fvert.size)

        glDisableClientState(GL_VERTEX_ARRAY)
        glDisableClientState(GL_NORMAL_ARRAY)
        glDisableClientState(GL_TEXTURE_COORD_ARRAY)


        
    def InitGL(self):
        """
        A general OpenGL initialization function.  Sets all of the initial parameters. 
        We call this right after our OpenGL window is created.
        """
        
        # This Will Clear The Background Color To Black
        glClearColor(0.0, 0.0, 0.0, 0.0)   
        # Enables Clearing Of The Depth Buffer
        glClearDepth(1.0)
        # The Type Of Depth Test To Do
        glDepthFunc(GL_LESS)
        # Enables Depth Testing
        glEnable(GL_DEPTH_TEST)
        # Enables Smooth Color Shading
        glShadeModel(GL_SMOOTH)
        
        #for blending
        glEnable(GL_BLEND)
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)
        glBlendEquation(GL_FUNC_ADD)
        
        glMatrixMode(GL_PROJECTION)
        # Reset The Projection Matrix
        glLoadIdentity()                    

        # Calculate The Aspect Ratio Of The Window
        gluPerspective(self.fov, float(self.WindowWidth)/float(self.WindowHeight), 0.1, 100.0)
        
        glMatrixMode(GL_MODELVIEW)

        
        if not glUseProgram:
            print 'Missing Shader Objects!'
            sys.exit(1)

        self.LoadShaders()
    
 
    def ReSizeGLScene(self, Width, Height):
        """
        The function called when our window is resized
        """

        # Prevent A Divide By Zero If The Window Is Too Small
        if Height == 0:                        
            Height = 1

        # Reset The Current Viewport And Perspective Transformation
        glViewport(0, 0, Width, Height)        
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()
        self.WindowWidth = Width
        self.WindowHeight = Height
        gluPerspective(self.fov, float(self.WindowWidth)/float(self.WindowHeight), 0.01, 100.0)
        glMatrixMode(GL_MODELVIEW)


    def keyPressed(self, *args):
        """
        This function is called whenever a key is pressed. Note the use of Python tuples to pass in: (key, x, y)  
        """
        # If escape is pressed, kill everything.
        if (args[0] == '\x1b' or args[0] == 'q'):
            sys.exit()
        if (args[0] == '0'):
            self.xrot = 0.
            self.yrot = 0.
            self.zrot = 0.
            self.rotated = True
            
    def SpecialInput(self, *args):
        """
        handle special input keys (like arrows)
        """

        if args[0] == GLUT_KEY_RIGHT:
            self.cameraX += self.dxy
            #self.yrot += 10.
        if args[0] == GLUT_KEY_LEFT:
            self.cameraX -= self.dxy
            #self.yrot -= 10.
        if args[0] == GLUT_KEY_UP:
            self.cameraY += self.dxy
            #self.xrot += 10.
        if args[0] == GLUT_KEY_DOWN:
            self.cameraY -= self.dxy
            #self.xrot -= 10.

    def UponClick(self, button, button_state, cursor_x, cursor_y):
        """
        Controls what happens when the mouse is clicked
        """

        #now only using for the scroll bar on the mouse to zoom in and out
        if (button == 0):
            self.mouse_x = cursor_x
            self.mouse_y = cursor_y
            self.dx_arr = []
            self.dy_arr = []
        dz = 0
        if (button == 4):
            dz = +0.1
        if (button == 3):
            dz = -0.1

        if (self.cameraZ+dz < self.cameraZmax and self.cameraZ+dz > self.cameraZmin):
            self.cameraZ += dz

    def UponDrag(self, cursor_x, cursor_y):
        """
        Controls what happens when mouse is clicked and dragged
        """
        
        dx = cursor_x - self.mouse_x
        dy = cursor_y - self.mouse_y
        
        self.dx_arr.append(dx)
        self.dy_arr.append(dy)

        #some control on how to move around screen
        ncheck = 10
        if (len(self.dx_arr) > 2*ncheck):
            ddx1 = self.dx_arr[-2*ncheck] - self.dx_arr[-ncheck]
            ddx2 = self.dx_arr[-ncheck] - dx
            if (ddx1 * ddx2 < 0):
                self.mouse_x = cursor_x
                self.dx_arr = []
        if (len(self.dy_arr) > 2*ncheck):
            ddy1 = self.dy_arr[-2*ncheck] - self.dy_arr[-ncheck]
            ddy2 = self.dy_arr[-ncheck] - dy
            if (ddy1 * ddy2 < 0):
                self.mouse_y = cursor_y
                self.dy_arr = []
            
        fac = 5.
        xrot = self.xrot
        yrot = self.yrot
        dxrot = -float(dy)/float(self.WindowHeight)*fac
        dyrot = -float(dx)/float(self.WindowWidth)*fac 
        self.xrot += dxrot
        self.yrot += dyrot
        #self.xrot = self.xrot % 360.
        #self.yrot = self.yrot % 360.
        self.rotated = True
        
    def sortZ(self):
        """
        If I want to have transparency, I need to sort the objects and draw them from back to front (given the current rotation)
        This is costly because we're sorting using the CPU (here) and then also the GPU (for rendering)
        (Though, we could just use these rotated and sorted coordinates for display, without using the GPU for rotation.)
        """
        
        MR = euler2mat(x = -self.xrot*numpy.pi/180., y = -self.yrot*numpy.pi/180., z = self.zrot*numpy.pi/180.)
        xyz_rot = [numpy.dot(MR, [x - self.centerX, y - self.centerY, z - self.centerZ]) for (x,y,z) in zip(self.objX, self.objY, self.objZ)]
        x_rot = numpy.array([i[0] for i in xyz_rot])
        y_rot = numpy.array([i[1] for i in xyz_rot])
        z_rot = numpy.array([i[2] for i in xyz_rot])
        srtz = numpy.argsort(z_rot)[::-1]

        self.objX = self.objX[srtz]
        self.objY = self.objY[srtz]
        self.objZ = self.objZ[srtz]
        self.radius = self.radius[srtz]
        self.color = self.color[srtz]

        self.rotated = False


    def drawScene(self):
        """
        This is the main drawing function, most of this will be defined outside of here
        This version will draw a isosphere, possibly textured, possibly with lighting
        """
    
        # Clear The Screen And The Depth Buffer
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        glLoadIdentity()                    # Reset The View 
        
        # define the program (i.e., shaders)
        glUseProgram(self.program)

        # move to the camera location
        glTranslatef(self.cameraX, self.cameraY, self.cameraZ)

        #draw the wireframe only
        if (self.drawLine):
            glPolygonMode(GL_FRONT_AND_BACK, GL_LINE)
        
        #set the lighting
        if (self.doLighting):
            self.setLighting()

        #load the texture
        if (self.imfile != None):
            glActiveTexture(GL_TEXTURE0)
            self.LoadTexture()

        #define the input to the shaders
        vscaleUniform = glGetUniformLocation(self.program, "uVertexScale")
        glUniform1f(vscaleUniform, 1.)
        if (self.time >= 0):
            tUniform = glGetUniformLocation(self.program, "uTime")
            glUniform1f(tUniform, self.time)
        colorUniform = glGetUniformLocation(self.program, "color")

        
        #take care of any rotation
        glTranslatef(self.centerX, self.centerY, self.centerZ)
        glRotatef( -self.xrot, 1.0, 0.0, 0.0)
        glRotatef( -self.yrot, 0.0, 1.0, 0.0)
        glRotatef( -self.zrot, 0.0, 0.0, 1.0)

        #for transparency (used here with billboards) I need to sort by the z location, given the rotation
        if (self.doSort and self.rotated and len(self.objX) > 1):
            self.sortZ()
            
        #now draw the object(s)
        for (x,y,z,rad,co) in zip(self.objX, self.objY, self.objZ, self.radius, self.color):
            r,g,b,a = co
            glUniform4f(colorUniform, r,g,b,a)
            glUniform1f(vscaleUniform, rad)
            glTranslatef( (self.centerX - x), (self.centerY - y), (self.centerZ - z))
            if (self.doSphere):
                self.drawIsoSphere()
            if (self.doBillboard):
                self.drawBillboard()
            glTranslatef(-(self.centerX - x), -(self.centerY - y), -(self.centerZ - z))


        #  since this is double buffered, swap the buffers to display what just got drawn. 
        glutSwapBuffers()

        #advance the time
        if (self.time >= 0):
            self.time += self.dt

    
    def mainLoop(self):
        """
        Run the scene
        """

        glutInit(sys.argv)

        # Select type of Display mode:   
        glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE | GLUT_DEPTH)
    
        # window size
        glutInitWindowSize(self.WindowWidth, self.WindowHeight)

        # the window starts at the upper left corner of the screen 
        glutInitWindowPosition(0, 0)
    
        # Okay, like the C version we retain the window id to use when closing, but for those of you new
        # to Python (like myself), remember this assignment would make the variable local and not global
        # if it weren't for the global declaration at the start of main.
        self.window = glutCreateWindow("AMG test")

        # Register the drawing function with glut, BUT in Python land, at least using PyOpenGL, we need to
        # set the function pointer and invoke a function to actually register the callback, otherwise it
        # would be very much like the C version of the code.    
        glutDisplayFunc(self.drawGLScene)
    
        # Uncomment this line to get full screen.
        #glutFullScreen()

        # When we are doing nothing, redraw the scene.
        glutIdleFunc(self.drawGLScene)
    
        # Register the function called when our window is resized.
        glutReshapeFunc(self.ReSizeGLScene)
    
        # Register the function called when the keyboard is pressed.  
        glutKeyboardFunc(self.keyPressed)
        glutSpecialFunc(self.SpecialInput); #for arrow keys (can I do this with KeyboardFunc?)

        # GLUT When mouse buttons are clicked in window
        glutMouseFunc(self.UponClick)

        # GLUT When the mouse moves
        glutMotionFunc(self.UponDrag)

        # Initialize our window. 
        self.InitGL()

        # Start Event Processing Engine    
        glutMainLoop()

if __name__ == "__main__":

    #numpy.random.seed(seed = 12345)
    
    print "Hit ESC key to quit."

    code = runPyOpenGL()

    
    #spheres (looks nice for a few spheres, but gets prohibitively slow for very many spheres)
    #code.vertexfile = 'shaders/vertex.glsl' 
    code.vertexfile = 'shaders/vertexLighting.glsl'
    code.fragmentfile = 'shaders/fragment.glsl'
    n = 10
    fac = 0.1
    rfac = 0.1
    zpos = -0.5
    code.objX = numpy.append(numpy.random.normal(size = n, loc = 0., scale = fac), 0.)
    code.objY = numpy.append(numpy.random.normal(size = n, loc = 0., scale = fac), 0.)
    code.objZ = numpy.append(numpy.random.normal(size = n, loc = zpos, scale = fac), zpos)
    code.radius = numpy.append(numpy.random.random(size = n)*rfac, rfac)
    code.color = numpy.append([[r, g, b, 1.] for (r,g,b) in zip(numpy.random.random(size = n), numpy.random.random(size = n), numpy.random.random(size = n))] , [[1.,1.,1.,1.]], axis = 0)
    code.centerX = 0.
    code.centerY = 0.
    code.centerZ = zpos
    code.doLighting = True
    code.drawLine = False

    
    #billboards (use the same positions, radii and colors as above)
    code.vertexfile = 'shaders/vertex.glsl' 
    code.fragmentfile = 'shaders/fragment.glsl'
    #code.doSort = True
    #code.fragmentfile = 'shaders/fragmentCircle.glsl'
    #code.fragmentfile = 'shaders/fragmentLimbDarkening.glsl'
    code.doSphere = False
    code.doBillboard = True

    """
    #Jupiter-like planet
    code.imfile = 'shaders/gas_giant_lookup1.png'
    code.vertexfile = 'shaders/vertexLighting.glsl' 
    code.fragmentfile = 'shaders/fragmentJupiter.glsl'
    code.doLighting = True
    code.time = 0.

    """
    code.mainLoop()
