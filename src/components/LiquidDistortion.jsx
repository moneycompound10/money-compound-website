import React, { useRef, useEffect } from 'react';

/**
 * LiquidDistortion
 * A lightweight WebGL component that applies a liquid/wavy distortion 
 * to an image, similar to Unicorn Studio effects.
 */
const LiquidDistortion = ({ imageSrc, active = false }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // --- Shaders ---
    const vertexShaderSource = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uActive;
      
      void main() {
        vec2 uv = vUv;
        
        // Liquid distortion logic
        float distortion = sin(uv.y * 10.0 + uTime * 2.0) * 0.005;
        distortion += cos(uv.x * 8.0 + uTime * 1.5) * 0.005;
        
        // Only apply heavy distortion if active
        float activeMultiplier = mix(0.2, 1.0, uActive);
        uv.x += distortion * activeMultiplier;
        uv.y += distortion * activeMultiplier;
        
        vec4 color = texture2D(uTexture, uv);
        gl_FragColor = color;
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- Geometry ---
    const vertices = new Float32Array([
      -1, -1, 0, 1,
       1, -1, 1, 1,
      -1,  1, 0, 0,
       1,  1, 1, 0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);

    const uvLoc = gl.getAttribLocation(program, 'uv');
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    // --- Texture ---
    const texture = gl.createTexture();
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    const timeLoc = gl.getUniformLocation(program, 'uTime');
    const activeLoc = gl.getUniformLocation(program, 'uActive');

    const render = () => {
      const time = (Date.now() - startTimeRef.current) / 1000;
      gl.uniform1f(timeLoc, time);
      gl.uniform1f(activeLoc, active ? 1.0 : 0.0);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(requestRef.current);
      gl.deleteProgram(program);
      gl.deleteTexture(texture);
    };
  }, [imageSrc, active]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full object-cover rounded-3xl shadow-2xl"
      width={800} 
      height={600} 
    />
  );
};

export default LiquidDistortion;
