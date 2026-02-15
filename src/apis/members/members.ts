import api from '../api';
import { MyProfile, UpdateMyNicknamePayload } from './members.type';

// 닉네임 변경 요청
export async function updateMyNickname(body: UpdateMyNicknamePayload) {
  const res = await api.patch('/members/me/nickname', body);
  return res.data;
}

// 사용자 정보 요청
export async function getMyProfile(): Promise<MyProfile> {
  const res = await api.get('/members/me');
  return res.data;
}
