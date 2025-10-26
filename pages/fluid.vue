<template>
  <div class="fluid-page">
    <!-- 2D流体シミュレーション -->
    <ClientOnly>
      <FluidSimulation />
    </ClientOnly>

    <!-- ページタイトルオーバーレイ -->
    <div class="page-header">
      <h1>2D流体シミュレーション</h1>
      <p>WebGLによるリアルタイム流体計算</p>
      <NuxtLink to="/" class="back-link">← ホームに戻る</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '2D流体シミュレーション',
})
</script>

<style scoped>
.fluid-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.page-header {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-header h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  margin: 0 0 1rem 0;
  opacity: 0.9;
  font-size: 1rem;
}

.back-link {
  display: inline-block;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 500;
  transition: all 0.3s;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

@media (max-width: 768px) {
  .page-header {
    top: 10px;
    left: 10px;
    right: 10px;
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .page-header p {
    font-size: 0.9rem;
  }
}
</style>
