<template>
  <div class="container">
    <header class="header">
      <h1>Nuxt3 Website Template</h1>
      <p class="subtitle">モダンなWebサイト開発のためのテンプレート</p>
    </header>

    <main class="main">
      <section class="hero">
        <h2>ようこそ</h2>
        <p>このテンプレートはNuxt3を使用して構築されています。</p>
      </section>

      <section class="features">
        <h2>特徴</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>⚡ 高速</h3>
            <p>Nuxt3の最適化されたパフォーマンス</p>
          </div>
          <div class="feature-card">
            <h3>🎨 モダン</h3>
            <p>最新のVue 3 Composition API</p>
          </div>
          <div class="feature-card">
            <h3>📱 レスポンシブ</h3>
            <p>あらゆるデバイスに対応</p>
          </div>
          <div class="feature-card">
            <h3>🔧 カスタマイズ可能</h3>
            <p>柔軟な設定とコンポーネント</p>
          </div>
        </div>
      </section>

      <section class="cta">
        <h2>今すぐ始めよう</h2>
        <NuxtLink to="/about" class="button">詳細を見る</NuxtLink>
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
}

.header {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero {
  text-align: center;
  padding: 3rem 0;
}

.hero h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.features {
  padding: 3rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.cta {
  text-align: center;
  padding: 3rem 0;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: #f8f9fa;
  color: #666;
}
</style>
