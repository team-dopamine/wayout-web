import api from '@/apis/api';
import { type AxiosError, isAxiosError } from 'axios';

export interface SignOutResponse {
  message?: string;
}

interface ErrorResponse {
  message?: string;
}

export type SignOutErrorCode = 401 | 404;

export class SignOutError extends Error {
  status: SignOutErrorCode;

  constructor(status: SignOutErrorCode, message?: string) {
    super(message ?? '로그아웃 처리 중 오류가 발생했습니다.');

    this.name = 'SignOutError';
    this.status = status;
    Object.setPrototypeOf(this, SignOutError.prototype);
  }
}

/** 로그아웃 API */
const postSignOutApi = async (): Promise<SignOutResponse> => {
  try {
    const response = await api.post<SignOutResponse>('/auth/sign-out');
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
        (status === 401
          ? '이미 로그아웃 되었거나 인증 정보가 없습니다.'
          : '존재하지 않는 사용자입니다.');

      throw new SignOutError(status, msg);
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

export default postSignOutApi;
