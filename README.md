# ground-reservation-frontend

## プロジェクト概要

### 目的
野球場の空き状況を表示し、特定の条件でユーザーに通知するダッシュボードをNext.jsで作成。

### 技術スタック
- Next.js
- Firebase Firestore
- Firebase Auth
- Vercel
- GitHub Actions

### 主要機能
1. **ユーザー認証**
   - GoogleアカウントとLINEアカウントでログイン。
   - Firebase Authを使用。
2. **ダッシュボード**
   - 空き状況の一覧表示。
   - 日付とグラウンドでフィルタリング。
   - モバイル対応のレスポンシブデザイン。
3. **通知設定**
   - ユーザーがメールアドレスまたはWebhook URLを設定。
   - 特定の日付と時間帯で空きが出た際に通知。
4. **API**
   - Firebase Firestoreと連携するAPIエンドポイント。
   - 通知設定を保存・取得するエンドポイント。

### 必要なファイルとディレクトリ構造

```
baseball-field-availability/
├── components/
│   ├── AuthButton.tsx
│   ├── LineLoginButton.tsx
│   ├── NotificationSettings.tsx
│   └── Dashboard.tsx
├── pages/
│   ├── api/
│   │   ├── auth/[...nextauth].ts
│   │   ├── data.ts
│   │   └── save-notification-settings.ts
│   ├── _app.tsx
│   ├── index.tsx
│   └── dashboard.tsx
├── lib/
│   └── firebase.ts
├── public/
├── styles/
├── .env.local
├── next.config.js
├── package.json
└── tsconfig.json
```

### セットアップ手順

1. **Next.jsプロジェクトのセットアップ**
   ```bash
   npx create-next-app@latest baseball-field-availability
   cd baseball-field-availability
   npm install firebase firebase-admin @next-auth/firebase-adapter next-auth axios date-fns
   ```

2. **Firebaseの設定 (`lib/firebase.ts`)**
   ```typescript
   import { initializeApp, getApps } from 'firebase/app'
   import { getAuth } from 'firebase/auth'
   import { getFirestore } from 'firebase/firestore'

   const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')

   if (!getApps().length) {
     initializeApp(firebaseConfig)
   }

   export const auth = getAuth()
   export const db = getFirestore()
   ```

3. **認証設定 (`pages/api/auth/[...nextauth].ts`)**
   - Google認証の設定を追加。
   - LINE認証用のカスタムプロバイダーを実装。

4. **ダッシュボードコンポーネント (`components/Dashboard.tsx`)**
   - 空き状況の表示。
   - フィルタリング機能。
   - レスポンシブデザインの実装。

5. **通知設定コンポーネント (`components/NotificationSettings.tsx`)**
   - ユーザーが通知先（メール、Webhook）を設定。

6. **APIエンドポイント**
   - `data.ts`: Firestoreからデータを取得。
   - `save-notification-settings.ts`: ユーザーの通知設定を保存。

7. **環境変数設定 (`.env.local`)**
   ```
   FIREBASE_SERVICE_ACCOUNT_KEY=...
   NEXT_PUBLIC_FIREBASE_CONFIG=...
   LINE_CHANNEL_ID=...
   LINE_CHANNEL_SECRET=...
   LINE_REDIRECT_URI=...
   NEXTAUTH_SECRET=...
   NEXTAUTH_URL=...
   ```

8. **ホスティング**
   - GitHubリポジトリにコードをプッシュ。
   - Vercelにデプロイし、環境変数を設定。

### 補足

- 各コンポーネントやAPIエンドポイントの詳細なコードは、プロジェクトの進行に合わせて実装してください。
- 認証部分では、NextAuth.jsのドキュメントを参考にLINE認証をカスタマイズしてください。
- GitHub Actionsの設定は既存のものをベースに、Next.jsのAPIエンドポイントを呼び出すように調整。
