/**
 * @file Supabaseクライアントの設定
 * @description Supabaseクライアントを作成し、プロジェクト全体で使用できるようにします。
 * @path src/lib/supabaseClient.ts
 * @example
 * import { supabase } from '@/lib/supabaseClient';
 */

import { createClient } from '@supabase/supabase-js';

// 環境変数からSupabaseのURLとAPIキーを取得
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabaseクライアントを作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
