import api from '@/apis/api';
import type {
  Submission,
  PageResponse,
  SubmissionDetailResponse,
  GetSubmissionsParams,
  PagedSubmissionResponse,
} from './submissions.type';

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

// 특정 문제의 제출 기록 상세 조회
export const getSubmissionDetail = async (
  submissionId: number | string,
): Promise<SubmissionDetailResponse> => {
  const response = await api.get<SubmissionDetailResponse>(`/submissions/${submissionId}`);
  return response.data;
};

// 내 제출 목록 조회
export async function getMySubmissions(
  params?: GetSubmissionsParams,
): Promise<PagedSubmissionResponse> {
  const { data } = await api.get('/submissions/me', { params });
  return data;
}
