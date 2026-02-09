import { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { requestReissue } from './reissue';

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

function isReissueRequest(url: unknown): boolean {
  return typeof url === 'string' && url.includes('/auth/reissue');
}

export function setupAuthInterceptors(axiosInstance: AxiosInstance): void {
  let reissuePromise: Promise<void> | null = null;

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalConfig = error.config as RetriableRequestConfig | undefined;

      if (!originalConfig) return Promise.reject(error);

      if (error.response?.status !== 401) return Promise.reject(error);

      if (isReissueRequest(originalConfig.url)) return Promise.reject(error);

      if (originalConfig._retry) return Promise.reject(error);
      originalConfig._retry = true;

      try {
        if (!reissuePromise) {
          reissuePromise = requestReissue(axiosInstance).finally(() => {
            reissuePromise = null;
          });
        }

        await reissuePromise;
        return axiosInstance.request(originalConfig);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  );
}
