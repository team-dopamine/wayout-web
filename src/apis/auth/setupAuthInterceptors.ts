/** 인증 토큰 처리를 담당하는 Axios 인터셉터 */

import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { bootstrapAccessTokenFromCookie } from './authBootstrap';
import { clearAccessToken, getAccessToken } from './tokenStore';
import { requestReissue } from './reissue';

/** Axios 요청 config에 재시도 여부를 표시하기 위한 타입 */
type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

/** 인증이 유효하지 않을 경우 사용자를 메인 페이지로 이동*/
function redirectToMain(): void {
  if (typeof window === 'undefined') return;
  window.location.href = '/';
}

/** Axios 인스턴스에 인증 관련 인터셉터 등록 */
export function setupAuthInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    bootstrapAccessTokenFromCookie();

    const token = getAccessToken();
    const url = config.url ?? '';

    /** 토큰 재발급 요청에는 Authorization 헤더를 추가하지 않음 */
    if (token && !url.includes('/auth/reissue')) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  let reissuePromise: Promise<void> | null = null;

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetriableConfig | undefined;

      if (!originalRequest || status !== 401) {
        return Promise.reject(error);
      }

      const url = originalRequest.url ?? '';

      /** 재발급 요청 실패는 인증 만료로 간주하고 상태를 정리한 뒤 이동 */
      if (url.includes('/auth/reissue')) {
        clearAccessToken();
        redirectToMain();
        return Promise.reject(error);
      }

      /** 동일 요청에 대한 재발급 재시도 방지 */
      if (originalRequest._retry) {
        clearAccessToken();
        redirectToMain();
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      try {
        if (!reissuePromise) {
          reissuePromise = (async () => {
            await requestReissue(instance);
            bootstrapAccessTokenFromCookie();
          })().finally(() => {
            reissuePromise = null;
          });
        }

        await reissuePromise;

        /** 재발급 후 기존 요청 재실행 */
        return instance.request(originalRequest);
      } catch (e) {
        clearAccessToken();
        redirectToMain();
        return Promise.reject(e);
      }
    },
  );
}
