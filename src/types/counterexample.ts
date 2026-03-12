/**반례 찾기 - 타입/상수 분리*/
export type Language = 'cpp' | 'java' | 'python';

export interface FailedCase {
  id: number;
  input: string;
  expected: string;
  output: string;
  timeMs?: number;
}
