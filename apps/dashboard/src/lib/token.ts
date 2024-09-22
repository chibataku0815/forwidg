import crypto from 'node:crypto';

/**
 * @file トークン生成と検証のためのユーティリティ関数を提供します
 */

/**
 * トークンを生成します
 * @param {string} projectId - プロジェクトID
 * @returns {string} 生成されたトークン
 */
export function generateToken(projectId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresIn = Date.now() + 3600 * 1000; // 1時間後に有効期限切れ
  return `${token}.${expiresIn}.${projectId}`;
}

/**
 * トークンの有効性を検証します
 * @param {string} token - 検証するトークン
 * @returns {boolean} トークンが有効かどうか
 */
/**
 * トークンの有効性を検証します
 * @param {string} token - 検証するトークン
 * @returns {boolean} トークンが有効かどうか
 */
export function verifyToken(token: string): boolean {
  const [tokenValue, expiresIn, projectId] = token.split('.');

  // expiresInがundefinedの場合は無効なトークンとして扱う
  if (!expiresIn) {
    console.error('verifyToken: トークンの有効期限が見つかりません', { token });
    return false;
  }

  // 有効期限を数値に変換
  const expiresInNumber = Number.parseInt(expiresIn, 10);
  // 有効期限が数値に変換できなかった場合は無効なトークンとして扱う
  if (Number.isNaN(expiresInNumber)) {
    console.error('verifyToken: トークンの有効期限が無効です', { token, expiresIn });
    return false;
  }

  // 現在の時刻と比較してトークンの有効性を検証
  return Date.now() < expiresInNumber;
}
