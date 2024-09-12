import { createClient } from "@supabase/supabase-js";

/**
 * @file Supabaseクライアントの設定ファイル
 * @description このファイルは、Supabaseクライアントを作成し、データベースと対話するために使用します。
 * 環境変数からSupabaseのURLとキーを取得します。
 *
 * @spec
 * - 環境変数からSupabaseのURLとキーを取得します。
 * - Supabaseクライアントを作成します。
 * - 作成したSupabaseクライアントをエクスポートします。
 *
 * @limitations
 * - 環境変数が設定されていない場合、エラーが発生します。
 *
 * @path shared/utils/supabaseClient.ts
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 環境変数が設定されているか確認
if (!supabaseUrl || !supabaseKey) {
  throw new Error("SupabaseのURLまたはキーが設定されていません。");
}

// Supabaseクライアントを作成
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
