/** accessToken 재발급 요청 API 호출 */
import { type AxiosError, type AxiosInstance, isAxiosError } from 'axios';

export async function requestReissue(axiosInstance: AxiosInstance): Promise<void> {
  try {
    await axiosInstance.post('/auth/reissue');
  } catch (unknownError) {
    if (!isAxiosError(unknownError)) {
      throw unknownError instanceof Error
        ? unknownError
        : new Error('요청 중 알 수 없는 오류가 발생했습니다.');
    }
    const axiosError = unknownError as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      const responseMessage = axiosError.response.data?.message;
      const statusCode = axiosError.response.status;

      if (responseMessage) {
        throw new Error(responseMessage);
      }

      throw new Error(`오류 발생 (status: ${statusCode})`);
    }

    if (axiosError.request) {
      throw new Error('서버로부터 응답이 없습니다.');
    }

    throw new Error('요청 중 알 수 없는 오류가 발생했습니다.');
  }
}
