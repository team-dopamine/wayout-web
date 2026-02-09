import api from '@/apis/api';
import { type AxiosError, isAxiosError } from 'axios';

export interface AuthMeResponse {
  nickname: string;
}

interface ErrorResponse {
  message?: string;
}

export type AuthMeErrorCode = 401 | 404;

export class AuthMeError extends Error {
  status: AuthMeErrorCode;

  constructor(status: AuthMeErrorCode, message?: string) {
    super(message ?? '인증 상태를 확인할 수 없습니다.');

    this.name = 'AuthMeError';

    this.status = status;
    Object.setPrototypeOf(this, AuthMeError.prototype);
  }
}

/**로그인 확인 API */
const getAuthApi = async (): Promise<AuthMeResponse> => {
  try {
    const response = await api.get<AuthMeResponse>('/auth/me');
    return response.data;
  } catch (unknownError: unknown) {
    if (!isAxiosError(unknownError)) {
      throw unknownError instanceof Error
        ? unknownError
        : new Error('알 수 없는 오류가 발생했습니다.');
    }

    const axiosError = unknownError as AxiosError<ErrorResponse>;
    const status = axiosError.response?.status;

    if (status === 401 || status === 404) {
      const msg =
        axiosError.response?.data?.message ??
        (status === 401 ? '토큰이 만료되었습니다.' : '존재하지 않는 사용자입니다.');
      throw new AuthMeError(status, msg);
    }

    if (axiosError.response) {
      const msg =
        axiosError.response.data?.message ?? `오류 발생 (status: ${axiosError.response.status})`;
      throw new Error(msg);
    }

    if (axiosError.request) {
      throw new Error('네트워크 문제 또는 서버가 응답하지 않습니다.');
    }

    throw new Error('요청 중 알 수 없는 오류가 발생했습니다.');
  }
};

export default getAuthApi;
