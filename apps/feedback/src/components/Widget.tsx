import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import tailwindStyles from "../index.css?inline";
import { supabase } from "@/lib/supabaseClient";

/**
 * @file Widget.tsx
 * @brief プロジェクトのフィードバックウィジェットを提供するコンポーネント
 * @param {string} projectId - プロジェクトのID
 * @path src/components/Widget.tsx
 * @example <Widget projectId="12345" />
 */

/**
 * Widgetコンポーネントのプロパティの型定義
 * @typedef {Object} WidgetProps
 * @property {string} projectId - プロジェクトのID
 */
interface WidgetProps {
	projectId: string;
}

/**
 * フィードバックデータの型定義
 * @typedef {Object} FeedbackData
 * @property {string} p_project_id - プロジェクトのID
 * @property {string} p_user_name - ユーザーの名前
 * @property {string} p_user_email - ��ーザーのメールアドレス
 * @property {string} p_message - フィードバックメッセージ
 * @property {number} p_rating - 評価の星の数
 */
interface FeedbackData {
	p_project_id: string;
	p_user_name: string;
	p_user_email: string;
	p_message: string;
	p_rating: number;
}

export const Widget: React.FC<WidgetProps> = ({ projectId }) => {
	const [rating, setRating] = useState<number>(3);
	const [submitted, setSubmitted] = useState<boolean>(false);

	/**
	 * 星の評価を選択するための関数
	 * @param {number} index - 選択された星のインデックス
	 */
	const onSelectStar = (index: number) => {
		setRating(index + 1);
	};

	/**
	 * フィードバックフォームを送信するための関数
	 * @param {React.FormEvent<HTMLFormElement>} e - フォーム送信イベント
	 */
	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		// フォームデータのサニタイズ
		const sanitizedData: FeedbackData = {
			p_project_id: projectId,
			p_user_name: formData.get("name")?.toString().trim() || "",
			p_user_email: formData.get("email")?.toString().trim() || "",
			p_message: formData.get("feedback")?.toString().trim() || "",
			p_rating: rating,
		};
		const { data: returnedData, error } = await supabase.rpc(
			"add_feedback",
			sanitizedData,
		);
		if (error) {
			console.error(error);
		}
		setSubmitted(true);
		console.log(returnedData);
	};

	return (
		<>
			<style>{tailwindStyles}</style>
			<div className="widget fixed bottom-4 right-4 z-50">
				<Popover>
					<PopoverTrigger asChild>
						<Button className="rounded-full shadow-lg hover:scale-105">
							<MessageCircleIcon className="mr-2 h-5 w-5" />
							Feedback
						</Button>
					</PopoverTrigger>
					<PopoverContent className="widget rounded-lg bg-card p-4 shadow-lg w-full max-w-md">
						<style>{tailwindStyles}</style>
						{submitted ? (
							<div>
								<h3 className="text-lg font-bold">
									Thank you for your feedback!
								</h3>
								<p className="mt-4">
									We appreciate your feedback. It helps us improve our product
									and provide better service to our customers.
								</p>
							</div>
						) : (
							<div>
								<h3 className="text-lg font-bold">Send us your feedback</h3>
								<form className="space-y-2" onSubmit={submit}>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												name="name"
												placeholder="Enter your name"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="Enter your email"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="feedback">Feedback</Label>
										<Textarea
											id="feedback"
											name="feedback"
											placeholder="Tell us what you think"
											className="min-h-[100px]"
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											{[...Array(5)].map((_, index) => {
												const uniqueKey = `star-${index}-${rating}`;
												return (
													<StarIcon
														key={uniqueKey}
														className={`h-5 w-5 cursor-pointer ${rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
														onClick={() => onSelectStar(index)}
													/>
												);
											})}
										</div>
										<Button type="submit">Submit</Button>
									</div>
								</form>
							</div>
						)}
						<Separator className="my-4" />
						<div className="text-gray-600">Powered by Forestone</div>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
};

/**
 * 星アイコンのSVGコンポーネント
 * @param {React.SVGProps<SVGSVGElement>} props - SVGプロパティ
 */
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Star Icon</title>
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}

/**
 * メッセージアイコンのSVGコンポーネント
 * @param {React.SVGProps<SVGSVGElement>} props - SVGプロパティ
 */
function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-message-circle"
		>
			<title>Message Circle Icon</title>
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</svg>
	);
}
