// 닉네임 변경
export type UpdateMyNicknamePayload = {
  nickname: string;
};

// 사용자 정보
export type MyProfile = {
  email: string;
  nickname: string;
};

// 내 제출 목록 조회
export type SolutionLanguage = 'JAVA' | 'CPP' | 'PYTHON';

export type SolutionType = 'CORRECT' | 'INCORRECT' | 'GENERATOR';
export interface MySubmission {
  id: number;
  problemNo: number;
  platform: string;
  title: string;
  language: SolutionLanguage;
  createdAt: string;
  type?: SolutionType;
}

export interface GetSubmissionsParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PagedSubmissionResponse {
  content: MySubmission[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
