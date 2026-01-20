/** 정답 코드 작성 카드용 사용하는 언어 옵션과 입력 값 타입 정의 */
export type LanguageOption = {
  value: string;
  label: string;
  filename: string;
};

export type SolutionCodeCardValue = {
  problemId: string;
  language: string;
  code: string;
};
