import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects as dbProjects } from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from "lucide-react";
// import Table from "@/components/table";

const page = async ({
	params,
}: {
	params: {
		projectId: string;
	};
}) => {
	if (!params.projectId) return <div>Invalid Project ID</div>;
	try {
		const projects = await db.query.projects.findMany({
			where: eq(dbProjects.id, Number.parseInt(params.projectId)),
			with: {
				feedbacks: true,
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(`Error in fetching projects: ${error.message}`, {
				function: "page",
				params,
			});
		} else {
			console.error("Unknown error in fetching projects", {
				function: "page",
				params,
			});
		}
		return <div>Failed to load project data</div>;
	}

	// const project = projects[0];

	return (
		<div>
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
