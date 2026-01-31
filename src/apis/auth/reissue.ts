import type { AxiosError, AxiosInstance } from 'axios';

export async function requestReissue(instance: AxiosInstance): Promise<void> {
  try {
    await instance.post('/auth/reissue');
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.response) {
      throw new Error(`오류 발생 (status: ${error.response.status})`);
    }
    if (error.request) {
      throw new Error('서버로부터 응답이 없습니다.');
    }
    throw new Error('요청 중 알 수 없는 오류가 발생했습니다.');
  }
}
