/**
 * @file
 * プロジェクトリストコンポーネントの定義。
 * このコンポーネントは、ユーザーのプロジェクトリストを表示し、サブスクリプションの状態に応じて
 * プレミアムアップグレードのオプションを提供します。
 */

import type { InferSelectModel } from "drizzle-orm";
import type { projects } from "@/db/schema";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

/**
 * InferSelectModelについて:
 * InferSelectModelは、データベースのテーブルから選択されたデータの型を自動的に推測するためのものです。
 *
 * @example
 * // projectsテーブルからデータを取得し、その型をInferSelectModelで推測する
 * type Project = InferSelectModel<typeof projects>;
 */
type Project = InferSelectModel<typeof projects>;

type Props = {
	projects: Project[];
	subscribed: boolean | null | undefined;
};

/**
 * プロジェクトリストコンポーネント
 * @param {Props} props - プロジェクトリストとサブスクリプション状態を含むプロパティ
 */
const ProjectsList = (props: Props): JSX.Element => {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 m-5 p-4 gap-4">
				{props.projects.map((project: Project) => (
					<div key={project.id}>
						<Card className="max-w-[350px] flex flex-col h-full">
							<CardHeader className="flex-1">
								<CardTitle>{project.name}</CardTitle>
								<CardDescription>{project.description}</CardDescription>
							</CardHeader>
							<CardFooter>
								<Link href={`/projects/${project.id}`}>
									<Button>View Project</Button>
								</Link>
							</CardFooter>
						</Card>
					</div>
				))}
				{props.subscribed !== true && (
					<Card className="max-w-[350px] flex flex-col h-full bg-gray-300">
						<CardHeader className="flex-1">
							<CardTitle className="flex flex-row text-sm md:text-lg items-center">
								<span>Upgrade to Premium</span>
							</CardTitle>
							<CardDescription className="mt-3">
								Unlock unlimited projects
							</CardDescription>
						</CardHeader>
						{/* <div className="w-fit mx-auto mb-4">
              <SubscribeBtn price={monthlyPlanId} />
            </div> */}
					</Card>
				)}
			</div>
		</div>
	);
};

export default ProjectsList;
