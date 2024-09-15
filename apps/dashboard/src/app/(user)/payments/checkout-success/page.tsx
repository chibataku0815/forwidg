/**
 * @file チェックアウト成功ページ
 * @description このファイルは、Stripeのチェックアウトが成功した後に表示されるページを定義します。
 * @path apps/dashboard/src/app/(user)/payments/checkout-success/page.tsx
 */

import Link from "next/link";

/**
 * チェックアウト成功メッセージとダッシュボードへのリンクを表示するコンポーネント
 */
export default function CheckoutSuccessPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold mb-4">
				チェックアウトが成功しました！
			</h1>
			<p className="text-lg mb-6">ご購入ありがとうございます。</p>
			<Link href="/dashboard">
				<span className="text-indigo-700 underline">ダッシュボードに戻る</span>
			</Link>
		</div>
	);
}
