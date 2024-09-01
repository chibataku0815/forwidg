import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects as dbProjects } from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
// import Table from "@/components/table";

/**
 * プロジェクト詳細ページコンポーネント
 * @param {Object} params - URLパラメータ
 * @param {string} params.projectId - プロジェクトID
 * @returns {JSX.Element} プロジェクト詳細ページのJSX要素
 */
const page = async ({
	params,
}: {
	params: {
		projectId: string;
	};
}) => {
	if (!params.projectId) return <div>Invalid Project ID</div>;

	// プロジェクトIDを整数に変換する必要がある理由:
	// URLパラメータは文字列として渡されるため、データベースクエリで使用する前に整数に変換する必要があります。
	// これにより、データベースが正しい型の値を受け取り、クエリが正しく実行されます。
	const projects = await db.query.projects.findMany({
		where: eq(dbProjects.id, Number(params.projectId)),
		with: {
			feedbacks: true,
		},
	});

	const project = projects[0];

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
			<div>{/* <Table data={project.feedbacks} /> */}</div>
		</div>
	);
};

export default page;
