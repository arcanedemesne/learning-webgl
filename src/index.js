import initRender from './utility/render';
import initShaderProgram from './utility/shader';
import initBuffers from './utility/buffer';
import { loadTexture, updateTexture } from './utility/texture';
import { setupVideo, copyVideo } from './utility/video';
import { vsSource, fsSource } from './source';
import cubetexture from './resources/videoplayback.mp4';

const init = () => {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Vertex shader program
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  const buffers = initBuffers(gl);

  // Load texture
  const texture = loadTexture(gl);

  const video = setupVideo(cubetexture);

  var then = 0;

  // Draw the scene repeatedly
  const render = (now) => {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    if (copyVideo) {
      updateTexture(gl, texture, video);
    }

    initRender(gl, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

init();
