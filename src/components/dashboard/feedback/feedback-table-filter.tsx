"use client";
import React from "react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import type { InferSelectModel } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";
import { Input } from "@/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";

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
 * @param {TanstackTable<Feedback>} props.table - テーブルインスタンス
 */
function FeedbackTableFilter({
	table,
}: {
	table: TanstackTable<Feedback>;
}): JSX.Element {
	const [selectedColumn, setSelectedColumn] = React.useState(
		table.getAllColumns()[0].id,
	);
	const column = table.getColumn(selectedColumn);
	const columnFilterValue = column?.getFilterValue() ?? "";

	return (
		<div className="flex items-center gap-2">
			<Select
				value={selectedColumn}
				onValueChange={(value) => setSelectedColumn(value)}
			>
				<SelectTrigger className="w-36">
					<SelectValue>
						{table.getColumn(selectedColumn)?.columnDef.header as string}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{table.getAllColumns().map((col) => (
						<SelectItem key={col.id} value={col.id}>
							{col.columnDef.header as string}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input
				className="w-36"
				onChange={(e) => column?.setFilterValue(e.target.value)}
				placeholder="Search..."
				type="text"
				value={columnFilterValue as string}
			/>
		</div>
	);
}

export default FeedbackTableFilter;
