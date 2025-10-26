# GitHub Pagesへのデプロイ手順

このドキュメントでは、Nuxt3サイトをGitHub Pagesに公開する手順を詳しく説明します。

## 前提条件

- GitHubアカウントを持っていること
- このリポジトリがGitHubにプッシュされていること

## セットアップ手順

### 1. GitHub Pagesを有効化

1. GitHubでリポジトリページを開く: `https://github.com/sadamitsu82/sadamitsu82`
2. `Settings` タブをクリック
3. 左サイドバーの `Pages` をクリック
4. **Build and deployment** セクションで：
   - **Source**: `GitHub Actions` を選択

これで設定は完了です！

### 2. デプロイ方法

#### 方法A: 自動デプロイ（推奨）

`main` または `master` ブランチにコードをプッシュすると、自動的にデプロイされます。

```bash
# 現在の作業ブランチの内容をmainにマージ
git checkout main
git merge claude/add-japanese-summary-011CUKMrKUxz2LDaWh1fDB8k
git push origin main
```

#### 方法B: 手動デプロイ

1. GitHubリポジトリページの `Actions` タブを開く
2. `Deploy to GitHub Pages` ワークフローを選択
3. `Run workflow` ボタンをクリック
4. ブランチを選択して `Run workflow` を実行

### 3. デプロイの確認

1. `Actions` タブでワークフローの実行状況を確認
2. 緑色のチェックマークが表示されたら成功
3. 数分後、以下のURLでサイトにアクセス可能：
   ```
   https://sadamitsu82.github.io/
   ```

## デプロイプロセスの詳細

GitHub Actionsワークフローは以下の手順を実行します：

1. **コードのチェックアウト**: リポジトリのコードを取得
2. **Node.jsのセットアップ**: Node.js 20をインストール
3. **依存関係のインストール**: `npm ci` で依存関係をインストール
4. **静的サイト生成**: `npm run generate` で `.output/public` に静的ファイルを生成
5. **GitHub Pagesへのデプロイ**: 生成されたファイルをGitHub Pagesにアップロード

## トラブルシューティング

### デプロイが失敗する場合

1. **Actions タブでエラーログを確認**
   - エラーメッセージを確認して問題を特定

2. **よくある問題と解決方法**

   **依存関係のエラー**:
   ```bash
   # package-lock.jsonを更新
   npm install
   git add package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

   **ビルドエラー**:
   ```bash
   # ローカルで生成をテスト
   npm run generate
   ```

3. **権限の問題**
   - `Settings` → `Actions` → `General` で
   - `Workflow permissions` が `Read and write permissions` になっているか確認

### サイトが表示されない場合

1. **GitHub Pagesの設定を確認**
   - `Settings` → `Pages` で正しく設定されているか確認

2. **キャッシュのクリア**
   - ブラウザのキャッシュをクリアしてから再度アクセス

3. **デプロイ完了を待つ**
   - 初回デプロイは10分程度かかる場合があります

## カスタムドメインの設定（オプション）

独自ドメインを使用したい場合：

1. `public/` ディレクトリに `CNAME` ファイルを作成
   ```
   yourdomain.com
   ```

2. DNSプロバイダーで以下のレコードを設定：
   ```
   CNAME record: www → sadamitsu82.github.io
   A records: @ → GitHub Pagesの4つのIPアドレス
   ```

3. GitHub Pages設定で `Custom domain` にドメインを入力

詳細は [GitHubの公式ドキュメント](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) を参照してください。

## 更新方法

サイトを更新する場合：

1. ローカルでコードを修正
2. コミット＆プッシュ
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```
3. 自動的に再デプロイされます

## 参考リンク

- [GitHub Pages 公式ドキュメント](https://docs.github.com/pages)
- [GitHub Actions 公式ドキュメント](https://docs.github.com/actions)
- [Nuxt 3 デプロイドキュメント](https://nuxt.com/docs/getting-started/deployment)
