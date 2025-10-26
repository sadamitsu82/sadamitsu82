<template>
  <div ref="containerRef" class="webgl-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let animationId: number

const initScene = () => {
  if (!containerRef.value) return

  // シーン作成
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x0a0a1a, 1, 1000)

  // カメラ設定
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 50

  // レンダラー設定
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x0a0a1a, 1)
  containerRef.value.appendChild(renderer.domElement)

  // パーティクル作成
  createParticles()

  // 幾何学形状の追加
  createGeometry()

  // ライト追加
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0x667eea, 2, 100)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  const pointLight2 = new THREE.PointLight(0x764ba2, 2, 100)
  pointLight2.position.set(-10, -10, -10)
  scene.add(pointLight2)
}

const createParticles = () => {
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 5000

  const posArray = new Float32Array(particlesCount * 3)
  const colorsArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100

    // グラデーションカラー
    const colorValue = Math.random()
    colorsArray[i * 3] = 0.4 + colorValue * 0.4     // R
    colorsArray[i * 3 + 1] = 0.5 + colorValue * 0.3 // G
    colorsArray[i * 3 + 2] = 0.9 + colorValue * 0.1 // B
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  })

  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
}

const createGeometry = () => {
  // トーラス
  const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x667eea,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  })
  const torus = new THREE.Mesh(torusGeometry, torusMaterial)
  torus.position.set(0, 0, 0)
  scene.add(torus)

  // 球体
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x764ba2,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
  })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(20, 0, -10)
  scene.add(sphere)

  // アニメーション用にシーンに保存
  scene.userData.torus = torus
  scene.userData.sphere = sphere
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // パーティクルの回転
  if (particles) {
    particles.rotation.x += 0.0003
    particles.rotation.y += 0.0005
  }

  // トーラスの回転
  if (scene.userData.torus) {
    scene.userData.torus.rotation.x += 0.01
    scene.userData.torus.rotation.y += 0.005
  }

  // 球体の回転と移動
  if (scene.userData.sphere) {
    scene.userData.sphere.rotation.x += 0.005
    scene.userData.sphere.rotation.y += 0.01
    scene.userData.sphere.position.x = Math.sin(Date.now() * 0.001) * 20
    scene.userData.sphere.position.y = Math.cos(Date.now() * 0.0008) * 10
  }

  // カメラの微妙な動き
  camera.position.x = Math.sin(Date.now() * 0.0001) * 5
  camera.position.y = Math.cos(Date.now() * 0.00015) * 5
  camera.lookAt(scene.position)

  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!containerRef.value) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

onMounted(() => {
  initScene()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (containerRef.value && renderer) {
    containerRef.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
.webgl-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}

.webgl-container canvas {
  display: block;
}
</style>
