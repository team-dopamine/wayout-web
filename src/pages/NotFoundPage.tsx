/** 존재하지 않는 경로 접근 시 안내 메시지와 홈 이동을 제공하는 404 에러 페이지 */

import { useNavigate } from 'react-router-dom';
import NotFoundHero from '@/components/common/NotFoundHero';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 px-4 py-12 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="pointer-events-none absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-blue-400/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-purple-400/20 blur-[140px]" />

      <NotFoundHero
        onGoHome={() => navigate('/')}
        title={
          <>
            페이지를{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              찾을 수 없습니다
            </span>
          </>
        }
        description="주소를 다시 확인해 주세요."
      />
    </main>
  );
}
