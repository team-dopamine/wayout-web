// 사용자 닉네임 변경 API

import api from './api';

export type PatchMyNicknameRequest = {
  nickname: string;
};

export async function patchMyNickname(body: PatchMyNicknameRequest) {
  const res = await api.patch('/members/me', body);
  return res.data;
}
