# フィードバックウィジェットプロジェクト

## 概要

このプロジェクトは、ウェブサイト所有者がユーザーからフィードバックを収集するためのウィジェットと、そのフィードバックを管理するためのダッシュボードを提供するmonorepoです。

## 技術スタック

### ダッシュボード
- TypeScript
- Next.js (App Router)
- React
- Shadcn UI
- Radix UI
- Tailwind CSS
- Clerk (認証)
- Stripe (決済)
- TanStack Query
- TanStack Table
- Drizzle ORM
- Supabase (データベース)

### ウィジェット
- TypeScript
- React
- Vite
- Web Components
- Shadcn UI
- Radix UI
- Tailwind CSS
- Supabase

## プロジェクト構造
├── apps/
│ ├── dashboard/ # ダッシュボードアプリケーション
│ └── widget/ # ウィジェットアプリケーション
├── packages/
│ └── ui/ # 共有UIコンポーネント
└── package.json


## セットアップ

1. リポジトリをクローンします：
   ```
   git clone [リポジトリURL]
   ```

2. 依存関係をインストールします：
   ```
   pnpm install
   ```

3. 環境変数を設定します：
   - `apps/dashboard/.env.local`と`apps/widget/.env.local`ファイルを作成し、必要な環境変数を設定します。

4. 開発サーバーを起動します：
   ```
   pnpm dev
   ```

## 使用方法

### ダッシュボード

1. ブラウザで`http://localhost:3000`にアクセスします。
2. アカウントを作成またはログインします。
3. プロジェクトを作成し、ウィジェットの埋め込みコードを取得します。

### ウィジェット

1. ダッシュボードで取得した埋め込みコードをウェブサイトに追加します。
2. ウィジェットが表示され、ユーザーからフィードバックを収集できます。

## 開発ガイドライン

開発者は以下のガイドラインに従ってください：

## ライセンス

[ライセンス情報を記載]

## コントリビューション

プロジェクトへの貢献を歓迎します。プルリクエストを送る前に、既存の問題をチェックするか、新しい問題を作成してください。

## サポート

問題や質問がある場合は、GitHubのIssueセクションを使用してください。
