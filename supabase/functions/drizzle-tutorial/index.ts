/**
 * @file
 * Supabase Functionsのエントリーポイント。
 * このスクリプトは、HTTPリクエストを受け取り、JSONレスポンスを返します。
 *
 * @spec
 * - HTTP POSTリクエストを受け取ります。
 * - リクエストボディから"name"フィールドを抽出し、"Hello {name}!"というメッセージを返します。
 *
 * @limitations
 * - Denoランタイムではなく、Node.jsランタイムを使用します。
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { name } = req.body;
    const data = {
      message: `Hello ${name}!`,
    };
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
