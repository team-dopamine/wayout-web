/** Axios 인증 인터셉터로 accessToken 주입, 401 시 재발급 및 요청 재시도 */
import {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';
import { requestReissue } from './reissue';
import { consumeAccessTokenFromCookie, session } from './session';

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

function redirectToMainPage(): void {
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

function clearSessionAndRedirectToMainPage(): void {
  session.clearAccessToken();
  redirectToMainPage();
}

function isReissueRequestUrl(requestUrl: string): boolean {
  return requestUrl.indexOf('/auth/reissue') !== -1;
}

function normalizeRequestUrl(requestUrl: unknown): string {
  return typeof requestUrl === 'string' ? requestUrl : '';
}

function attachAuthorizationHeader(
  requestConfig: InternalAxiosRequestConfig,
  accessToken: string,
): void {
  if (!requestConfig.headers) {
    requestConfig.headers = new AxiosHeaders();
  }

  requestConfig.headers.set('Authorization', `Bearer ${accessToken}`);
}

let authBootstrapPromise: Promise<void> | null = null;

export async function bootstrapAuth(axiosInstance: AxiosInstance): Promise<void> {
  consumeAccessTokenFromCookie();

  if (session.hasAccessToken()) {
    return;
  }

  if (authBootstrapPromise) {
    return authBootstrapPromise;
  }

  authBootstrapPromise = (async () => {
    try {
      await requestReissue(axiosInstance);
      consumeAccessTokenFromCookie();
    } catch {
      session.clearAccessToken();
    } finally {
      authBootstrapPromise = null;
    }
  })();

  return authBootstrapPromise;
}

export function setupAuthInterceptors(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(async (requestConfig) => {
    const requestUrl = normalizeRequestUrl(requestConfig.url);

    if (isReissueRequestUrl(requestUrl)) {
      return requestConfig;
    }

    await bootstrapAuth(axiosInstance);

    const accessToken = session.getAccessToken();
    if (accessToken) {
      attachAuthorizationHeader(requestConfig, accessToken);
    }

    return requestConfig;
  });

  let accessTokenReissuePromise: Promise<void> | null = null;

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (axiosError: AxiosError) => {
      const originalRequestConfig = axiosError.config as RetriableRequestConfig | undefined;

      if (!originalRequestConfig) {
        return Promise.reject(axiosError);
      }

      if (axiosError.response?.status !== 401) {
        return Promise.reject(axiosError);
      }

      const originalRequestUrl = normalizeRequestUrl(originalRequestConfig.url);

      if (isReissueRequestUrl(originalRequestUrl)) {
        clearSessionAndRedirectToMainPage();
        return Promise.reject(axiosError);
      }

      if (originalRequestConfig._retry) {
        clearSessionAndRedirectToMainPage();
        return Promise.reject(axiosError);
      }
      originalRequestConfig._retry = true;

      try {
        if (!accessTokenReissuePromise) {
          accessTokenReissuePromise = (async () => {
            await requestReissue(axiosInstance);
            consumeAccessTokenFromCookie();
          })().finally(() => {
            accessTokenReissuePromise = null;
          });
        }

        await accessTokenReissuePromise;

        if (!session.hasAccessToken()) {
          clearSessionAndRedirectToMainPage();
          return Promise.reject(axiosError);
        }

        return axiosInstance.request(originalRequestConfig);
      } catch (requestError) {
        clearSessionAndRedirectToMainPage();
        return Promise.reject(requestError);
      }
    },
  );
}
