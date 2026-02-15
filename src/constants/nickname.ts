// 닉네임 검증 관련 상수 및 유효성 검사 함수

export const MAX_LENGTH = 12;
export const NICKNAME_REGEX = /^[a-zA-Z0-9]+$/;

export const validateNickname = (nickname: string) => {
  return nickname.length > 0 && nickname.length <= MAX_LENGTH && NICKNAME_REGEX.test(nickname);
};
