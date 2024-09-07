"use client";

import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/shared/components/ui/pagination";
import type { Table as TanstackTable } from "@tanstack/react-table";
import type { InferSelectModel } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";

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
 * @param {TanstackTable<Feedback>} props.table - テーブルインスタンス
 */
function FeedbackTablePagination({
	table,
}: {
	table: TanstackTable<Feedback>;
}): JSX.Element {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						size="sm"
						href="#"
						onClick={() => table.previousPage()}
						className={!table.getCanPreviousPage() ? "disabled" : ""}
					/>
				</PaginationItem>
				{Array.from({ length: table.getPageCount() }, (_, index) => {
					const pageIndex = index;
					return (
						<PaginationItem key={`page-${pageIndex}`}>
							<PaginationLink
								size="sm"
								href="#"
								isActive={table.getState().pagination.pageIndex === pageIndex}
								onClick={() => table.setPageIndex(pageIndex)}
							>
								{pageIndex + 1}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<PaginationNext
						size="sm"
						href="#"
						onClick={() => table.nextPage()}
						className={!table.getCanNextPage() ? "disabled" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

export default FeedbackTablePagination;
