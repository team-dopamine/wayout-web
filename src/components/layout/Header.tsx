/** 헤더 */

import { useNavigate } from 'react-router-dom';

type Props = {
  isAuthed: boolean;
  onSignIn?: () => void;
};

export default function Header({ isAuthed, onSignIn }: Props) {
  const navigate = useNavigate();
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="group flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <span className="text-3xl text-blue-500 transition-transform group-hover:scale-110">
            {'</>'}
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            WAyout
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-500"
            onClick={() => navigate('/submissions')}
          >
            전체 제출 목록
          </button>

          <button
            type="button"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-500"
            onClick={() => navigate('/problems')}
          >
            전체 문제 목록
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />

          {isAuthed ? (
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm"
              disabled
              title="로그아웃은 추후 구현 예정"
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm"
              onClick={onSignIn}
            >
              로그인
            </button>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 dark:hover:bg-slate-700 md:hidden"
          aria-label="open menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
