/** 프로젝트 전역에서 사용할 Axios 공통 인스턴스 */
import axios from 'axios';
import { setupAuthInterceptors } from './auth/interceptors';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/** 인증 인터셉터 등록 */
setupAuthInterceptors(api);

export default api;
