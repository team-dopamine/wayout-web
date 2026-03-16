import api from '@/apis/api';

export type ProblemSubmissionApiLanguage = 'JAVA' | 'CPP' | 'PYTHON';

export interface GetProblemSubmissionsRequest {
  problemId: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface ProblemSubmissionItem {
  id: number;
  nickname: string;
  title: string;
  language: ProblemSubmissionApiLanguage;
  executionTime: number;
  createdAt: string;
}
export interface GetProblemSubmissionsResponse {
  content: ProblemSubmissionItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/**특정 문제의 제출 목록 조회 API */
export async function getProblemSubmissionsApi({
  problemId,
  page = 0,
  size = 8,
  sort = ['createdAt,DESC'],
}: GetProblemSubmissionsRequest) {
  const response = await api.get<GetProblemSubmissionsResponse>(
    `/problems/${problemId}/submissions`,
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}
