/**
 * @file
 * ページリストのローディングスケルトンコンポーネント。
 * このスクリプトは、ページリストのローディング中に表示されるプレースホルダーを定義します。
 * 主な仕様として、複数のカードのスケルトンを表示します。
 */

import React from "react";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

/**
 * ページリストスケルトンコンポーネント
 * @returns {JSX.Element} ローディング中に表示されるスケルトン
 */
function PageListSkeleton(): JSX.Element {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 md:mt-6">
			{Array.from({ length: 3 }).map((_, index) => {
				const uniqueKey = `skeleton-${index}-${Math.random().toString(36).substr(2, 9)}`;
				return (
					<div key={uniqueKey} className="flex flex-col space-y-3">
						<Skeleton className="h-[125px] w-[250px] rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default PageListSkeleton;
