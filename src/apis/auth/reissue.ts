/** refreshToken 쿠키로 accessToken 재발급 요청하는 인증 API */

import type { AxiosInstance } from 'axios';

export async function requestReissue(instance: AxiosInstance): Promise<void> {
  await instance.post('/auth/reissue');
}
