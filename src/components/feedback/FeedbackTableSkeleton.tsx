/**
 * @file
 * フィードバックテーブルのローディングスケルトンコンポーネント。
 * このスクリプトは、フィードバックテーブルのローディング中に表示されるプレースホルダーを定義します。
 * 主な仕様として、テーブルのヘッダーと複数の行のスケルトンを表示します。
 */

import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
} from "../ui/table";

/**
 * フィードバックテーブルスケルトンコンポーネント
 * @returns {JSX.Element} ローディング中に表示されるスケルトン
 */
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