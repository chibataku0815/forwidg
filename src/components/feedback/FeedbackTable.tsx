"use client";
import React from "react";
import Ratings from "../ratings";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table";
import type { InferSelectModel } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
} from "../ui/table";
import FeedbackTableFilter from "./FeedbackTableFilter";

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
 * フィード��ックテーブルコンポーネント
 * @param {Object} props - プロパティ
 * @param {Feedback[]} props.data - フィードバックデータの配列
 * @returns {JSX.Element} テーブルのJSX要素
 */
function FeedbackTable({ data }: { data: Feedback[] }): JSX.Element {
	/**
	 * テーブルの列定義
	 * Explanation of Column Definitions
	 * - accessorKey: データのアクセサキー
	 * - header: ヘッダーのテキスト
	 * - cell: セルのテキスト
	 * - footer: フッターのテキスト
	 * - id: 一意の識別子
	 * - accessorFn: データのアクセサ関数
	 * - columnDef: カラムの定義
	 * - getCoreRowModel: コア行モデルの取得
	 * - getSortedRowModel: ソートされた行モデルの取得
	 * - getFilteredRowModel: フィルタリングされた行モデルの取得
	 */
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

	const table = useReactTable({
		columns,
		data,
		debugTable: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination: {
				pageIndex: 0,
				pageSize: 10,
			},
		},
	});

	return (
		<>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} colSpan={header.colSpan}>
									<div
										{...{
											className: header.column.getCanSort()
												? "cursor-pointer select-none"
												: "",
											onClick: header.column.getToggleSortingHandler(),
										}}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{{
											asc: " 🔼",
											desc: " 🔽",
										}[header.column.getIsSorted() as string] ?? null}
										{header.column.getCanFilter() ? (
											<div className="mt-2">
												<FeedbackTableFilter
													column={header.column}
													table={table}
												/>
											</div>
										) : null}
									</div>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default FeedbackTable;
