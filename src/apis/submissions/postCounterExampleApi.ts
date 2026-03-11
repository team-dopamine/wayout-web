import api from '@/apis/api';

export type CounterExampleApiLanguage = 'JAVA' | 'CPP' | 'PYTHON';

export interface PostCounterexampleRequest {
  problemId: number;
  language: CounterExampleApiLanguage;
  sourceCode: string;
  isOpen: boolean;
}

export interface CounterExampleItem {
  input: string;
  expectedOutput: string;
  actualOutput: string;
}

export interface PostCounterexampleResponse {
  counterExamples: CounterExampleItem[];
}

export async function postCounterexampleApi(body: PostCounterexampleRequest) {
  const response = await api.post<PostCounterexampleResponse>(
    '/submissions/counter-examples',
    body,
  );
  return response.data;
}
