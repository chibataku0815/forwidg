"use client";
import React from "react";
import Ratings from "../ratings";
import type { ColumnDef } from "@tanstack/react-table";
import type { InferSelectModel } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";
import FeedbackTablePagination from "./FeedbackTablePagination";

/**
 * InferSelectModelについて:
 * InferSelectModelは、データベースのテーブルから選択されたデータの型を自動的に推測するためのものです。
 * これにより、コード内で型の安全性を確保し、エラーを減らすことができます。
 *
 * @example
 * // feedbacksテーブルからデータを取得し、その型をInferSelectModelで推測する
 * type Feedback = InferSelectModel<typeof feedbacks>;
 */
type Feedback = InferSelectModel<typeof feedbacks>;

/**
 * フィードバックテーブルコンポーネント
 * @param {Object} props - プロパティ
 * @param {Feedback[]} props.data - フィードバックデータの配列
 * @returns {JSX.Element} テーブルのJSX要素
 */
function FeedbackTable({ data }: { data: Feedback[] }): JSX.Element {
	// テーブルの列定義
	const columns = React.useMemo<ColumnDef<Feedback>[]>(
		() => [
			{
				accessorKey: "userName",
				header: "First Name",
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.userEmail,
				id: "userEmail",
				cell: (info) => info.getValue(),
				header: () => <span>Email</span>,
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.rating,
				id: "rating",
				cell: (info) =>
					info.getValue() === null ? (
						<span>N/A</span>
					) : (
						<Ratings rating={info.getValue() as number} count={5} />
					),
				header: () => <span>Rating</span>,
				footer: (props) => props.column.id,
			},
			{
				accessorKey: "message",
				header: () => "Message",
				footer: (props) => props.column.id,
				size: 400,
				minSize: 200,
				maxSize: 600,
			},
			{
				accessorKey: "createdAt",
				header: () => "Created At",
				footer: (props) => props.column.id,
			},
		],
		[],
	);

	return (
		<>
			<FeedbackTablePagination data={data} columns={columns} />
			<hr />
		</>
	);
}

export default FeedbackTable;
