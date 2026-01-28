/** accessToken 쿠키를 메모리에 저장하고 쿠키를 제거 */
import { readAccessTokenCookie, deleteAccessTokenCookie } from './authCookie';
import { setAccessToken } from './tokenStore';

export function bootstrapAccessTokenFromCookie(): void {
  const token = readAccessTokenCookie();
  if (!token) return;

  setAccessToken(token);
  deleteAccessTokenCookie();
}
