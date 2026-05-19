export type Language = 'JAVA' | 'CPP' | 'PYTHON';

export interface Submission {
  id: number;
  problemNo: number;
  nickname: string;
  title: string;
  platform: string;
  language: Language;
  executionTime: number;
  createdAt: string;
  open: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// 반례 상세 타입
export interface CounterExample {
  input: string;
  expectedOutput: string;
  actualOutput: string;
}

// 특정 문제의 제출 기록 상세 조회 응답 타입
export interface SubmissionDetailResponse {
  id: number;
  problemNo: number;
  title: string;
  sourceCode: string;
  found: boolean;
  totalTestcaseCount: number;
  counterExampleCount: number;
  counterExamples: CounterExample[];
  language: string;
  platform: 'BOJ' | 'SWEA';
  executionTime: number;
  createdAt: string;
}

// 내 제출 목록 조회
export type SolutionType = 'CORRECT' | 'GENERATOR';

export interface MySubmission {
  id: number;
  problemNo: number;
  platform: string;
  title: string;
  language: Language;
  createdAt: string;
  type?: SolutionType;
}

export interface GetSubmissionsParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PagedSubmissionResponse {
  content: MySubmission[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
