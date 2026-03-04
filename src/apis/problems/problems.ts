import api from '@/apis/api';
import type { GetProblemResponse, Problem } from './problems.type';

export async function getproblem(): Promise<Problem[]> {
  const res = await api.get<GetProblemResponse>('/problems');
  return res.data.content;
}
