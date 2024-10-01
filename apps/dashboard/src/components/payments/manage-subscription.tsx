/**
 * @file サブスクリプション管理ボタンコンポーネント
 *
 * このコンポーネントは、ユーザーがStripeのカスタマーポータルにリダイレクトするためのボタンを提供します。
 * ボタンクリック時にサーバーサイドAPIを呼び出し、StripeポータルへのリダイレクトURLを取得します。
 *
 * @path apps/dashboard/src/components/payments/manage-subscription.tsx
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * サブスクリプション管理ボタンコンポーネント
 * @returns {JSX.Element} サブスクリプション管理ボタン
 */
const ManageSubscription = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Stripeカスタマーポータルへのリダイレクトを処理する関数
	 *
	 * 処理の流れ:
	 * 1. ローディング状態を設定
	 * 2. サーバーサイドAPIを呼び出し
	 * 3. レスポンスを解析
	 * 4. エラーハンドリング
	 * 5. 成功時にリダイレクト
	 * 6. ローディング状態を解除
	 */
	const redirectToCustomerPortal = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/stripe/create-portal", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log("response", response);

			if (!response.ok) {
				throw new Error("Failed to create portal session");
			}

			const data = await response.json();

			if (data.url) {
				router.push(data.url);
			} else {
				throw new Error("Invalid response from server");
			}
		} catch (err) {
			console.error("Error redirecting to customer portal:", err);
			setError("Failed to redirect to customer portal. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (error) {
		return <p className="text-red-500">{error}</p>;
	}

	return (
		<Button
			onClick={redirectToCustomerPortal}
			className="bg-indigo-700"
			disabled={loading}
		>
			{loading ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please Wait
				</>
			) : (
				"Modify Your Subscription"
			)}
		</Button>
	);
};

export default ManageSubscription;
