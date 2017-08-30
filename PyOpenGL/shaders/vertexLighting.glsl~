varying vec3 normal;

uniform float uVertexScale;


void main() {

        gl_TexCoord[0] = gl_MultiTexCoord0;

	normal = normalize(gl_Normal);

	vec4 vertex = gl_Vertex;


//lighting from here:
//http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/directional-lights-i/
        vec3 lightDir, viewVector, halfVector; 
        vec4 diffuse, ambient, globalAmbient, specular = vec4(0.0);
        float NdotL,NdotHV;
        
        /* now normalize the light's direction. Note that according to the
        OpenGL specification, the light is stored in eye space. Also since 
        we're talking about a directional light, the position field is actually
        direction */
        lightDir = normalize(vec3(gl_LightSource[0].position));
        
        /* compute the cos of the angle between the normal and lights direction.
        The light is directional so the direction is constant for every vertex.
        Since these two are normalized the cosine is the dot product. We also
        need to clamp the result to the [0,1] range. */
        
        NdotL = max(dot(normal, lightDir), 0.0);
        
        /* Compute the diffuse, ambient and globalAmbient terms */
        diffuse = gl_FrontMaterial.diffuse * gl_LightSource[0].diffuse;
        ambient = gl_FrontMaterial.ambient * gl_LightSource[0].ambient;
        globalAmbient = gl_LightModel.ambient * gl_FrontMaterial.ambient;
        
        /* compute the specular term if NdotL is  larger than zero */
        if (NdotL > 0.0) {
                NdotHV = max(dot(normal, normalize(gl_LightSource[0].halfVector.xyz)),0.0);
                specular = gl_FrontMaterial.specular * gl_LightSource[0].specular * pow(NdotHV,gl_FrontMaterial.shininess);      
        }

	vec4 lightCo =  globalAmbient + NdotL * diffuse + ambient + specular;
	    
        gl_FrontColor = lightCo;
        

	//resize billboard (if needed)
        vertex.xyz *= uVertexScale;

	gl_Position = gl_ModelViewProjectionMatrix * vertex;


}
