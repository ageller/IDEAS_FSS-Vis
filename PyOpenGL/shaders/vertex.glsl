varying vec3 normal;

uniform float uVertexScale;


void main() {

        gl_TexCoord[0] = gl_MultiTexCoord0;

	normal = normalize(gl_Normal);

	vec4 vertex = gl_Vertex;    

	//resize billboard (if needed)
        vertex.xyz *= uVertexScale;

	gl_Position = gl_ModelViewProjectionMatrix * vertex;
        gl_FrontColor = vec4(1.,1.,1.,1.);


}
