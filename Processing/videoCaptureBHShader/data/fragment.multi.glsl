#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

//video image
uniform sampler2D texture;
//video image size
uniform float xSize;
uniform float ySize;

//BH parameters (stored in a texture)
uniform sampler2D BHtex;
uniform int NBH;
uniform float maxBHmass;

//from vertex shader
varying vec4 vertTexCoord;

float iG = 1.; //graviational constant
float ic = 1.; //speed of light

void main() {
	vec4 color = texture2D(texture, vertTexCoord.st);

	//normalize the coordinates so that I can get the distance from the center as a circle
	float aspect = ySize/xSize;
	float diff = 1-aspect;
	vec2 normCoords = vec2((vertTexCoord.s - diff/2.)/aspect, vertTexCoord.t);

	//grab the BH parameters from the texture
	bool done = false;
	float Nused = 0.;
	vec2 P2 = vec2(0);
	for (int i=0; i<NBH; i++){
		float pos = (float(i) + 0.5)/float(NBH);
		vec4 BHparams = texture2D(BHtex, vec2(pos, 0.5));
		float xBH = BHparams.r;
		float yBH = BHparams.g;
		float MBH = BHparams.b*maxBHmass;

		if (MBH > 1e-4){
			Nused += 1.;
			vec2 PBH = vec2(xBH, yBH);
			vec2 P1 = normCoords - PBH;

			float dist = length(P1);
			float rs =  2.*iG*MBH/(ic*ic); //Schwarzschild radius
			if (dist < rs){
				color = vec4(0);
				done = true;
				break;
			} else {
		
				float theta = atan(P1.y, P1.x);
				float thetaNew = theta + 4.*iG*MBH/(dist*ic*ic);
				float xNew = dist*cos(thetaNew);
				float yNew = dist*sin(thetaNew);
				P2 += vec2(xNew, yNew) + PBH;

				color = texture2D(texture, P2);
			
			} 
		}
		if (! done){
			color = texture2D(texture, P2/Nused);
		}

	}
	gl_FragColor = color;
}