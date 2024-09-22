/**
 * @file プロジェクトページのコンポーネント
 * @description ユーザーが特定のプロジェクトの詳細を表示するためのページ
 * @path /projects/[projectId]
 * @example <ProjectPage params={{ projectId: "1" }} />
 */

import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
import { Suspense } from "react";
import FeedbackTableSkeleton from "@/components/dashboard/feedback/feedback-table-skeleton";
import FeedbackTable from "@/components/dashboard/feedback/feedback-table";
import { auth } from "@clerk/nextjs/server";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { getAndValidateProject } from "@/services/project";

/**
 * プロジェクトページのコンポーネント
 * @param {Object} params - パラメータオブジェクト
 * @param {string} params.projectId - プロジェクトID
 */
const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
	if (!params.projectId || Number.isNaN(Number(params.projectId))) {
		return <div>{ERROR_MESSAGES.INVALID_ID}</div>;
	}

	const projectId = Number(params.projectId);
	const { userId } = auth();

	if (!userId) return <div>{ERROR_MESSAGES.AUTH_REQUIRED}</div>;

	try {
		const { project, error } = await getAndValidateProject(projectId, userId);
		if (error) return <div>{error}</div>;
		if (!project) return <div>{ERROR_MESSAGES.PROJECT_NOT_FOUND}</div>;

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
					<Link
						href={`/projects/${params.projectId}/instructions`}
						className="underline text-indigo-700 flex items-center mt-2"
					>
						<Code className="h-5 w-5 mr-1" />
						<span className="text-lg">Embed Code</span>
					</Link>
				</div>
				<Suspense fallback={<FeedbackTableSkeleton />}>
					<FeedbackTable data={project.feedbacks} />
				</Suspense>
			</div>
		);
	} catch (error) {
		console.error("Error fetching project data:", error);
		return <div>{ERROR_MESSAGES.FETCH_ERROR}</div>;
	}
};

export default ProjectPage;
