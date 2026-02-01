/**시작 시 인증 상태를 초기화하고 로그인 여부를 관리하는 커스텀 훅 */
import { useEffect, useState } from 'react';
import api from '@/apis/api';
import { bootstrapAuth } from '@/apis/auth/interceptors';
import { session } from '@/apis/auth/session';

export function useAuthBootstrap() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const currentAccessToken = session.getAccessToken();
    setIsAuthed(currentAccessToken !== null);

    const unsubscribe = session.subscribe((accessToken) => {
      setIsAuthed(accessToken !== null);
    });

    (async () => {
      try {
        await bootstrapAuth(api);
      } finally {
        setIsAuthInitialized(true);
      }
    })();

    return () => {
      unsubscribe();
    };
  }, []);

  return { isAuthed, isAuthInitialized };
}
