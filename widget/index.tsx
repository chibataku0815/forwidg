/**
 * @file
 * このファイルは、フィードバックウィジェットのコンポーネントを定義しています。
 * ユーザーがフィードバックを送信できるようにするためのUIを提供します。
 *
 * 主な仕様:
 * - ユーザーは星評価を選択し、フィードバックメッセージを送信できます。
 * - フィードバックが送信されると、感謝のメッセージが表示されます。
 *
 * 制限事項:
 * - このウィジェットは特定のプロジェクトIDに関連付けられています。
 * - Supabaseを使用してフィードバックを保存します。
 */

import { useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Separator } from "@/shared/components/ui/separator";
import "@/shared/styles/globals.css?inline";
import supabase from "@/shared/lib/supabaseClient";

interface WidgetProps {
	projectId: string;
}

export function Widget({ projectId }: WidgetProps) {
	const [rating, setRating] = useState<number>(3);
	const [submitted, setSubmitted] = useState(false);

	const onSelectStar = (index: number) => {
		setRating(index + 1);
	};

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = {
			p_project_id: projectId,
			p_user_name: (form.elements.namedItem("name") as HTMLInputElement).value,
			p_user_email: (form.elements.namedItem("email") as HTMLInputElement)
				.value,
			p_message: (form.elements.namedItem("feedback") as HTMLInputElement)
				.value,
			p_rating: rating,
		};
		const { data: returnedData, error } = await supabase.rpc(
			"add_feedback",
			data,
		);
		setSubmitted(true);
		console.log(returnedData);
	};

	return (
		<>
			<div className="widget fixed bottom-4 right-4 z-50">
				<Popover>
					<PopoverTrigger asChild>
						<Button className="rounded-full shadow-lg hover:scale-105">
							<MessageCircleIcon className="mr-2 h-5 w-5" />
							Feedback
						</Button>
					</PopoverTrigger>
					<PopoverContent className="widget rounded-lg bg-card p-4 shadow-lg w-full max-w-md">
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
											<Input id="name" placeholder="Enter your name" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												type="email"
												placeholder="Enter your email"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="feedback">Feedback</Label>
										<Textarea
											id="feedback"
											placeholder="Tell us what you think"
											className="min-h-[100px]"
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											{Array.from({ length: 5 }, (_, i) => (
												<StarIcon
													key={`star-${i + 1}`}
													className={`h-5 w-5 cursor-pointer ${
														rating > i
															? "fill-primary"
															: "fill-muted stroke-muted-foreground"
													}`}
													onClick={() => onSelectStar(i)}
												/>
											))}
										</div>
										<Button type="submit">Submit</Button>
									</div>
								</form>
							</div>
						)}
						<Separator className="my-4" />
						<div className="text-gray-600">
							Powered by{" "}
							<a
								href="https://nexx-saas.vercel.app/"
								target="_blank"
								rel="noreferrer"
								className="text-indigo-600 hover:underline"
							>
								Nexx ⚡️
							</a>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}

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
			aria-label="Star Icon"
		>
			<title>Star Icon</title> {/* Add title for alternative text */}
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}

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
			<title>Message Circle Icon</title> {/* Add title for alternative text */}
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</svg>
	);
}
