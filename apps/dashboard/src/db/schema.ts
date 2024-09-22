/**
 * @file
 * データベーススキーマの定義。
 * このスクリプトは、ユーザー、投稿、プロジェクト、フィードバック、サブスクリプションのテーブルを定義します。
 * 各テーブルには、関連するフィールドと制約が含まれています。
 */

import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

/**
 * ユーザーテーブルの定義
 * @property {number} id - ユーザーID (主キー)
 * @property {string} name - ユーザー名
 * @property {number} age - ユーザーの年齢
 * @property {string} email - ユーザーのメールアドレス (一意)
 */
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

/**
 * 投稿テーブルの定義
 * @property {number} id - 投稿ID (主キー)
 * @property {string} title - 投稿のタイトル
 * @property {string} content - 投稿の内容
 * @property {number} userId - ユーザーID (外部キー)
 * @property {Date} createdAt - 作成日時
 * @property {Date} updatedAt - 更新日時
 */
export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

/**
 * プロジェクトテーブルの定義
 */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  url: text("url"),
  userId: varchar("user_id"),
  isActive: integer("is_active").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * プロジェクトとフィードバックのリレーション定義
 * @property {Array} feedbacks - プロジェクトに関連するフィードバックのリスト
 *
 * プロジェクトとフィードバックのリレーションは、プロジェクトが複数のフィードバックを持つことを意味します。
 * 例えば、あるプロジェクトに対して複数のユーザーがフィードバックを残すことができます。
 *
 * @example
 * // プロジェクトに関連するフィードバックを取得する
 * const projectWithFeedbacks = await db.projects.findMany({
 *   include: {
 *     feedbacks: true,
 *   },
 * });
 */
export const projectsRelations = relations(projects, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

/**
 * フィードバックテーブルの定義
 * @property {number} id - フィードバックID (主キー)
 * @property {number} projectId - プロジェクトID
 * @property {string} userName - ユーザー名
 * @property {string} userEmail - ユーザーのメールアドレス
 * @property {string} message - フィードバックメッセージ
 * @property {number} rating - 評価
 */
export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id"),
  userName: text("user_name"),
  userEmail: text("user_email"),
  message: text("message"),
  rating: integer("rating"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * フィードバックとプロジェクトのリレーション定義
 * @property {Object} project - フィードバックに関連するプロジェクト
 * @property {Array} fields - フィードバックテーブルのフィールド
 * @property {Array} references - プロジェクトテーブルの参照フィールド
 *
 * フィードバックとプロジェクトのリレーションは、フィードバックが特定のプロジェクトに関連付けられていることを意味します。
 * 例えば、あるフィードバックがどのプロジェクトに対するものかを示します。
 *
 * @example
 * // フィードバックに関連するプロジェクトを取得する
 * const feedbackWithProject = await db.feedbacks.findMany({
 *   include: {
 *     project: true,
 *   },
 * });
 */
export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  project: one(projects, {
    fields: [feedbacks.projectId],
    references: [projects.id],
  }),
}));

/**
 * サブスクリプションテーブルの定義
 * @property {number} id - サブスクリプションID (主キー)
 * @property {string} userId - ユーザーID
 * @property {string} stripeCustomerId - Stripeの顧客ID
 * @property {string} stripeSubscriptionId - StripeのサブスクリプションID
 * @property {boolean} subscribed - サブスクリプションの状態
 */
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscribed: boolean("subscribed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;


