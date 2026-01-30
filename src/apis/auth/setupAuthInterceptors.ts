import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { bootstrapAccessTokenFromCookie } from './authBootstrap';
import { clearAccessToken, getAccessToken } from './tokenStore';
import { requestReissue } from './reissue';

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

function redirectToMain(): void {
  if (typeof window === 'undefined') return;
  window.location.href = '/';
}

let bootstrapPromise: Promise<void> | null = null;

export function ensureAuthBootstrapped(instance: AxiosInstance): Promise<void> {
  bootstrapAccessTokenFromCookie();

  if (getAccessToken()) return Promise.resolve();

  if (bootstrapPromise) return bootstrapPromise;

  bootstrapPromise = (async () => {
    try {
      await requestReissue(instance);
      bootstrapAccessTokenFromCookie();
    } catch {
      clearAccessToken();
    } finally {
      bootstrapPromise = null;
    }
  })();

  return bootstrapPromise;
}

export function setupAuthInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use(async (config) => {
    await ensureAuthBootstrapped(instance);

    const token = getAccessToken();
    const url = config.url ?? '';

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

      if (url.includes('/auth/reissue')) {
        clearAccessToken();
        redirectToMain();
        return Promise.reject(error);
      }

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
        return instance.request(originalRequest);
      } catch (e) {
        clearAccessToken();
        redirectToMain();
        return Promise.reject(e);
      }
    },
  );
}
