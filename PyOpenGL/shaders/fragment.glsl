uniform sampler2D Tex;

varying vec3 normal;

uniform vec4 color;

void main() {

    gl_FragColor =  color*gl_Color;


}
