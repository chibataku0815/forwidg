import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import type {
	projects as projectsSchema,
	feedbacks as feedbacksSchema,
} from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
import type { InferSelectModel } from "drizzle-orm";

import { Suspense } from "react";
import FeedbackTableSkeleton from "@/components/dashboard/feedback/feedback-table-skeleton";
import FeedbackTable from "@/components/dashboard/feedback/feedback-table";

/**
 * プロジェクト詳細ページコンポーネント
 * @param {Object} params - URLパラメータ
 * @param {string} params.projectId - プロジェクトID
 */
const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
	// プロジェクトとフィードバックの型を定義
	type Project = InferSelectModel<typeof projectsSchema> & {
		feedbacks: InferSelectModel<typeof feedbacksSchema>[];
	};

	if (!params.projectId) {
		return <div>Invalid Project ID</div>;
	}

	/**
	 * プロジェクトIDを整数に変換する必要がある理由:
	 * URLパラメータは文字列として渡されるため、データベースクエリで使用する前に整数に変換する必要があります。
	 * これにより、データベースが正しい型の値を受け取り、クエリが正しく実行されます。
	 */
	const projectsData = await db.query.projects.findMany({
		where: eq(projects.id, Number(params.projectId)),
		with: {
			feedbacks: true,
		},
	});

	const project = projectsData[0] || null;

	if (!project) {
		return <div>Invalid Project ID</div>;
	}

	return (
		<div>
			<h1 className="text-3xl font-bold text-center my-4">{project.name}</h1>
			<div className="flex items-center justify-center gap-3">
				<Globe className="h-4 w-4" />
				<span>{project.description}</span>
			</div>
			{project.url && (
				<Link
					href={project.url}
					target="_blank"
					className="flex items-center justify-center gap-3"
				>
					<Code className="h-4 w-4" />
					<span>{project.url}</span>
				</Link>
			)}
			<div>
				<Link
					href="/dashboard"
					className="flex items-center text-indigo-700 mb-5 w-fit"
				>
					<ChevronLeft className="h-5 w-5 mr-1" />
					<span className="text-lg">Back to projects</span>
				</Link>
			</div>
			<Suspense fallback={<FeedbackTableSkeleton />}>
				<FeedbackTable data={project.feedbacks} />
			</Suspense>
		</div>
	);
};

export default ProjectPage;