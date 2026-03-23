import api from '@/apis/api';
import type {
  PostSolutionRequest,
  GetMySolutionsRequest,
  GetMySolutionsResponse,
} from './solutions.type';

// 정답 코드 등록 API
export async function postSolutionApi(body: PostSolutionRequest) {
  return api.post('/solutions', body);
}

// 로그인한 사용자의 정답 코드 기여 목록 조회 API
export async function getMySolutionsApi({
  page = 0,
  size = 8,
  sort = ['createdAt,DESC'],
}: GetMySolutionsRequest = {}) {
  const response = await api.get<GetMySolutionsResponse>('/solutions/me', {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
}
