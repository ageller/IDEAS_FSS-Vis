#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform sampler2D vtex;
uniform float xSize;
uniform float ySize;

uniform float MBH;
uniform float xBH;
uniform float yBH;

varying vec4 vertTexCoord;

float iG = 1.; //graviational constant
float ic = 1.; //speed of light

void main() {
	//normalize the coordinates so that I can get the distance from the center as a circle
	gl_FragColor = texture2D(vtex, vertTexCoord.st);

	if (MBH > 1e-4){
		// float aspect = ySize/xSize;
		// float diff = 1-aspect;
		// vec2 normCoords = vec2((vertTexCoord.s - diff/2.)/aspect, vertTexCoord.t);
		vec2 PBH = vec2(xBH, yBH);
		vec2 P1 = vertTexCoord.st - PBH;

		gl_FragColor = vec4(0);

		float dist = length(P1);
		float rs =  2.*iG*MBH/(ic*ic); //Schwarzschild radius

		if (dist > rs){
			float theta = atan(P1.y, P1.x);
			float thetaNew = theta + 2.*rs/dist;
			float xNew = dist*cos(thetaNew);
			float yNew = dist*sin(thetaNew);
			vec2 P2 = vec2(xNew, yNew) + PBH;

			gl_FragColor = texture2D(vtex, P2);
		} 
	}
}

