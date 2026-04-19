import api from '@/apis/api';
import type {
  GetProblemResponse,
  GetProblemSearchResponse,
  ProblemDetail,
  ProblemSearch,
} from './problems.type';

// 문제 목록 조회
export async function getProblem(
  page = 0,
  size = 8,
  sort = 'createdAt,DESC',
): Promise<GetProblemResponse> {
  const res = await api.get<GetProblemResponse>('/problems', {
    params: {
      page,
      size,
      sort,
    },
  });

  return res.data;
}

// 문제 검색 조회
export async function getProblemSearch(keyword: string, limit = 10): Promise<ProblemSearch[]> {
  const res = await api.get<GetProblemSearchResponse>('/problems/search', {
    params: {
      keyword,
      limit,
    },
  });

  return res.data;
}

// 특정 문제 상세 조회
export async function getProblemDetail(problemId: number): Promise<ProblemDetail> {
  const res = await api.get<ProblemDetail>(`/problems/${problemId}`);
  return res.data;
}
