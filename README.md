# Nuxt3 Website Template

モダンなWebサイト開発のためのNuxt3テンプレート

## 概要

このプロジェクトは、Nuxt3を使用したWebサイト開発を迅速に始めるためのテンプレートです。美しいデザイン、レスポンシブレイアウト、TypeScriptサポートなど、すぐに使える機能が含まれています。

## 主な特徴

- **⚡ 高速なパフォーマンス**: Nuxt3の最適化されたビルドシステム
- **🎨 モダンなUI**: グラデーションとアニメーションを使用した美しいデザイン
- **📱 レスポンシブデザイン**: あらゆるデバイスに対応
- **🔧 TypeScript対応**: 型安全な開発環境
- **🎯 SEO最適化**: メタタグとOGP設定をサポート
- **📦 コンポーネントベース**: 再利用可能なVueコンポーネント
- **🚀 簡単なデプロイ**: 静的サイト生成にも対応

## 技術スタック

- **フレームワーク**: Nuxt 3.13.0
- **UIライブラリ**: Vue 3.4.0
- **ルーティング**: Vue Router 4.4.0
- **言語**: TypeScript 5.5.0
- **開発ツール**: Nuxt DevTools

## 必要環境

- Node.js 18.x以上
- npm または yarn

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

### 3. 本番用ビルド

```bash
npm run build
```

### 4. 本番プレビュー

```bash
npm run preview
```

### 5. 静的サイトの生成

```bash
npm run generate
```

## プロジェクト構造

```
.
├── assets/           # CSSやその他のアセット
│   └── css/
│       └── main.css
├── components/       # 再利用可能なVueコンポーネント
│   └── AppHeader.vue
├── pages/           # ページコンポーネント（自動ルーティング）
│   ├── index.vue
│   └── about.vue
├── public/          # 静的ファイル
├── app.vue          # アプリケーションのエントリーポイント
├── nuxt.config.ts   # Nuxt設定ファイル
├── package.json     # プロジェクトの依存関係
└── tsconfig.json    # TypeScript設定
```

## カスタマイズ

### サイトタイトルとメタ情報の変更

`nuxt.config.ts` でアプリケーション全体の設定を変更できます:

```typescript
app: {
  head: {
    title: 'あなたのサイトタイトル',
    meta: [
      { name: 'description', content: 'サイトの説明' }
    ]
  }
}
```

### 新しいページの追加

`pages/` ディレクトリに新しい `.vue` ファイルを作成するだけで、自動的にルーティングが設定されます。

例: `pages/contact.vue` を作成すると `/contact` でアクセス可能になります。

### スタイルのカスタマイズ

グローバルスタイルは `assets/css/main.css` で定義されています。各コンポーネントでは `<style scoped>` を使用してコンポーネント固有のスタイルを定義できます。

## デプロイ

### GitHub Pages（推奨）

このテンプレートはGitHub Pagesへの自動デプロイが設定されています。

#### 初回セットアップ手順

1. **GitHubリポジトリの設定**
   - GitHubのリポジトリページに移動
   - `Settings` → `Pages` を開く
   - `Source` で `GitHub Actions` を選択

2. **メインブランチにマージ**
   ```bash
   # 現在のブランチをmainにマージ
   git checkout main
   git merge your-branch-name
   git push origin main
   ```

3. **自動デプロイ**
   - mainブランチへのpushで自動的にビルド・デプロイされます
   - `Actions` タブでデプロイの進行状況を確認できます

4. **公開URL**
   - `https://sadamitsu82.github.io/` でアクセス可能になります
   - デプロイ完了まで数分かかる場合があります

#### 手動デプロイ

GitHubの `Actions` タブから `Deploy to GitHub Pages` ワークフローを手動実行することもできます。

### Vercel

```bash
npm run build
```

Vercelにプッシュするだけで自動的にデプロイされます。

### Netlify

```bash
npm run generate
```

生成された `.output/public` をNetlifyにアップロードしてください。

### その他のホスティング

詳細は [Nuxt公式ドキュメント](https://nuxt.com/docs/getting-started/deployment) を参照してください。

## 開発のヒント

### 開発ツールの使用

Nuxt DevToolsが有効になっています。開発サーバー起動時に自動的に利用できます。

### ホットリロード

開発モードでは、ファイルを保存すると自動的にページがリロードされます。

### TypeScriptサポート

全てのコンポーネントでTypeScriptを使用できます。型定義は自動的に生成されます。

## トラブルシューティング

### ポートが既に使用されている場合

```bash
PORT=3001 npm run dev
```

### 依存関係の問題

```bash
rm -rf node_modules package-lock.json
npm install
```

## ライセンス

このテンプレートは自由に使用、変更、配布できます。

## 参考リンク

- [Nuxt 3 公式ドキュメント](https://nuxt.com/docs)
- [Vue 3 公式ドキュメント](https://vuejs.org/)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/)

## 貢献

このテンプレートへの改善提案やバグ報告は大歓迎です。

---

Happy coding! 🚀
