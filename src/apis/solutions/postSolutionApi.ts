import api from '@/apis/api';

/**정답 코드 등록 API */
export interface PostSolutionRequest {
  problemId: number;
  language: 'JAVA' | 'CPP' | 'PYTHON';
  isOpen: boolean;
  sourceCode: string;
}

export async function postSolutionApi(body: PostSolutionRequest) {
  return api.post('/solutions', body);
}
