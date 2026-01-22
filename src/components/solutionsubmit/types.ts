/** 커스텀 테스트 케이스 관련 타입 정의 */
export interface CustomTestCase {
  id: string;
  input: string;
  output: string;
}

export interface CustomTestCasesChangePayload {
  cases: CustomTestCase[];
  isPublic: boolean;
}
