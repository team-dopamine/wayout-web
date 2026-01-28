/** 백엔드 OAuth 처리 후 리다이렉트 분기하는 페이지 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { bootstrapAccessTokenFromCookie } from '@/apis/auth/authBootstrap';

export default function AuthOAuthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    bootstrapAccessTokenFromCookie();

    const params = new URLSearchParams(window.location.search);
    const isNewMember = params.get('isNewMember');

    if (isNewMember === 'true') {
      navigate('/onboarding', { replace: true });
      return;
    }

    navigate('/', { replace: true });
  }, [navigate]);

  return <div className="p-6">로그인 처리 중...</div>;
}
