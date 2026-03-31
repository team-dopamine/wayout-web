import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';

export default function ProblemShellLayout() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { problemPlatform, problemNo } = useParams();
  const [searchParams] = useSearchParams();

  const currentProblemId = searchParams.get('id');

  // 문제 정보 ( 플랫폼, 문제번호, 제목, ID )
  const problemInfo = useMemo(() => {
    const isStateObject = state && typeof state === 'object';
    return {
      platform: (problemPlatform || state?.platform || 'boj').toLowerCase(),
      problemNo: problemNo || state?.problemNo || '0000',
      title: !isStateObject ? state : state?.problemTitle || 'Loading...',
      id: currentProblemId,
    };
  }, [problemPlatform, problemNo, state, currentProblemId]);

  const activeTab = useMemo(() => {
    if (pathname.includes('/contribute')) return 'contribute';
    if (pathname.includes('/submissions')) return 'status';
    if (pathname.includes('/submission')) return 'submission';
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
      <main className="mx-auto max-w-5xl px-4 py-10">
        <ProblemInfoCard
          id={problemInfo.id}
          problemNo={`P-${problemInfo.problemNo}`}
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
