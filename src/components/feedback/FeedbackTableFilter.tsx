"use client";
import React from "react";
import type { Column } from "@tanstack/react-table";
import type { InferSelectModel } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";
import type { Table as TanstackTable } from "@tanstack/react-table";

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
 * FeedbackTableFilterコンポーネント
 * @param {Object} props - プロパティ
 * @param {Column<Feedback, unknown>} props.column - テーブルの列
 * @param {TanstackTable<Feedback>} props.table - テーブルインスタンス
 * @returns {JSX.Element} フィルターのJSX要素
 */
function FeedbackTableFilter({
	column,
	table,
}: {
	column: Column<Feedback, unknown>;
	table: TanstackTable<Feedback>;
}): JSX.Element {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();
	return typeof firstValue === "number" ? (
		<div
			className="flex space-x-2"
			onClick={(e) => e.stopPropagation()}
			onKeyUp={(e) => e.stopPropagation()}
			onKeyDown={(e) => e.stopPropagation()}
		>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						e.target.value,
						old?.[1],
					])
				}
				placeholder="Min"
				className="w-24 border shadow rounded"
			/>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ""}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						old?.[0],
						e.target.value,
					])
				}
				placeholder="Max"
				className="w-24 border shadow rounded"
			/>
		</div>
	) : (
		<input
			className="w-36 border shadow rounded p-1 text-slate-800 font-thin"
			onChange={(e) => column.setFilterValue(e.target.value)}
			onClick={(e) => e.stopPropagation()}
			placeholder="Search..."
			type="text"
			value={(columnFilterValue ?? "") as string}
		/>
	);
}

export default FeedbackTableFilter;
