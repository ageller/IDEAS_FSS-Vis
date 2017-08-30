uniform sampler2D Tex;

varying vec3 normal;

uniform vec4 color;
uniform float uVertexScale;

void main() {

    gl_FragColor =  color;
    
    // Get the distance vector from the center
    vec2 fromCenter = abs(gl_TexCoord[0].xy);
    float dist = length(fromCenter)*uVertexScale;

    if (dist > uVertexScale) {
       discard;
    }
    if (dist < 0.9*uVertexScale) {
       gl_FragColor.a = 0.2;
    }



}