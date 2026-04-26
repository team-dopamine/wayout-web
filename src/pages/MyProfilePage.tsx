import { useMyProfile } from '@/hooks/useMyProfile';
import ProfileSettings from '@/components/profile/ProfileSettings';
import ContributionsSection from '@/components/profile/ContributionsSection';

export default function MyProfilePage() {
  const {
    pageState,
    nickname,
    setNickname,
    activeTab,
    setActiveTab,
    displayContributions,
    isSaving,
    isWithdrawing,
    toast,
    handleSaveNickname,
    handleWithdraw,
  } = useMyProfile();

  if (pageState.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-sm font-medium text-slate-500">프로필을 불러오는 중...</p>
      </div>
    );
  }

  if (pageState.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-semibold text-red-500">{pageState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-xs text-slate-500 underline underline-offset-4"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#0f172a] dark:text-slate-100">
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">내 프로필</h1>

        {/* 프로필 편집 섹션 */}
        <section>
          <h2 className="text-xl font-bold">프로필 편집</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />
          <ProfileSettings
            nickname={nickname}
            email={pageState.data?.profile.email ?? ''}
            setNickname={setNickname}
            onSave={handleSaveNickname}
            isSaving={isSaving}
          />
        </section>

        {/* 내 기록 섹션 */}
        <section>
          <h2 className="text-xl font-bold">내 기록</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />
          <ContributionsSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            contributions={displayContributions}
            isLoading={false}
          />
        </section>

        {/* 계정 관리 섹션 */}
        <section className="pb-10">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400">계정 관리</h2>
          <hr className="my-6 border-slate-200 dark:border-slate-800" />
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-red-100 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-950/10 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-400">계정 탈퇴</p>
              <p className="mt-1 text-xs text-red-600/80 dark:text-red-500/70">
                탈퇴 시 모든 기여 데이터와 프로필 정보가 영구 삭제되며 복구할 수 없습니다.
              </p>
            </div>
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing}
              className="shrink-0 rounded-lg bg-red-500 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/20 transition-all hover:bg-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isWithdrawing ? '처리 중...' : '서비스 탈퇴'}
            </button>
          </div>
        </section>
      </main>

      {/* 토스트 알림 */}
      {toast && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-10 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-4 duration-300">
          <div
            className={`flex items-center gap-3 rounded-full px-6 py-3.5 font-bold text-white shadow-2xl backdrop-blur-sm ${
              toast.type === 'success'
                ? 'bg-emerald-500/95 ring-4 ring-emerald-500/20'
                : 'bg-[#D65261]/95 ring-4 ring-[#D65261]/20'
            }`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/25">
              {toast.type === 'success' ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
            </span>
            <span className="text-sm leading-none tracking-tight">{toast.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
