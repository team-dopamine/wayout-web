export type Language = 'JAVA' | 'CPP' | 'PYTHON';

export interface Submission {
  id: number;
  nickname: string;
  title: string;
  language: Language;
  executionTime: number;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
