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
    } else {
       float u = 0.56;
       float Rstar2 = 1.0;
       float r2 = dist/uVertexScale*dist/uVertexScale;
       float brightness = (1. - u*(1. - sqrt((Rstar2 - r2)/Rstar2)));
       gl_FragColor = vec4(brightness * gl_FragColor.rgb, 1.);
    }



}