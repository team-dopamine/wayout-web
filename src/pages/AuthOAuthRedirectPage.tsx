/** OAuth 로그인 성공 후 리다이렉트하는 페이지 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/apis/api';
import getAuthApi, { AuthMeError } from '@/apis/auth/getAuthApi';
import { requestReissue } from '@/apis/auth/reissue';

export default function AuthOAuthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const isNewMember = params.get('isNewMember') === 'true';

      try {
        await getAuthApi();
        navigate(isNewMember ? '/onboarding' : '/', { replace: true });
      } catch (e) {
        if (e instanceof AuthMeError) {
          if (e.status === 404) {
            navigate('/', { replace: true });
            return;
          }

          if (e.status === 401) {
            try {
              await requestReissue(api);
              await getAuthApi();
              navigate(isNewMember ? '/onboarding' : '/', { replace: true });
              return;
            } catch {
              navigate('/', { replace: true });
              return;
            }
          }
        }

        navigate('/', { replace: true });
      }
    };

    run();
  }, [navigate]);

  return <div className="p-6">로그인 처리 중...</div>;
}
