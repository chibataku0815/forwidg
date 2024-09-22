
import { generateToken } from '@/services/token';
import { auth } from '@clerk/nextjs/server';

/**
 * @file トークン生成APIエンドポイント
 */

/**
 * トークン生成APIエンドポイント
 * @param {Request} req - リクエストオブジェクト
 * @returns {Promise<Response>} レスポンスオブジェクト
 */
export async function POST(req: Request): Promise<Response> {
  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { projectId } = await req.json();
  const token = generateToken(projectId);

  // トークンをデータベースに保存する処理を追加
  // await db.insert(tokens).values({ token, projectId, userId });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
