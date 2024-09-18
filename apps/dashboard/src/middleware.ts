/**
 * @file Clerkミドルウェア設定
 * @description このファイルは、Clerkのミドルウェアを設定し、特定のルートへのアクセスを制御します。
 * 公開ルートと非公開ルートを定義し、認証が必要なルートに対して保護を行います。
 *
 * @spec
 * - 公開ルート: サインイン、サインアップ、APIルート
 * - 非公開ルート: その他のすべてのルート
 * - トップページ（ランディングページ）は公開ルートとして扱う
 *
 * @limitations
 * - 公開ルートのパターンは固定されています。
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 公開ルートのパターンを定義
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api(.*)', '/'])

// Clerkミドルウェアの設定
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect()
  }
})

// Next.jsのミドルウェア設定
export const config = {
  matcher: [
    // Next.jsの内部ファイルや静的ファイルを除外
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // APIルートは常に実行
    '/(api|trpc)(.*)',
  ],
};
