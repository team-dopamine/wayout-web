/** OAuth 로그인 성공 후 리다이렉트하는 페이지 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { consumeAccessTokenFromCookie } from '@/apis/auth/session';

export default function AuthOAuthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const consumed = consumeAccessTokenFromCookie();
    if (!consumed) {
      navigate('/', { replace: true });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const isNewMember = params.get('isNewMember') === 'true';

    navigate(isNewMember ? '/onboarding' : '/', { replace: true });
  }, [navigate]);

  return <div className="p-6">로그인 처리 중...</div>;
}
