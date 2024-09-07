/**
 * @file
 * フィードバックテーブルのローディングスケルトンコンポーネント。
 * このスクリプトは、フィードバックテーブルのローディング中に表示されるプレースホルダーを定義します。
 *
 * @spec
 * - テーブルのヘッダーとボディのスケルトンを表示します。
 * - ローディング中の視覚的なフィードバックを提供します。
 *
 * @limitations
 * - データがロードされるまでの一時的な表示にのみ使用されます。
 */
import React from "react";

import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
} from "@/shared/components/ui/table";
import { Skeleton } from "@/shared/components/ui/skeleton";

function FeedbackTableSkeleton(): JSX.Element {
	return (
		<div className="flex flex-col gap-4">
			<Table>
				<TableHeader>
					<TableRow>
						{["First Name", "Email", "Rating", "Message", "Created At"].map(
							(header) => (
								<TableHead key={header}>
									<Skeleton className="h-4 w-24" />
								</TableHead>
							),
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 10 }).map((_, rowIndex) => (
						<TableRow key={`row-${rowIndex}-${new Date().getTime()}`}>
							{Array.from({ length: 5 }).map((_, cellIndex) => (
								<TableCell
									key={`cell-${rowIndex}-${cellIndex}-${new Date().getTime()}`}
								>
									<Skeleton className="h-4 w-full" />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default FeedbackTableSkeleton;
