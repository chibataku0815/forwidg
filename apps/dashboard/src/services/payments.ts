/**
 * @file 支払い関連の定数
 * @description 支払いプランIDと無料プロジェクトの最大数を定義
 * @example const planId = monthlyPlanId;
 */

export const monthlyPlanId: string = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_ID || '';
export const yearlyPlanId: string = process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_ID || '';
export const maxFreeProjects: number = 3;
