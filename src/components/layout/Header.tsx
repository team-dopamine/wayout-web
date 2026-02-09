/** 헤더 */

import { useNavigate } from 'react-router-dom';

type Props =
  | {
      isAuthed: true;
      onLogout: () => void;
      onSignIn?: () => void;
    }
  | {
      isAuthed: false;
      onSignIn?: () => void;
      onLogout?: never;
    };

export default function Header({ isAuthed, onSignIn, onLogout }: Props) {
  const navigate = useNavigate();

  const primaryButtonClass =
    'inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all ' +
    'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const logoutButtonClass =
    'inline-flex items-center rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all ' +
    'hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

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
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
            onClick={() => navigate('/submissions')}
          >
            전체 제출 목록
          </button>

          <button
            type="button"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
            onClick={() => navigate('/problems')}
          >
            전체 문제 목록
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />

          {isAuthed ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={primaryButtonClass}
                onClick={() => navigate('/profile')}
              >
                마이페이지
              </button>

              <button type="button" className={logoutButtonClass} onClick={onLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onSignIn}
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21.35 11.1H12.18v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
              </svg>
              로그인
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
