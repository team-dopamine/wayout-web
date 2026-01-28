/** 헤더 로그인 클릭 시 백엔드 Google OAuth 시작 엔드포인트로 리다이렉트하는 유틸 */
export function startGoogleOAuth(): void {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  if (!baseUrl) {
    throw new Error('REACT_APP_API_BASE_URL 환경변수가 설정되지 않았습니다');
  }

  window.location.assign(`${baseUrl}/oauth2/authorization/google`);
}
