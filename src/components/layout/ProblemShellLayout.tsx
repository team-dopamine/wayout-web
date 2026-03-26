import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProblemInfoCard from '@/components/common/ProblemInfoCard';

type TabKey = 'find' | 'status' | 'contribute';

export default function ProblemShellLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 라우터 파라미터 추출
  const { problemPlatform, problemNo } = useParams<{
    problemPlatform: string;
    problemNo: string;
  }>();

  // 쿼리 스트링 추출
  const [searchParams] = useSearchParams();
  const queryProblemId = searchParams.get('id');
  const currentProblemId: string | null = queryProblemId || null;

  // state가 없을 경우 URL 파라미터를 기본값으로 사용
  const problemHeaderData = location.state || {
    problemNo: problemNo,
    problemTitle: '정보를 불러오는 중...',
    platform: problemPlatform,
  };

  // 현재 URL 경로를 기반으로 활성 탭 결정 (/contribute, /submissions, /problems)
  const getActiveTab = (pathname: string): TabKey => {
    if (pathname.includes('/contribute')) return 'contribute';
    if (pathname.includes('/submissions')) return 'status';
    return 'find'; // 기본값
  };

  const activeTab = getActiveTab(location.pathname);

  const handleTabChange = (key: TabKey) => {
    if (!currentProblemId) {
      alert('문제 고유 ID를 찾을 수 없습니다.');
      return;
    }

    // 경로 구성을 위한 변수 (파라미터 우선 -> state 우선 -> 기본값 순)
    const platform = (problemPlatform || problemHeaderData.platform || 'boj').toLowerCase();
    const pNo = problemNo || problemHeaderData.problemNo || '0000';

    const queryString = `?id=${currentProblemId}`;
    const navigateOptions = { state: problemHeaderData };

    if (key === 'find') {
      navigate(`/problems/${platform}/${pNo}${queryString}`, navigateOptions);
    } else if (key === 'status') {
      navigate(`/submissions/${platform}/${pNo}${queryString}`, navigateOptions);
    } else if (key === 'contribute') {
      navigate(`/contribute/${platform}/${pNo}${queryString}`, navigateOptions);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <ProblemInfoCard
          id={currentProblemId}
          // 문제 번호 표시 로직 (ex: P-1234 형식)
          problemNo={
            problemHeaderData.problemNo
              ? `P-${problemHeaderData.problemNo}`
              : `P-${problemNo || '0000'}`
          }
          title={problemHeaderData.problemTitle}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="mt-6">
          <Outlet
            context={{
              problemId: currentProblemId,
              platform: problemPlatform,
              problemNo: problemNo,
            }}
          />
        </div>
      </main>
    </div>
  );
}
