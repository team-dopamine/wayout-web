// 닉네임 변경 요청 바디
export type UpdateMyNicknamePayload = {
  nickname: string;
};

// 서버에서 내려주는 사용자 정보
export type MyProfile = {
  email: string;
  nickname: string;
};
