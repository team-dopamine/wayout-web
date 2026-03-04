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
}
