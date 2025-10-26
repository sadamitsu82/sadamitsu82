<template>
  <div class="page-wrapper">
    <!-- 2D流体シミュレーション背景 -->
    <ClientOnly>
      <FluidSimulation />
    </ClientOnly>

    <!-- コンテンツオーバーレイ -->
    <div class="content-overlay">
      <header class="header">
        <h1 class="title">Nuxt3 Website Template</h1>
        <p class="subtitle">モダンなWebサイト開発のためのテンプレート</p>
        <p class="description">WebGL流体シミュレーション × Vue3 で構築された美しいインタラクティブ体験</p>
      </header>

      <main class="main">
        <section class="hero">
          <h2>ようこそ</h2>
          <p>このテンプレートはNuxt3とWebGL流体シミュレーションを使用して構築されています。</p>
          <p class="hero-hint">✨ マウスをドラッグして流体を操作できます</p>
        </section>

        <section class="features">
          <h2>特徴</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <h3>⚡ 高速</h3>
              <p>Nuxt3の最適化されたパフォーマンス</p>
            </div>
            <div class="feature-card">
              <h3>🎨 流体シミュレーション</h3>
              <p>WebGLによるリアルタイム2D流体計算</p>
            </div>
            <div class="feature-card">
              <h3>🎛️ パラメータ調整</h3>
              <p>粘性・拡散・圧力などをリアルタイム操作</p>
            </div>
            <div class="feature-card">
              <h3>📱 レスポンシブ</h3>
              <p>タッチデバイスにも完全対応</p>
            </div>
          </div>
        </section>

        <section class="cta">
          <h2>今すぐ始めよう</h2>
          <NuxtLink to="/about" class="button">詳細を見る</NuxtLink>
        </section>
      </main>

      <footer class="footer">
        <p>&copy; 2024 Nuxt3 Website Template with Fluid Simulation</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'ホーム',
})
</script>

<style scoped>
.page-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.content-overlay {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 8rem 1rem 4rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  opacity: 0.95;
  margin-bottom: 0.5rem;
  animation: fadeInUp 1.2s ease-out;
}

.description {
  font-size: 1.1rem;
  opacity: 0.85;
  animation: fadeInUp 1.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.hero-hint {
  margin-top: 1rem;
  font-size: 1rem;
  opacity: 0.8;
  font-style: italic;
}

.features {
  padding: 4rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: white;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  color: white;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
}

.feature-card h3 {
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
  color: #e0e7ff;
}

.feature-card p {
  opacity: 0.9;
  line-height: 1.6;
}

.cta {
  text-align: center;
  padding: 4rem 0;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.button {
  display: inline-block;
  padding: 1.2rem 3rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  border-color: rgba(255, 255, 255, 0.5);
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
