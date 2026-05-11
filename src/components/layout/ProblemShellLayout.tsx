import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';
import { formatSubmissionDate } from '@/utils/formatSubmissionDate';

function formatContributionLanguage(language: unknown) {
  const normalized = String(language ?? '').toUpperCase();
  if (normalized === 'CPP' || normalized === 'C++') return 'C++';
  if (normalized === 'JAVA') return 'Java';
  if (normalized === 'PYTHON') return 'Python';
  return String(language ?? '-');
}

interface ProblemNavigationState {
  title?: string;
  problemTitle?: string;
  platform?: string;
  problemNo?: string;
}

function isProblemState(state: unknown): state is ProblemNavigationState {
  return typeof state === 'object' && state !== null;
}

export default function ProblemShellLayout() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { problemPlatform, problemNo: paramNo } = useParams();
  const [searchParams] = useSearchParams();
  const locationState = useMemo(
    () => (state && typeof state === 'object' ? (state as Record<string, unknown>) : {}),
    [state],
  );

  const currentProblemId = searchParams.get('id');

  const getProblemTitle = (state: unknown): string => {
    if (isProblemState(state)) {
      return state.title || state.problemTitle || 'Loading...';
    }
    if (typeof state === 'string') {
      return state;
    }
    return 'Loading...';
  };

  const problemInfo = useMemo(() => {
    return {
      platform: (problemPlatform || String(locationState.platform || 'boj')).toLowerCase(),
      problemNo: problemNo || String(locationState.problemNo || '0000'),
      title: String(locationState.problemTitle || 'Loading...'),
      id: currentProblemId,
    };
  }, [
    problemPlatform,
    problemNo,
    locationState.platform,
    locationState.problemNo,
    locationState.problemTitle,
    currentProblemId,
  ]);

  const activeTab = useMemo(() => {
    if (pathname.includes('/my-contribution')) return 'submission';
    if (pathname.includes('/contribute')) return 'contribute';
    if (pathname.includes('/submissions')) return 'status';
    if (pathname.includes('/submission')) return 'submission';
    return 'find';
  }, [pathname]);
  const isMyContributionDetail = pathname.includes('/my-contribution');
  const contributionState = locationState;

  const contributionHeaderInfo = isMyContributionDetail ? (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {/* TODD: 추후 숨김/보이기 팔요 시 수정 */}
      {/* <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
        ID {String(contributionState?.contributionId ?? currentProblemId ?? '-')}
      </span>
      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
        Problem ID {String(contributionState?.problemId ?? '-')}
      </span> */}
      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
        {formatContributionLanguage(contributionState?.language)}
      </span>
      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
        {String(
          contributionState?.contributionDate
            ? formatSubmissionDate(String(contributionState.contributionDate))
            : (contributionState?.submittedAt ?? '시간 정보 없음'),
        )}
      </span>
      <span
        className={`rounded-full border px-2.5 py-1 font-medium ${
          contributionState?.isOpen === true
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300'
            : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300'
        }`}
      >
        {contributionState?.isOpen === true ? '공개' : '비공개'}
      </span>
    </div>
  ) : undefined;

  const handleTabChange = (key: string) => {
    if (!problemInfo.id) return alert('ID가 필요합니다.');

    const pathMap: Record<string, string> = {
      find: `/problems/${problemInfo.platform}/${problemInfo.problemNo}`,
      status: `/submissions/${problemInfo.platform}/${problemInfo.problemNo}`,
      contribute: `/contribute/${problemInfo.platform}/${problemInfo.problemNo}`,
    };

    if (pathMap[key]) {
      navigate(`${pathMap[key]}?id=${problemInfo.id}`, { state: locationState });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <ProblemInfoCard
          id={problemInfo.id}
          problemNo={problemInfo.problemNo}
          title={problemInfo.title}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          rightContent={contributionHeaderInfo}
        />
        <div className="mt-6">
          <Outlet context={problemInfo} />
        </div>
      </main>
    </div>
  );
}
