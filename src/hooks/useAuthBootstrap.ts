import { useEffect, useState } from 'react';
import api from '@/apis/api';
import getAuthApi, { AuthMeError } from '@/apis/auth/getAuthApi';
import { requestReissue } from '@/apis/auth/reissue';

export function useAuthBootstrap() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const setAuthedSafe = (value: boolean) => {
      if (!cancelled) setIsAuthed(value);
    };

    const run = async () => {
      try {
        await getAuthApi();
        setAuthedSafe(true);
      } catch (e) {
        if (e instanceof AuthMeError && e.status === 401) {
          try {
            await requestReissue(api);
            await getAuthApi();
            setAuthedSafe(true);
            return;
          } catch {
            setAuthedSafe(false);
            return;
          }
        }

        setAuthedSafe(false);
      } finally {
        if (!cancelled) setIsAuthInitialized(true);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return { isAuthed, isAuthInitialized };
}
