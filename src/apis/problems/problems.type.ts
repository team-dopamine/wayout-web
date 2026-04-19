export interface Problem {
  problemId: number;
  problemNo: number;
  title: string;
  platform: string;
  totalSubmissions: number;
  foundSubmissions: number;
}

export interface GetProblemResponse {
  content: Problem[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ProblemSearch {
  problemId: number;
  problemNo: number;
  title: string;
  platform: string;
}

export type GetProblemSearchResponse = ProblemSearch[];

export interface ProblemDetail {
  problemId: number;
  problemNo: number;
  title: string;
  platform: string;
  totalSubmissions: number;
  foundSubmissions: number;
}
