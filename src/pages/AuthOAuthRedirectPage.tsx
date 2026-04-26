/** OAuth 로그인 성공 후 리다이렉트하는 페이지 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/apis/api';
import getAuthApi, { AuthMeError } from '@/apis/auth/getAuthApi';
import { requestReissue } from '@/apis/auth/reissue';

export default function AuthOAuthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    const moveToHome = () => {
      if (!isCancelled) {
        navigate('/', { replace: true });
      }
    };

    const moveToNext = (isNewMember: boolean) => {
      if (!isCancelled) {
        navigate(isNewMember ? '/onboarding' : '/', { replace: true });
      }
    };

    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const isNewMember = params.get('isNewMember') === 'true';

      try {
        await getAuthApi();
        moveToNext(isNewMember);
      } catch (e) {
        if (e instanceof AuthMeError) {
          if (e.status === 404) {
            moveToHome();
            return;
          }

          if (e.status === 401) {
            try {
              await requestReissue(api);
              await getAuthApi();
              moveToNext(isNewMember);
              return;
            } catch {
              moveToHome();
              return;
            }
          }
        }

        moveToHome();
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [navigate]);

  return <div className="p-6">로그인 처리 중...</div>;
}
