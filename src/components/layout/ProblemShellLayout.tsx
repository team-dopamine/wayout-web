import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';

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
    const hasValidState = isProblemState(state);

    return {
      platform: (problemPlatform || (hasValidState && state.platform) || 'boj').toLowerCase(),
      problemNo: paramNo || (hasValidState && state.problemNo) || '0000',
      title: getProblemTitle(state),
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

  const handleTabChange = (key: string) => {
    if (!problemInfo.id) return alert('ID가 필요합니다.');

    const pathMap: Record<string, string> = {
      find: `/problems/${problemInfo.platform}/${problemInfo.problemNo}`,
      status: `/submissions/${problemInfo.platform}/${problemInfo.problemNo}`,
      contribute: `/contribute/${problemInfo.platform}/${problemInfo.problemNo}`,
    };

    if (pathMap[key]) {
      navigate(`${pathMap[key]}?id=${problemInfo.id}`, { state });
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
        />
        <div className="mt-6">
          <Outlet context={problemInfo} />
        </div>
      </main>
    </div>
  );
}
