export type Language = 'JAVA' | 'CPP' | 'PYTHON';

export interface Submission {
  id: number;
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

// 특정 문제의 제출 기록 상세 조회 응답 타입
export interface SubmissionDetailResponse {
  problemId: number;
  problemNo: number;
  title: string;
  sourceCode: string;
  language: string;
  platform: 'BOJ' | 'SWEA';
  executionTime: string;
  createdAt: string;
  totalSubmissions: number;
  foundSubmissions: number;
}
