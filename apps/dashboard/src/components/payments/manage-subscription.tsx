/**
 * @file
 * サブスクリプション管理ボタンコンポーネントの定義。
 * このコンポーネントは、ユーザーがサブスクリプションを管理するためのボタンを提供します。
 * Stripeのカスタマーポータルにリダイレクトします。
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * サブスクリプション管理ボタンコンポーネント
 */
const ManageSubscription = () => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * カスタマーポータルにリダイレクトする関数
	 */
	const redirectToCustomerPortal = async () => {
		console.log("redirectToCustomerPortal");
		setLoading(true);
		try {
			const response = await fetch("/api/stripe/create-portal", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const { url } = await response.json();

			if (url) {
				router.push(url);
			} else {
				throw new Error("No URL returned from the server");
			}
		} catch (error) {
			console.error("Error:", error);
			setError(
				"カスタマーポータルへのリダイレクトに失敗しました。もう一度お試しください。",
			);
		}
		setLoading(false);
	};

	if (error) {
		return <p>{error}</p>;
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
