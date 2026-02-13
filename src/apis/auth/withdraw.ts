// 회원 탈퇴 API

import api from '@/apis/api';

export async function withdraw() {
  return api.delete('/auth/withdraw');
}
