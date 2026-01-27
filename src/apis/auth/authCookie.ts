/** accessToken 전달용 쿠키를 조회 및 삭제하는 인증 전용 쿠키 유틸 */

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

/** 브라우저 쿠키 문자열에서 지정한 이름의 쿠키 값 조회 */
export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const target = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(';').map((c) => c.trim());

  for (const part of parts) {
    if (part.startsWith(target)) {
      return decodeURIComponent(part.slice(target.length));
    }
  }
  return null;
}

/** 전달용 accessToken 쿠키를 제거 */
export function deleteAccessTokenCookie(): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${encodeURIComponent(ACCESS_TOKEN_COOKIE_NAME)}=; Max-Age=0; Path=/`;
}

/** 전달용 accessToken 쿠키 값을 조회 */
export function readAccessTokenCookie(): string | null {
  return readCookie(ACCESS_TOKEN_COOKIE_NAME);
}
