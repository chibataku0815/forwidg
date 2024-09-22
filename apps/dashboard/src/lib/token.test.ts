import { describe, it } from 'node:test';
import { generateToken, verifyToken } from './token';

/**
 * @file トークン生成と検証のテスト
 */

describe('Token Utility Functions', () => {
  it('should generate a valid token', () => {
    const projectId = 'testProject';
    const token = generateToken(projectId);
    const [tokenValue, expiresIn, tokenProjectId] = token.split('.');
    // トークンの値が64文字（32バイトの16進数）であることを確認します
    if (!tokenValue || tokenValue.length !== 64) {
      throw new Error(`Expected tokenValue to have length 64, but got ${tokenValue ? tokenValue.length : 'undefined'}`);
    }
    // トークンの有効期限が現在の日時よりも後であることを確認します
    if (expiresIn === undefined) {
      throw new Error('expiresIn is undefined');
    }
    const expiresInNumber = Number.parseInt(expiresIn, 10);
    if (Number.isNaN(expiresInNumber) || expiresInNumber <= Date.now()) {
      throw new Error(`Expected expiresIn to be a valid future timestamp, but got ${expiresIn}`);
    }

    // トークンのプロジェクトIDが期待されるプロジェクトIDと一致することを確認します
    if (tokenProjectId !== projectId) {
      throw new Error(`Expected tokenProjectId to be ${projectId}, but got ${tokenProjectId}`);
    }
  });

  it('should verify a valid token', () => {
    const projectId = 'testProject';
    const token = generateToken(projectId);

    if (!verifyToken(token)) {
      throw new Error(`Expected token to be valid, but verification failed for token: ${token}`);
    }
  });

  it('should not verify an expired token', () => {
    const projectId = 'testProject';
    const token = generateToken(projectId);
    const [tokenValue, expiresIn, tokenProjectId] = token.split('.');
    const expiredToken = `${tokenValue}.${Date.now() - 1000}.${tokenProjectId}`;

    // トークンが無効であることを確認します
    if (verifyToken(expiredToken)) {
      throw new Error(`Expected token to be invalid, but verification succeeded for token: ${expiredToken}`);
    }
  });
});
