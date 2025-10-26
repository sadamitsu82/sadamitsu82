<template>
  <div class="container">
    <header class="header">
      <h1>Nuxt3 Website Template</h1>
      <p class="subtitle">モダンなWebサイト開発のためのテンプレート</p>
    </header>

    <main class="main">
      <section class="hero">
        <h2>ようこそ</h2>
        <p>このテンプレートはNuxt3を使用して構築された、モダンなWebサイト開発のためのスターターキットです。</p>
      </section>

      <section class="features">
        <h2>主な機能</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>⚡ 高速</h3>
            <p>Nuxt3の最適化されたパフォーマンス</p>
          </div>
          <div class="feature-card">
            <h3>🎨 モダンなUI</h3>
            <p>美しいグラデーションとアニメーション</p>
          </div>
          <div class="feature-card">
            <h3>📱 レスポンシブ</h3>
            <p>あらゆるデバイスに対応</p>
          </div>
          <div class="feature-card">
            <h3>🔧 カスタマイズ可能</h3>
            <p>柔軟な設定とコンポーネント</p>
          </div>
          <div class="feature-card">
            <h3>🌊 流体シミュレーション</h3>
            <p>WebGLによる2D流体計算デモ</p>
          </div>
          <div class="feature-card">
            <h3>🎯 TypeScript</h3>
            <p>型安全な開発環境</p>
          </div>
        </div>
      </section>

      <section class="demos">
        <h2>デモページ</h2>
        <div class="demo-grid">
          <NuxtLink to="/fluid" class="demo-card">
            <h3>🌊 2D流体シミュレーション</h3>
            <p>WebGLによるリアルタイム流体計算</p>
            <span class="demo-badge">インタラクティブ</span>
          </NuxtLink>
          <NuxtLink to="/about" class="demo-card">
            <h3>📄 About</h3>
            <p>テンプレートの詳細情報</p>
            <span class="demo-badge">ドキュメント</span>
          </NuxtLink>
        </div>
      </section>

      <section class="cta">
        <h2>今すぐ始めよう</h2>
        <div class="cta-buttons">
          <NuxtLink to="/fluid" class="button primary">流体デモを見る</NuxtLink>
          <NuxtLink to="/about" class="button secondary">詳細を見る</NuxtLink>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2024 Nuxt3 Website Template</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'ホーム',
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.header {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  width: 100%;
}

.hero {
  text-align: center;
  padding: 3rem 0;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 700;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

.features {
  padding: 4rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
  font-weight: 700;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: #667eea;
  font-weight: 700;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.demos {
  padding: 4rem 0;
}

.demos h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
  font-weight: 700;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.demo-card {
  position: relative;
  padding: 2.5rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.demo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.demo-card:hover::before {
  opacity: 1;
}

.demo-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
}

.demo-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.demo-card p {
  font-size: 1.1rem;
  opacity: 0.95;
  margin-bottom: 1rem;
}

.demo-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 24px;
  margin-top: 2rem;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.button {
  display: inline-block;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.button.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.button.secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-3px);
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: #2d3748;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .hero h2 {
    font-size: 2rem;
  }

  .features h2,
  .demos h2,
  .cta h2 {
    font-size: 2rem;
  }

  .feature-grid,
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
    padding: 0 1rem;
  }
}
</style>
