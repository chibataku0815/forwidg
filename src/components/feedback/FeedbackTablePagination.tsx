"use client";
import React from "react";
import {
	ChevronRight,
	ChevronLeft,
	ChevronsRight,
	ChevronsLeft,
} from "lucide-react";

import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import type { InferSelectModel } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";
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
 * FeedbackTablePaginationコンポーネント
 * @param {Object} props - プロパティ
 * @param {Feedback[]} props.data - フィードバックデータの配列
 * @param {ColumnDef<Feedback>[]} props.columns - テーブルの列定義
 * @returns {JSX.Element} テーブルのJSX要素
 */
function FeedbackTablePagination({
	data,
	columns,
}: {
	data: Feedback[];
	columns: ColumnDef<Feedback>[];
}): JSX.Element {
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const table = useReactTable({
		columns,
		data,
		debugTable: true,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		state: {
			pagination,
		},
	});

	return (
		<div className="p-2 mt-5">
			<div className="h-2" />
			<table className="w-full">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="border-b border-slate-300">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="text-left bg-gray-50 rounded-t-md p-4"
									colSpan={header.colSpan}
								>
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
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className="p-4 border-b"
									style={{
										width: cell.column.getSize(),
									}}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="h-2" />
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="border rounded p-1 bg-gray-50 cursor-pointer"
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronsLeft />
				</button>
				<button
					type="button"
					className="border rounded p-1 bg-gray-50 cursor-pointer"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeft />
				</button>
				<button
					type="button"
					className="border rounded p-1 bg-gray-50 cursor-pointer"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronRight />
				</button>
				<button
					type="button"
					className="border rounded p-1 bg-gray-50 cursor-pointer"
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronsRight />
				</button>
				<span className="flex items-center gap-1">
					| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default FeedbackTablePagination;
