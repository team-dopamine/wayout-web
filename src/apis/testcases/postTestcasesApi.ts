import api from '@/apis/api';

/** 테스트 케이스 등록 API */
export interface PostTestcasesRequest {
  problemId: number;
  input: string;
  output: string;
}

/** 테스트 케이스 등록 */
export async function postTestcasesApi(body: PostTestcasesRequest) {
  return api.post('/testcases', body);
}
