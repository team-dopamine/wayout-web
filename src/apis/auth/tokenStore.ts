/** accessToken을 메모리에 저장하고 조회/삭제하는 인증 전용 저장소 유틸 */

let accessToken: string | null = null;

/** accessToken을 메모리에 저장 */
export function setAccessToken(token: string): void {
  accessToken = token;
}

/** 메모리에 저장된 accessToken을 조회 */
export function getAccessToken(): string | null {
  return accessToken;
}

/** 메모리에 저장된 accessToken을 제거 */
export function clearAccessToken(): void {
  accessToken = null;
}
