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
	gl_FragColor = texture2D(vtex, vertTexCoord.st);



	//grab the BH parameters from the texture
	bool done = false;
	vec2 P2 = vec2(0);
	vec2 alpha = vec2(0.);
	vec2 theta = vec2(0.);
	for (int i=0; i<NBH; i++){

		float pos = (float(i) + 0.5)/float(NBH);
		vec4 BHparams = texture2D(BHtex, vec2(pos, 0.5));
		float xBH = BHparams.r;
		float yBH = BHparams.g;
		float MBH = BHparams.b*maxBHmass;

		if (MBH > 1e-4){

			//building from here: http://www.ita.uni-heidelberg.de/~massimo/sub/Lectures/gl_all.pdf
			vec2 PBH = vec2(xBH, yBH);
			vec2 P1 = vertTexCoord.st - PBH;

			float dist = length(P1);
			float rs =  2.*iG*MBH/(ic*ic); //Schwarzschild radius
			if (dist < rs){
				gl_FragColor = vec4(0);
				done = true;
				break;
			} else {
				alpha += MBH/(dist*dist)*P1;
			} 
		}


	}
	if (! done){
		alpha *= 4.*iG/(ic*ic);
		//but what do I use for theta?? and PBH?? and dist?? (and should I take the length of alpha here??)
		float theta = atan(P1.y, P1.x);
		float thetaNew = theta + length(alpha);
		float xNew = dist*cos(thetaNew);
		float yNew = dist*sin(thetaNew);
		vec2 P2 = vec2(xNew, yNew) + PBH;
		gl_FragColor = texture2D(texture, P2);
	}
}