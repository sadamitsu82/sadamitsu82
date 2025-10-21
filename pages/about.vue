<template>
  <div class="container">
    <header class="page-header">
      <h1>このテンプレートについて</h1>
      <NuxtLink to="/" class="back-link">← ホームに戻る</NuxtLink>
    </header>

    <main class="content">
      <section class="section">
        <h2>概要</h2>
        <p>
          このテンプレートはNuxt3を使用して構築された、モダンなWebサイト開発のためのスターターキットです。
          すぐに使える基本的な構造とスタイリングを提供し、プロジェクトの立ち上げを加速します。
        </p>
      </section>

      <section class="section">
        <h2>含まれている機能</h2>
        <ul>
          <li>Nuxt3 の最新バージョン</li>
          <li>TypeScript サポート</li>
          <li>レスポンシブデザイン</li>
          <li>ページルーティング</li>
          <li>コンポーネントベースのアーキテクチャ</li>
          <li>SEO最適化のためのmeta設定</li>
        </ul>
      </section>

      <section class="section">
        <h2>使い方</h2>
        <div class="code-block">
          <pre><code># 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番用ビルド
npm run build

# 本番プレビュー
npm run preview</code></pre>
        </div>
      </section>

      <section class="section">
        <h2>カスタマイズ</h2>
        <p>
          このテンプレートは自由にカスタマイズできます。
          <code>nuxt.config.ts</code>でアプリケーション設定を変更したり、
          新しいページやコンポーネントを追加したりできます。
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About',
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.back-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.content {
  line-height: 1.8;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 1.8rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.section p {
  color: #555;
  margin-bottom: 1rem;
}

.section ul {
  list-style: none;
  padding-left: 0;
}

.section ul li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #555;
}

.section ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.code-block {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  color: #333;
}

code {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  color: #667eea;
}
</style>
