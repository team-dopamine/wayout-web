import api from '@/apis/api';
import { MyProfile, UpdateMyNicknamePayload } from './members.type';

// 닉네임 변경 요청
export async function updateMyNickname(body: UpdateMyNicknamePayload): Promise<void> {
  const { data } = await api.patch('/members/me/nickname', body);
  return data;
}

// 사용자 정보 요청
export async function getMyProfile(): Promise<MyProfile> {
  const { data } = await api.get<MyProfile>('/members/me');
  return data;
}
