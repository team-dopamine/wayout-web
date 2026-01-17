/**반례 찾기 - 타입/상수 분리*/
export type Language = 'c' | 'cpp' | 'java' | 'python';

export type FailedCase = {
  id: number;
  timeMs: number;
  input: string;
  expected: string;
  output: string;
};
