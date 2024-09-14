/**
 * @file
 * サブスクリプションボタンコンポーネントの定義。
 * このコンポーネントは、ユーザーがサブスクリプションを購入するためのボタンを提供します。
 * Stripeを使用して決済を処理します。
 */

"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {
	price: string;
};

/**
 * サブスクリプションボタンコンポーネント
 * @param {Props} props - サブスクリプションの価格IDを含むプロパティ
 */
const SubscribeBtn = ({ price }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * チェックアウト処理を行う関数
	 * @param {string} price - サブスクリプションの価格ID
	 */
	const handleCheckout = async (price: string) => {
		setLoading(true);
		try {
			const { sessionId } = await fetch("/api/stripe/checkout-session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ price }),
			}).then((res) => res.json());

			const stripe = await getStripe();
			if (stripe) {
				stripe.redirectToCheckout({ sessionId });
			}
		} catch (error) {
			console.error(error);
			setError("チェックアウトに失敗しました。もう一度お試しください。");
		}
		setLoading(false);
	};

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<Button
			onClick={() => handleCheckout(price)}
			className="bg-indigo-700"
			disabled={loading}
		>
			{loading ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please Wait
				</>
			) : (
				"Subscribe"
			)}
		</Button>
	);
};

export default SubscribeBtn;
