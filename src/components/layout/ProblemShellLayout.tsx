import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';
import { formatSubmissionDate } from '@/utils/formatSubmissionDate';

interface ProblemNavigationState {
  title?: string;
  problemTitle?: string;
  problemNo?: string;
  platform?: string;
  language?: string;
  contributionDate?: string | number;
  submittedAt?: string;
  isOpen?: boolean;
}

function isProblemState(state: unknown): state is ProblemNavigationState {
  if (typeof state !== 'object' || state === null) return false;

  const s = state as Record<string, unknown>;

  return (
    typeof s.title === 'string' ||
    typeof s.problemNo === 'string' ||
    typeof s.problemTitle === 'string'
  );
}

function formatContributionLanguage(language: unknown) {
  const normalized = String(language ?? '').toUpperCase();

  if (normalized === 'CPP' || normalized === 'C++') return 'C++';
  if (normalized === 'JAVA') return 'Java';
  if (normalized === 'PYTHON') return 'Python';

  return String(language ?? '-');
}

export default function ProblemShellLayout() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { problemPlatform, problemNo: paramNo } = useParams();
  const [searchParams] = useSearchParams();

  // state가 객체일 경우 안전하게 접근하기 위한 Memo
  const locationState = useMemo(
    () => (state && typeof state === 'object' ? (state as Record<string, unknown>) : {}),
    [state],
  );

  const currentProblemId = searchParams.get('id');

  const problemInfo = useMemo(() => {
    const hasValidState = isProblemState(state);

    let displayTitle = 'Loading...';
    if (hasValidState) {
      displayTitle = state.title || state.problemTitle || 'Loading...';
    } else if (typeof state === 'string') {
      displayTitle = state;
    }

    return {
      platform: (problemPlatform || (hasValidState && state.platform) || 'boj').toLowerCase(),
      problemNo: paramNo || (hasValidState && state.problemNo) || '0000',
      title: displayTitle,
      id: currentProblemId,
    };
  }, [problemPlatform, paramNo, state, currentProblemId]);

  const activeTab = useMemo(() => {
    const paths = {
      contribute: '/contribute',
      status: '/submissions',
      submission: '/submission',
    };

    if (pathname.includes(paths.contribute)) return 'contribute';
    if (pathname.includes(paths.status)) return 'status';
    if (pathname.includes(paths.submission)) return 'submission';

    return 'find';
  }, [pathname]);

  const isMyContributionDetail = pathname.includes('/my-contribution');

  const contributionHeaderInfo = useMemo(() => {
    if (!isMyContributionDetail) return undefined;

    const { language, contributionDate, submittedAt, isOpen } = locationState;

    return (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
          {formatContributionLanguage(language)}
        </span>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 dark:border-slate-600 dark:bg-slate-700/60 dark:text-slate-200">
          {contributionDate
            ? formatSubmissionDate(String(contributionDate))
            : String(submittedAt ?? '시간 정보 없음')}
        </span>

        <span
          className={`rounded-full border px-2.5 py-1 font-medium ${
            isOpen === true
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300'
              : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300'
          }`}
        >
          {isOpen === true ? '공개' : '비공개'}
        </span>
      </div>
    );
  }, [isMyContributionDetail, locationState]);

  const handleTabChange = (key: string) => {
    if (!problemInfo.id) {
      alert('ID가 필요합니다.');
      return;
    }

    const pathMap: Record<string, string> = {
      find: `/problems/${problemInfo.platform}/${problemInfo.problemNo}`,
      status: `/submissions/${problemInfo.platform}/${problemInfo.problemNo}`,
      contribute: `/contribute/${problemInfo.platform}/${problemInfo.problemNo}`,
    };

    if (pathMap[key]) {
      navigate(`${pathMap[key]}?id=${problemInfo.id}`, {
        state: locationState,
      });
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
