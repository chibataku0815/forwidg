/**
 * @file プロジェクト関連のユーティリティ関数
 * @description プロジェクトの取得とバリデーションを行う関数を提供
 * @example const { project, error } = await getAndValidateProject(projectId, userId);
 */

import { db } from "@/db";
import { eq } from "drizzle-orm";
import type { feedbacks } from "@/db/schema";
import { projects } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { isSubscriptionActive } from "@/services/subscriptions";
import { ERROR_MESSAGES } from "@/constants/errorMessages";

// プロジェクトの型定義
type Project = InferSelectModel<typeof projects> & {
  feedbacks: InferSelectModel<typeof feedbacks>[];
};

// getAndValidateProject関数の戻り値の型を定義
type ProjectValidationResult =
  | { project: Project; error: null }
  | { project: null; error: string };

/**
 * プロジェクトを取得し、バリデーションを行う関数
 * @param {number} projectId - プロジェクトID
 * @param {string} userId - ユーザーID
 * @returns {Promise<ProjectValidationResult>} プロジェクトとエラーの結果
 */
export async function getAndValidateProject(
  projectId: number,
  userId: string,
): Promise<ProjectValidationResult> {
  const isSubscriptionValid = await isSubscriptionActive(userId);
  const projectsData = await db.query.projects.findMany({
    where: eq(projects.id, projectId),
    with: { feedbacks: true },
  });

  const project = projectsData[0];

  if (!project) return { project: null, error: ERROR_MESSAGES.PROJECT_NOT_FOUND };
  if (!project.isActive) return { project: null, error: ERROR_MESSAGES.PROJECT_INACTIVE };
  if (!isSubscriptionValid) return { project: null, error: ERROR_MESSAGES.SUBSCRIPTION_EXPIRED };

  return { project, error: null };
}
