import NewProjBtn from "@/components/new-proj";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import ProjectsList from "./projects-list";

export default async function Page() {
	const { userId } = auth();
	if (!userId) {
		return null;
	}

	const userProjects = await db
		.select()
		.from(projects)
		.where(eq(projects.userId, userId));

	// const subscribed = await getSubscription({ userId });

	return (
		<div>
			<div className="flex items-center justify-center gap-3">
				<h1 className="text-3xl font-bold text-center my-4">Add New Project</h1>
				<NewProjBtn />
			</div>
			<ProjectsList projects={userProjects} subscribed={false} />
		</div>
	);
}
