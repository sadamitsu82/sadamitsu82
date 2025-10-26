<template>
  <div class="fluid-container">
    <canvas ref="canvasRef" class="fluid-canvas"></canvas>

    <!-- パラメータUI -->
    <div class="controls-panel">
      <h3>流体シミュレーション</h3>

      <div class="control-group">
        <label>
          粘性 (Viscosity)
          <span class="value">{{ viscosity.toFixed(4) }}</span>
        </label>
        <input
          type="range"
          v-model.number="viscosity"
          min="0.0001"
          max="0.01"
          step="0.0001"
        />
      </div>

      <div class="control-group">
        <label>
          拡散 (Diffusion)
          <span class="value">{{ diffusion.toFixed(4) }}</span>
        </label>
        <input
          type="range"
          v-model.number="diffusion"
          min="0"
          max="0.001"
          step="0.00001"
        />
      </div>

      <div class="control-group">
        <label>
          圧力 (Pressure)
          <span class="value">{{ pressure.toFixed(1) }}</span>
        </label>
        <input
          type="range"
          v-model.number="pressure"
          min="0.1"
          max="2.0"
          step="0.1"
        />
      </div>

      <div class="control-group">
        <label>
          速度減衰 (Velocity Decay)
          <span class="value">{{ velocityDissipation.toFixed(2) }}</span>
        </label>
        <input
          type="range"
          v-model.number="velocityDissipation"
          min="0.90"
          max="0.9999"
          step="0.0001"
        />
      </div>

      <div class="control-group">
        <label>
          密度減衰 (Density Decay)
          <span class="value">{{ densityDissipation.toFixed(2) }}</span>
        </label>
        <input
          type="range"
          v-model.number="densityDissipation"
          min="0.90"
          max="0.9999"
          step="0.0001"
        />
      </div>

      <div class="control-group">
        <label>
          カラー強度 (Color Intensity)
          <span class="value">{{ colorIntensity.toFixed(1) }}</span>
        </label>
        <input
          type="range"
          v-model.number="colorIntensity"
          min="0.1"
          max="5.0"
          step="0.1"
        />
      </div>

      <div class="control-group">
        <label>
          マウス力 (Mouse Force)
          <span class="value">{{ mouseForce.toFixed(0) }}</span>
        </label>
        <input
          type="range"
          v-model.number="mouseForce"
          min="10"
          max="200"
          step="10"
        />
      </div>

      <button @click="reset" class="reset-button">リセット</button>

      <div class="info">
        <p>💡 マウスをドラッグして流体を操作</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

// パラメータ
const viscosity = ref(0.001)
const diffusion = ref(0.0001)
const pressure = ref(1.0)
const velocityDissipation = ref(0.98)
const densityDissipation = ref(0.99)
const colorIntensity = ref(1.5)
const mouseForce = ref(50)

let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let animationId: number

// テクスチャとフレームバッファ
let velocityTextures: { read: WebGLTexture, write: WebGLTexture } | null = null
let densityTextures: { read: WebGLTexture, write: WebGLTexture } | null = null
let velocityFramebuffers: { read: WebGLFramebuffer, write: WebGLFramebuffer } | null = null
let densityFramebuffers: { read: WebGLFramebuffer, write: WebGLFramebuffer } | null = null

// マウス状態
const mouse = {
  x: 0,
  y: 0,
  prevX: 0,
  prevY: 0,
  down: false
}

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;

  void main() {
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;

  varying vec2 v_texCoord;
  uniform sampler2D u_velocity;
  uniform sampler2D u_density;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_mouseDown;
  uniform float u_viscosity;
  uniform float u_diffusion;
  uniform float u_pressure;
  uniform float u_velocityDissipation;
  uniform float u_densityDissipation;
  uniform float u_colorIntensity;
  uniform float u_mouseForce;
  uniform float u_time;
  uniform int u_mode; // 0: velocity, 1: density, 2: display

  void main() {
    vec2 uv = v_texCoord;
    vec2 texel = 1.0 / u_resolution;

    if (u_mode == 0) {
      // Velocity update
      vec2 vel = texture2D(u_velocity, uv).xy;

      // Add mouse force
      if (u_mouseDown > 0.5) {
        vec2 mousePos = u_mouse / u_resolution;
        vec2 prevMousePos = u_prevMouse / u_resolution;
        vec2 mouseVel = (mousePos - prevMousePos) * u_mouseForce;
        float dist = length(uv - mousePos);
        float influence = exp(-dist * 20.0);
        vel += mouseVel * influence;
      }

      // Advection
      vec2 coord = uv - vel * texel * 0.5;
      vel = texture2D(u_velocity, coord).xy;

      // Diffusion (simple)
      vec2 sum = vec2(0.0);
      sum += texture2D(u_velocity, uv + vec2(texel.x, 0.0)).xy;
      sum += texture2D(u_velocity, uv - vec2(texel.x, 0.0)).xy;
      sum += texture2D(u_velocity, uv + vec2(0.0, texel.y)).xy;
      sum += texture2D(u_velocity, uv - vec2(0.0, texel.y)).xy;
      vel = mix(vel, sum * 0.25, u_viscosity);

      // Velocity dissipation
      vel *= u_velocityDissipation;

      gl_FragColor = vec4(vel, 0.0, 1.0);
    }
    else if (u_mode == 1) {
      // Density update
      vec4 density = texture2D(u_density, uv);

      // Add color at mouse position
      if (u_mouseDown > 0.5) {
        vec2 mousePos = u_mouse / u_resolution;
        float dist = length(uv - mousePos);
        float influence = exp(-dist * 30.0);

        // Rainbow colors based on time and position
        float hue = fract(u_time * 0.1 + mousePos.x * 2.0 + mousePos.y);
        vec3 color = vec3(
          sin(hue * 6.28318) * 0.5 + 0.5,
          sin((hue + 0.333) * 6.28318) * 0.5 + 0.5,
          sin((hue + 0.666) * 6.28318) * 0.5 + 0.5
        );
        density.rgb += color * influence * u_colorIntensity * 0.1;
      }

      // Advection
      vec2 vel = texture2D(u_velocity, uv).xy;
      vec2 coord = uv - vel * texel;
      density = texture2D(u_density, coord);

      // Diffusion
      vec4 sum = vec4(0.0);
      sum += texture2D(u_density, uv + vec2(texel.x, 0.0));
      sum += texture2D(u_density, uv - vec2(texel.x, 0.0));
      sum += texture2D(u_density, uv + vec2(0.0, texel.y));
      sum += texture2D(u_density, uv - vec2(0.0, texel.y));
      density = mix(density, sum * 0.25, u_diffusion);

      // Density dissipation
      density *= u_densityDissipation;

      gl_FragColor = density;
    }
    else {
      // Display mode
      vec4 density = texture2D(u_density, uv);
      vec2 vel = texture2D(u_velocity, uv).xy;

      // Enhance colors
      density.rgb = pow(density.rgb, vec3(0.8));
      density.rgb *= u_colorIntensity;

      // Add velocity visualization
      float velMag = length(vel) * 0.5;
      density.rgb += vec3(velMag * 0.1);

      gl_FragColor = vec4(density.rgb, 1.0);
    }
  }
`

const createShader = (type: number, source: string): WebGLShader | null => {
  if (!gl) return null
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

const createProgram = (): WebGLProgram | null => {
  if (!gl) return null

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

  if (!vertexShader || !fragmentShader) return null

  const prog = gl.createProgram()
  if (!prog) return null

  gl.attachShader(prog, vertexShader)
  gl.attachShader(prog, fragmentShader)
  gl.linkProgram(prog)

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog))
    return null
  }

  return prog
}

const createTexture = (): WebGLTexture | null => {
  if (!gl || !canvasRef.value) return null

  const texture = gl.createTexture()
  if (!texture) return null

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvasRef.value.width, canvasRef.value.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  return texture
}

const createFramebuffer = (texture: WebGLTexture): WebGLFramebuffer | null => {
  if (!gl) return null

  const framebuffer = gl.createFramebuffer()
  if (!framebuffer) return null

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

  return framebuffer
}

const initGL = () => {
  if (!canvasRef.value) return

  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight

  gl = canvasRef.value.getContext('webgl', {
    alpha: false,
    antialias: false,
    preserveDrawingBuffer: false
  })

  if (!gl) {
    console.error('WebGL not supported')
    return
  }

  program = createProgram()
  if (!program) return

  // Create double-buffered textures and framebuffers
  const velTex1 = createTexture()
  const velTex2 = createTexture()
  const denTex1 = createTexture()
  const denTex2 = createTexture()

  if (!velTex1 || !velTex2 || !denTex1 || !denTex2) return

  velocityTextures = { read: velTex1, write: velTex2 }
  densityTextures = { read: denTex1, write: denTex2 }

  const velFb1 = createFramebuffer(velTex1)
  const velFb2 = createFramebuffer(velTex2)
  const denFb1 = createFramebuffer(denTex1)
  const denFb2 = createFramebuffer(denTex2)

  if (!velFb1 || !velFb2 || !denFb1 || !denFb2) return

  velocityFramebuffers = { read: velFb1, write: velFb2 }
  densityFramebuffers = { read: denFb1, write: denFb2 }

  // Create quad
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1
  ]), gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
}

const render = () => {
  if (!gl || !program || !velocityTextures || !densityTextures || !velocityFramebuffers || !densityFramebuffers || !canvasRef.value) return

  gl.useProgram(program)

  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
  const prevMouseLocation = gl.getUniformLocation(program, 'u_prevMouse')
  const mouseDownLocation = gl.getUniformLocation(program, 'u_mouseDown')
  const modeLocation = gl.getUniformLocation(program, 'u_mode')
  const timeLocation = gl.getUniformLocation(program, 'u_time')

  gl.uniform2f(resolutionLocation, canvasRef.value.width, canvasRef.value.height)
  gl.uniform2f(mouseLocation, mouse.x, mouse.y)
  gl.uniform2f(prevMouseLocation, mouse.prevX, mouse.prevY)
  gl.uniform1f(mouseDownLocation, mouse.down ? 1.0 : 0.0)
  gl.uniform1f(timeLocation, Date.now() * 0.001)

  // Set parameters
  gl.uniform1f(gl.getUniformLocation(program, 'u_viscosity'), viscosity.value)
  gl.uniform1f(gl.getUniformLocation(program, 'u_diffusion'), diffusion.value)
  gl.uniform1f(gl.getUniformLocation(program, 'u_pressure'), pressure.value)
  gl.uniform1f(gl.getUniformLocation(program, 'u_velocityDissipation'), velocityDissipation.value)
  gl.uniform1f(gl.getUniformLocation(program, 'u_densityDissipation'), densityDissipation.value)
  gl.uniform1f(gl.getUniformLocation(program, 'u_colorIntensity'), colorIntensity.value)
  gl.uniform1f(gl.getUniformLocation(program, 'u_mouseForce'), mouseForce.value)

  // Update velocity
  gl.uniform1i(modeLocation, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, velocityFramebuffers.write)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, velocityTextures.read)
  gl.uniform1i(gl.getUniformLocation(program, 'u_velocity'), 0)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, densityTextures.read)
  gl.uniform1i(gl.getUniformLocation(program, 'u_density'), 1)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  // Swap velocity buffers
  const tempVel = velocityTextures.read
  velocityTextures.read = velocityTextures.write
  velocityTextures.write = tempVel
  const tempVelFb = velocityFramebuffers.read
  velocityFramebuffers.read = velocityFramebuffers.write
  velocityFramebuffers.write = tempVelFb

  // Update density
  gl.uniform1i(modeLocation, 1)
  gl.bindFramebuffer(gl.FRAMEBUFFER, densityFramebuffers.write)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, velocityTextures.read)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, densityTextures.read)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  // Swap density buffers
  const tempDen = densityTextures.read
  densityTextures.read = densityTextures.write
  densityTextures.write = tempDen
  const tempDenFb = densityFramebuffers.read
  densityFramebuffers.read = densityFramebuffers.write
  densityFramebuffers.write = tempDenFb

  // Display
  gl.uniform1i(modeLocation, 2)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, velocityTextures.read)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, densityTextures.read)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  animationId = requestAnimationFrame(render)
}

const reset = () => {
  if (!gl || !densityTextures || !velocityTextures || !canvasRef.value) return

  const clearData = new Uint8Array(canvasRef.value.width * canvasRef.value.height * 4)

  gl.bindTexture(gl.TEXTURE_2D, densityTextures.read)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvasRef.value.width, canvasRef.value.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, clearData)
  gl.bindTexture(gl.TEXTURE_2D, densityTextures.write)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvasRef.value.width, canvasRef.value.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, clearData)
  gl.bindTexture(gl.TEXTURE_2D, velocityTextures.read)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvasRef.value.width, canvasRef.value.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, clearData)
  gl.bindTexture(gl.TEXTURE_2D, velocityTextures.write)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvasRef.value.width, canvasRef.value.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, clearData)
}

const handleMouseMove = (e: MouseEvent) => {
  mouse.prevX = mouse.x
  mouse.prevY = mouse.y
  mouse.x = e.clientX
  mouse.y = window.innerHeight - e.clientY
}

const handleMouseDown = () => {
  mouse.down = true
}

const handleMouseUp = () => {
  mouse.down = false
}

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault()
  const touch = e.touches[0]
  mouse.prevX = mouse.x
  mouse.prevY = mouse.y
  mouse.x = touch.clientX
  mouse.y = window.innerHeight - touch.clientY
}

const handleTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0]
  mouse.x = touch.clientX
  mouse.y = window.innerHeight - touch.clientY
  mouse.down = true
}

const handleTouchEnd = () => {
  mouse.down = false
}

const handleResize = () => {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  initGL()
}

onMounted(() => {
  initGL()
  render()

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.fluid-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
}

.fluid-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
}

.controls-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  min-width: 300px;
  max-width: 350px;
  z-index: 1000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.controls-panel h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.value {
  color: #667eea;
  font-weight: 700;
  font-family: monospace;
}

.control-group input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.5);
  transition: transform 0.2s;
}

.control-group input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.control-group input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.5);
}

.reset-button {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.reset-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.reset-button:active {
  transform: translateY(0);
}

.info {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.info p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

@media (max-width: 768px) {
  .controls-panel {
    top: auto;
    bottom: 20px;
    right: 20px;
    left: 20px;
    max-width: none;
    max-height: 50vh;
    overflow-y: auto;
  }
}
</style>
