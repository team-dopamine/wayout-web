import api from '@/apis/api';
import type { Submission, PageResponse } from './submissions.type';

// 전체 제출 목록 조회
export const getSubmissions = async (
  page: number,
  size: number,
): Promise<PageResponse<Submission>> => {
  const response = await api.get<PageResponse<Submission>>('/submissions', {
    params: {
      page,
      size,
      sort: 'createdAt,DESC',
    },
  });

  return response.data;
};

// 특정 문제 제출 목록 조회
export const getProblemSubmissions = async ({
  problemId,
  page = 0,
  size = 8,
}: {
  problemId: number;
  page?: number;
  size?: number;
}): Promise<PageResponse<Submission>> => {
  const response = await api.get<PageResponse<Submission>>(`/problems/${problemId}/submissions`, {
    params: {
      page,
      size,
      sort: 'createdAt,DESC',
    },
  });

  return response.data;
};
