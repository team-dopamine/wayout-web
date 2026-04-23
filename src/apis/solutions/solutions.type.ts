export type SolutionLanguage = 'JAVA' | 'CPP' | 'PYTHON';

export type SolutionType = 'CORRECT' | 'INCORRECT' | 'GENERATOR';

export interface PostSolutionRequest {
  problemId: number;
  language: SolutionLanguage;
  isOpen: boolean;
  sourceCode: string;
}

export interface GetMySolutionsRequest {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface MySolutionItem {
  problemId: number;
  problemNo: number;
  platform: string;
  problemTitle: string;
  language: SolutionLanguage;
  submissionDate: string;
  type?: SolutionType;
}

export interface GetMySolutionsResponse {
  content: MySolutionItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
